/**
 * Node modules
 */
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Custom Modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Blog from '@/models/blog';
import Comment from '@/models/comment';

/**
 * Types
 */
import type { Request, Response } from 'express';
import type { IComment } from '@/models/comment';

type commentData = Pick<IComment, 'content'>;

//purify the comment
const window = new JSDOM('').window;
const purify = DOMPurify(window);

const commentBlog = async (req: Request, res: Response): Promise<void> => {
  const { content } = req.body as commentData;
  const { blogId } = req.params;
  const userId = req.userId;
  try {
    const blog = await Blog.findById(blogId).select('_id commentsCount').exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }

    const cleanContent = purify.sanitize(content);

    const newComment = await Comment.create({
      blogId,
      content: cleanContent,
      userId,
    });

    logger.info('New comment create', newComment);
    blog.commentsCount++;
    await blog.save();

    logger.info('Blog commented successfully', {
      userId,
      blogId: blog._id,
      commentsBlog: blog.commentsCount,
    });

    res.status(200).json({
      commentsCount: blog.commentsCount,
      comment: newComment,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err,
    });

    logger.error('Error while commenting a Blog', err);
  }
};

export default commentBlog;
