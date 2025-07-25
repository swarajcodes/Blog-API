/**
 * Node modules
 */
import { Router } from 'express';

/**
 * Middlewares
 */
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';

/**
 * Controllers
 */
import likeBlog from '@/controllers/v1/like/like_blog';

/**
 * Models
 */

const router = Router();

router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  likeBlog,
);

export default router;
