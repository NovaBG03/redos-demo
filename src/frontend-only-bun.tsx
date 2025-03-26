import { serve } from 'bun';
import index from '~/frontend/index.html';

const PORT = 3001;

const server = serve({
  port: PORT,
  routes: {
    // Serve index.html for all unmatched routes
    '/*': index,
  },
  development: process.env.NODE_ENV !== 'production',
});

console.log(`🌐 Frontend server running at ${server.url}`);
