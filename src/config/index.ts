import dotenv from 'dotenv';

dotenv.config({
    quiet:true
});

const config = {
  PORT: process.env.PORT || 3000,
};

export default config;
