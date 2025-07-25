/**
 * Node modules
 */
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Custom Modules
 */
import { logger } from '@/lib/winston';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';
import Blog from '@/models/blog';

const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const blogId = req.params.blogId;

    const user = await User.findById(userId).select('role').lean().exec();
    const blog = await Blog.findById(blogId)
      .select('author banner.publicId')
      .lean()
      .exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not Found',
      });
      return;
    }

    if (blog.author !== userId && user?.role !== 'admin') {
      res.status(403).json({
        code: 'AuthorizationError',
        message: 'Access denied,insufficient permissions',
      });

      logger.warn('A user tried to delete a blog without permission', {
        userId,
        blog,
      });
      return;
    }

    await cloudinary.uploader.destroy(blog.banner.publicId);
    logger.info('Blog banner deleted from cloudinary', {
      publicId: blog.banner.publicId,
    });

    await Blog.deleteOne({
      _id: blogId,
    });
    logger.info('Blog deleted succesfully', {
      blogId,
    });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err,
    });

    logger.error('Error while deleting a Blog', err);
  }
};

export default deleteBlog;
