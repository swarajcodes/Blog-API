/**
 * Custom modules
 */
import config from '@/config';
import { logger } from '@/lib/winston';

/**
 * Models
 */
import User from '@/models/user';

/**
 * Types
 */
import type { Request, Response } from 'express';

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

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
