import commentBlog from '@/controllers/v1/comment/comment_blog';
import deleteComment from '@/controllers/v1/comment/delete_comment';
import getCommentsByBlog from '@/controllers/v1/comment/get_comments_by_blog';
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

router.get(
  '/blog/:blogId',
  authenticate,
  authorize(['admin', 'user']),
  param('blogId').isMongoId().withMessage('Invalid Blog Id'),
  validationError,
  getCommentsByBlog,
);

router.delete(
  '/:commentId',
  authenticate,
  authorize(['admin', 'user']),
  param('commentId').isMongoId().withMessage('Invalid comment Id'),
  validationError,
  deleteComment,
);

export default router;
