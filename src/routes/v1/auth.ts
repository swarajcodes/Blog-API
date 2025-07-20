/**
 * Node Modules
 */
import { Router } from 'express';
/**
 * Controllers
 */
import register from '@/controllers/v1/auth/register';

/**
 * Middlewares
 */

/**
 * Models
 */

const router = Router();

router.post('/register', register);

export default router;
