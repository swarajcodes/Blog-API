import commentBlog from '@/controllers/v1/comment/comment_blog';
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import { validationError } from '@/middlewares/validationError';
import { Router } from 'express';
import { body, param } from 'express-validator';

const router = Router();

router.post(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  param('blogId').isMongoId().withMessage('Invalid Blog Id'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  validationError,
  commentBlog,
);

export default router;
