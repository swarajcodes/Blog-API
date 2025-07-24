import createBlog from '@/controllers/v1/blog/create_blog';
import getAllBlogs from '@/controllers/v1/blog/get_all_blogs';
import authenticate from '@/middlewares/authenticate';
import authorize from '@/middlewares/authorize';
import uploadBlogBanner from '@/middlewares/uploadBlogBanner';
import { validationError } from '@/middlewares/validationError';
import { createBlogValidator } from '@/validators/blog/createBlogValidator';
import { getAllUserValidator } from '@/validators/user/getAllUserValidator';
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
  authorize(['admin','user']),
  getAllUserValidator,
  validationError,
  getAllBlogs
);

export default router;
