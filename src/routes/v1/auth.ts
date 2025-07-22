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

import login from '@/controllers/v1/auth/login';
import refreshToken from '@/controllers/v1/auth/refresh-token';

/**
 * Middlewares
 */
import { validationError } from '@/middlewares/validationError';
import logout from '@/controllers/v1/auth/logout';
import authenticate from '@/middlewares/authenticate';

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

router.post('/logout',authenticate,logout)

export default router;
