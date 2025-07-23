import User from '@/models/user';
import { body } from 'express-validator';

export const updateValidator = [
  body('username')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Username must be less than 20 characters')
    .custom(async (value) => {
      const userExists = await User.exists({ username: value });

      if (userExists) {
        throw Error('This Username is already in use');
      }
    }),
  body('email')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 chars')
    .isEmail()
    .withMessage('Invalid Email Address')
    .custom(async (value) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw Error('This Email is already in use');
      }
    }),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters long'),
  body('first_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage(' First name must be less than 20 characters'),
  body('last_name')
    .optional()
    .isLength({ max: 20 })
    .withMessage(' Last name must be less than 20 characters'),
  body(['website', 'instagram', 'x', 'github'])
    .optional()
    .isURL()
    .withMessage('Invalid URL')
    .isLength({ max: 100 })
    .withMessage('Url must be less than 100 characters'),
];
