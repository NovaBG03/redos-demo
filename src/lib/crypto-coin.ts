import { CryptoCoin } from './types';

const CRYPTO_COIN_DATA: Record<string, Omit<CryptoCoin, 'price_change_percentage_24h'>> = {
  bitcoin: {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    current_price: 63856.42,
    image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
  },
  ethereum: {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    current_price: 3469.75,
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
  },
  ripple: {
    id: 'ripple',
    name: 'XRP',
    symbol: 'xrp',
    current_price: 0.578142,
    image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
  },
  cardano: {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ada',
    current_price: 0.576489,
    image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
  },
  solana: {
    id: 'solana',
    name: 'Solana',
    symbol: 'sol',
    current_price: 142.58,
    image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
  },
};

export const getCryptoCoin = (coinId: string) => {
  const coin = CRYPTO_COIN_DATA[coinId.toLocaleLowerCase()];
  if (!coin) {
    return null;
  }

  const percentageChange = (Math.random() * 4 - 2) / 100;
  const adjustedPrice = coin.current_price * (1 + percentageChange);

  return {
    ...coin,
    current_price: adjustedPrice,
    price_change_percentage_24h: percentageChange * 100,
  };
};
