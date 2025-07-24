/**
 * Custom Modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';

/**
 * Models
 */
import Blog from '@/models/blog';
import User from '@/models/user';

/**
 * Types
 */
import { Request, Response } from 'express';

const getBlogsBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const slug = req.params.slug;

    const user = await User.findById(userId).select('role').lean().exec();

    const blog = await Blog.findOne({ slug })
      .select('-banner.publicId -__v')
      .populate('author', '-createdAt -updatedAt -__v')
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    if (!blog) {
      res.status(404).json({
        code: 'NotFound',
        message: 'Blog not Found',
      });
      return;
    }

    // show only the published posts toa normal user
    if (user?.role === 'user' && blog.status === 'draft') {
      res.status(403).json({
        code: 'AuthorizationError',
        message: 'Access denied, insufficient permissions',
      });

      logger.warn('A user tried to access a draft blog', {
        userId,
        blog,
      });
    }

    res.status(200).json({
      blog,
    });
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err,
    });

    logger.error('Error while fetching blog by slug', err);
  }
};

export default getBlogsBySlug;
