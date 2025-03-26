import express from 'express';
import cors from 'cors';
import { getCryptoCoin } from '~/lib/crypto-coin';
import { subscribeWithEmail } from './lib/email';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API routes
app.get('/api/coin/:coinId', (req, res): any => {
  const coinId = getCryptoCoin(req.params.coinId);
  if (!coinId) {
    return res.status(404).json({
      error: `Coin with ID '${req.params.coinId}' not found`,
    });
  }
  return res.json(coinId);
});

app.post('/api/subscribe', async (req, res): Promise<any> => {
  try {
    const { email } = req.body;
    subscribeWithEmail(email);
    return res.status(200).json({
      success: true,
      message: 'Subscription successful',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to process subscription',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
