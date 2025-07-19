/**
 * Node Modules
 */
import express from 'express';

/**
 * Setting up my Express Server
 */
const app = express();

app.listen(3000, () => {
  console.log(`Server running: http://localhost:3000`);
});
