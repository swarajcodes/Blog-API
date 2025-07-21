/**
 * Node Modules
 */
import { Router } from 'express';
/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';
import {
  loginValidator,
  refreshTokenValidator,
  registerValidator,
} from '@/validators/user.validator';
import { validationError } from '@/middlewares/validationError';
import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh-token';

/**
 * Middlewares
 */

/**
 * Models
 */

const router = Router();

router.post('/register', registerValidator, validationError, register);

router.post('/login', loginValidator, validationError, login);

router.post(
  '/refresh-token',
  refreshTokenValidator,
  validationError,
  refreshToken,
);

export default router;
