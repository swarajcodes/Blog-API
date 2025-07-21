import { body, cookie } from 'express-validator';

export const refreshTokenValidator = [
  cookie('refreshToken')
    .notEmpty()
    .withMessage('Refresh token required')
    .isJWT()
    .withMessage('Invalid refresh token'),
];
