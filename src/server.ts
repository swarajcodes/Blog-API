/**
 * Node Modules
 */
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';

/**
 * Custom Modules
 */
import config from '@/config';
import limiter from '@/lib/express_rate_limit';

/**
 * Router
 */
import v1Routes from '@/routes/v1';

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

app.use(cookieParser());

//enable response compression to reduce payload size and improve performance
app.use(
  compression({
    threshold: 1024, //only compress response larger than 1KB
  }),
);

//use helmet to enhance security by setting various headers
app.use(helmet());

//Apply rate limiting middleware to prevent excessive requests and enhance security
app.use(limiter);

//IIFE(immediately invoked async function expression)
(async () => {
  try {
    app.use('/api/v1', v1Routes);

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.log(`Failed to start the server`, err);

    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
})();
