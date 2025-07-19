import dotenv from 'dotenv';

dotenv.config({
  quiet: true,
});

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: ['http://localhost:5173'],
};

export default config;
