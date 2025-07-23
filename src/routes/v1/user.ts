/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import { validationError } from '@/middlewares/validationError';
import authorize from '@/middlewares/authorize';

/**
 * Controllers
 */
import getCurrentUser from '@/controllers/v1/user/get_current_user';
import updateCurrentUser from '@/controllers/v1/user/update_current_user';

/**
 * Models
 */
import User from '@/models/user';
import { updateValidator } from '@/validators/user/updateValidator';
import deleteCurrentUser from '@/controllers/v1/user/delete_current_user';
import getAllUser from '@/controllers/v1/user/get_all_user';
import { getAllUserValidator } from '@/validators/user/getAllUserValidator';
import { getUserByIdValidator } from '@/validators/user/getUserByIdValidator';
import getUser from '@/controllers/v1/user/get_user';

const router = Router();

router.get(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  getCurrentUser,
);

router.put(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  updateValidator,
  validationError,
  updateCurrentUser,
);

router.delete(
  '/current',
  authenticate,
  authorize(['admin', 'user']),
  deleteCurrentUser,
);

router.get(
  '/',
  authenticate,
  authorize(['admin']),
  getAllUserValidator,
  validationError,
  getAllUser,
);

router.get(
  '/:userId',
  authenticate,
  authorize(['admin']),
  getUserByIdValidator,
  validationError,
  getUser,
);

export default router;
