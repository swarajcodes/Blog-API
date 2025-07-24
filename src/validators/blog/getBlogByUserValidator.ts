import { query, param } from 'express-validator';

export const getBlogByUserValidator = [
  param('userId').isMongoId().withMessage('Invalid User Id'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 to 50'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be Positive'),
];
