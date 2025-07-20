/**
 * Node Modules
 */
import { Router } from 'express';
/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';
import { registerValidator } from '@/validators/user.validator';
import { validationError } from '@/middlewares/validationError';

/**
 * Middlewares
 */

/**
 * Models
 */

const router = Router();

router.post('/register', registerValidator, validationError, register);

export default router;
