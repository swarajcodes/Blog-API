import { body, cookie } from 'express-validator';
import User from '@/models/user';


export const registerValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isLength({ max: 50 })
    .withMessage('Email must be less than 50 chars')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Passowrd must contain atleast 8 Chars'),
  body('role')
    .optional()
    .isString()
    .withMessage('Role must be a string')
    .isIn(['admin', 'user'])
    .withMessage('Role must be either admin or User'),
];
