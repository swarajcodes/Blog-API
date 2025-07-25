import createBlog from '@/controllers/v1/blog/create_blog';
import getAllBlogs from '@/controllers/v1/blog/get_all_blogs';
import getBlogsBySlug from '@/controllers/v1/blog/get_blogs_by_slug';
import getBlogsByUser from '@/controllers/v1/blog/get_blogs_by_user';
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';
import { validationError } from '@/middlewares/validationError';
import { createBlogValidator } from '@/validators/blog/createBlogValidator';
import { getAllBlogValidator } from '@/validators/blog/getAllBlogsValidator';
import { getBlogByUserValidator } from '@/validators/blog/getBlogByUserValidator';
import { getBlogBySlugValidator } from '@/validators/blog/getBlogsBySlugValidator';
import { Router } from 'express';
import multer from 'multer';

import { param, body } from 'express-validator';
import updateBlog from '@/controllers/v1/blog/update_blog';
import { updateBlogValidator } from '@/validators/blog/updateBlogValidator';
import deleteBlog from '@/controllers/v1/blog/delete_blog';

const upload = multer();

const router = Router();

router.post(
  '/',
  authenticate,
  authorize(['admin']),
  upload.single('banner_image'),
  createBlogValidator,
  validationError,
  uploadBlogBanner('post'),
  createBlog,
);

router.get(
  '/',
  authenticate,
  authorize(['admin', 'user']),
  getAllBlogValidator,
  validationError,
  getAllBlogs,
);

router.get(
  '/user/:userId',
  authenticate,
  authorize(['admin', 'user']),
  getBlogByUserValidator,
  validationError,
  getBlogsByUser,
);

router.get(
  '/:slug',
  authenticate,
  authorize(['admin', 'user']),
  getBlogBySlugValidator,
  validationError,
  getBlogsBySlug,
);

router.put(
  '/:blogId',
  authenticate,
  authorize(['admin']),
  updateBlogValidator,
  validationError,
  uploadBlogBanner('put'),
  updateBlog,
);

router.delete(
  '/:blogId',
  authenticate,
  param('blogId').isMongoId().withMessage('Invalid Blog Id'),
  validationError,
  authorize(['admin']),
  deleteBlog,
);

export default router;
