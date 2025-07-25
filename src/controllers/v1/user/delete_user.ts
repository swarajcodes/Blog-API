/**
 * Custom modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Models
 */
import User from '@/models/user';
import Blog from '@/models/blog';

/**
 * Types
 */
import type { Request, Response } from 'express';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

    const blogs = await Blog.find({ author: userId })
      .select('banner.publicId')
      .lean()
      .exec();

    const publicIds = blogs.map(({ banner }) => banner.publicId);

    await cloudinary.api.delete_resources(publicIds);

    logger.info('multiple blog banners deleted from cloudinary');

    await Blog.deleteMany({ author: userId });

    logger.info('Multiple blogs deleted', {
      userId,
      blogs,
    });

    await User.deleteOne({ _id: userId });
    logger.info('A user has been deleted', {
      userId,
    });

    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({
      code: 'ServerError',
      message: 'Internal Server Error',
      error: err,
    });

    logger.error('Error while deleting a user', err);
  }
};

export default deleteUser;
