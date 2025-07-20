/**
 * Node Modules
 */
import { Router } from 'express';

const router = Router();

/**
 * Routes
 */
import authRoutes from '@/routes/v1/auth';

/**
 * Root Route
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to my Blog API',
    status: 'ok',
    doc: 'No documentation implementation yet',
    timeStamp: new Date().toISOString(),
  });
});

router.use('/auth', authRoutes);

export default router;
