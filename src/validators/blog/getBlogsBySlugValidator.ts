import { query, param } from 'express-validator';

export const getBlogBySlugValidator = [
  param('slug').notEmpty().withMessage('Slug is required'),
];
