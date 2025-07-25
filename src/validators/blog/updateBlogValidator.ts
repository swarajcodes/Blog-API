import { body,param } from "express-validator";
import multer from "multer";

const upload = multer();

export const updateBlogValidator = [
  param('blogId').isMongoId().withMessage('Invalid Blog Id'),
  upload.single('banner_image'),
  body('title')
    .optional()
    .isLength({ max: 180 })
    .withMessage('Title must be lessa than 180 characters'),
  body('content'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be one of the value, draft or published'),
];