/**
 * Node Modules
 */
import express from 'express';

/**
 * Custom Modules
 */
import config from '@/config';
/**
 * Setting up my Express Server
 */
const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my Blog API',
  });
});

app.listen(config.PORT, () => {
  console.log(`Server running: http://localhost:${config.PORT}`);
});
