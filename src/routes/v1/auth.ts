/**
 * Node Modules
 */
import { Router } from 'express';
/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';
import { registerValidator } from '@/validators/auth/registerValidator';
import { loginValidator } from '@/validators/auth/loginValidator';
import { refreshTokenValidator } from '@/validators/auth/refreshTokenValidator';
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
