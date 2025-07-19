/**
 * Node Modules
 */
import { timeStamp } from 'console';
import { Router } from 'express';

const router = Router();

/**
 * Root Route
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my Blog API',
    status: 'ok',
    doc:'No documentation implementation yet',
    timeStamp: new Date().toISOString(),
  });
});

export default router;
