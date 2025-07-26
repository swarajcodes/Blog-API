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

const getCommentsByBlog = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId).select('_id').lean().exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not found',
      });
      return;
    }
    const allComments = await Comment.find({ blogId })
      .sort()
      .lean({ createdAt: -1 })
      .exec();

    res.status(200).json({
      comments: allComments,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err,
    });

    logger.error('Error while fetching comments by a Blog', err);
  }
};

export default getCommentsByBlog;
