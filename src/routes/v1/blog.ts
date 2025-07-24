import createBlog from '@/controllers/v1/blog/create_blog';
import getAllBlogs from '@/controllers/v1/blog/get_all_blogs';
import getBlogsByUser from '@/controllers/v1/blog/get_blogs_by_user';
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';
import { validationError } from '@/middlewares/validationError';
import { createBlogValidator } from '@/validators/blog/createBlogValidator';
import { getAllBlogValidator } from '@/validators/blog/getAllBlogsValidator';
import { getBlogByUserValidator } from '@/validators/blog/getBlogByUserValidator';
import { Router } from 'express';
import multer from 'multer';

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

export default router;
