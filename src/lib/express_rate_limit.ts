/**
 * Node Modules
 */
import { error } from 'console';
import { rateLimit } from 'express-rate-limit';

//configure rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 60000, //1-minute time window for rate limiting
  limit: 60, //allow a max of 60 req per window per IP
  standardHeaders: 'draft-8', //latest standard
  legacyHeaders: false, //disable deprecated headers
  message: {
    error:
      'You have sent too many requests in a given amount of time. Please try again later',
  },
});
export default limiter;
