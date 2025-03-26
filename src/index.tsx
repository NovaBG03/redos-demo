import { serve } from 'bun';
import index from '~/frontend/index.html';
import { getCryptoCoin } from '~/lib/crypto-coin';
import { subscribeWithEmail } from './lib/email';

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/coin/:coinId': async (req) => {
      const coinId = getCryptoCoin(req.params.coinId);
      if (!coinId) {
        return new Response(JSON.stringify({ error: `Coin with ID '${coinId}' not found` }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return Response.json(coinId);
    },

    '/api/subscribe': {
      POST: async (req) => {
        try {
          const { email } = await req.json();
          subscribeWithEmail(email);
          return new Response(
            JSON.stringify({
              success: true,
              message: 'Subscription successful',
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        } catch (error) {
          return new Response(
            JSON.stringify({
              error: 'Failed to process subscription',
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      },
    },
  },

  development: process.env.NODE_ENV !== 'production',
});

console.log(`🚀 Server running at ${server.url}`);
