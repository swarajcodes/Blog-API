/**
 * Node Modules
 */
import express from 'express';
import cors from 'cors';

/**
 * Custom Modules
 */
import config from '@/config';

/**
 * Types
 */
import type { CorsOptions } from 'cors';

/**
 * Setting up my Express Server
 */
const app = express();

//configure CORS options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === 'development' ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS Error :${origin} is not allowed by CORS`),
        false,
      );
      console.log(`CORS Error :${origin} is not allowed by CORS`);
    }
  },
};

//apply CORS middleware
app.use(cors(corsOptions));

//enable JSON request body parsing
app.use(express.json());

//enable URL-encoded request body parsing with extended mode
//'extended:true' allows rich objects and arrays via querystring library
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my Blog API',
  });
});

app.listen(config.PORT, () => {
  console.log(`Server running: http://localhost:${config.PORT}`);
});
