import { param } from 'express-validator';

export const getUserByIdValidator = [
  param('userId').notEmpty().isMongoId().withMessage('Invalid UserId'),
];

export const deleteUserByIdValidator = [
  param('userId').notEmpty().isMongoId().withMessage('Invalid UserId'),
];