import './index.css';
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { CryptoCoin } from '~/lib/types';
import { EmailSubscription } from './components/EmailSubscription';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
};

const COIN_IDS = ['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana'];

const AppContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0E17] text-gray-100">
      <header className="bg-[#0E1420] border-b border-[#1E2635] sticky top-0 z-10 backdrop-filter backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                Crypto
              </span>
              <span>Tracker</span>
            </h1>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition">
                Markets
              </a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition">
                Exchange
              </a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition">
                News
              </a>
              <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition">
                Portfolio
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-xs text-gray-400 hidden sm:block">
              <span className="font-medium text-gray-300">
                {currentTime.toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>{' '}
              ·
              <span className="ml-1">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium text-sm py-2 px-4 rounded-lg hover:opacity-90 transition hidden md:block">
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-6">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white mb-2 md:mb-0">Market Trends</h2>
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center px-3 py-1 bg-[#1E2635] rounded-md">
                <span className="text-gray-400 mr-2">Global Market Cap:</span>
                <span className="font-medium text-white">$1.27T</span>
                <span className="text-green-400 ml-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-3 h-3 mr-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  2.1%
                </span>
              </div>
              <div className="flex items-center px-3 py-1 bg-[#1E2635] rounded-md">
                <span className="text-gray-400 mr-2">24h Vol:</span>
                <span className="font-medium text-white">$78.5B</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#1E2635] bg-[#0E1420]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 divide-x divide-y divide-[#1E2635] sm:divide-y-0">
              {COIN_IDS.map((coinId) => (
                <CoinCard key={coinId} coinId={coinId} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0E1420] rounded-xl border border-[#1E2635] overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 md:pr-10">
                <h2 className="text-2xl font-bold mb-3 text-white">Stay Ahead of the Market</h2>
                <p className="mb-6 text-gray-400 leading-relaxed">
                  Get real-time alerts, expert market insights, and personalized portfolio updates
                  delivered directly to your inbox.
                </p>

                <EmailSubscription />
              </div>

              <div className="md:w-1/3 mt-8 md:mt-0 flex items-center justify-center">
                <div className="bg-gradient-to-br from-blue-500/10 to-teal-400/10 p-6 rounded-full">
                  <svg
                    className="w-32 h-32 text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2 bg-[#0E1420] rounded-xl border border-[#1E2635] overflow-hidden">
            <div className="p-6 border-b border-[#1E2635]">
              <h3 className="text-lg font-bold text-white">Bitcoin Price Chart</h3>
              <div className="flex items-center space-x-2 mt-2">
                <button className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                  1H
                </button>
                <button className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                  24H
                </button>
                <button className="px-2 py-1 text-xs font-medium bg-[#1E2635] text-white rounded">
                  7D
                </button>
                <button className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                  1M
                </button>
                <button className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                  1Y
                </button>
                <button className="px-2 py-1 text-xs font-medium bg-blue-500/10 text-blue-400 rounded">
                  ALL
                </button>
              </div>
            </div>
            <div className="p-4 h-64 flex items-center justify-center">
              <div className="text-gray-500 text-sm">Chart visualization would appear here</div>
            </div>
          </div>

          <div className="bg-[#0E1420] rounded-xl border border-[#1E2635] overflow-hidden">
            <div className="p-5 border-b border-[#1E2635]">
              <h3 className="text-lg font-bold text-white">Market Activity</h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-[#1E2635]">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-orange-400 text-xs font-bold">BTC</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Bitcoin</p>
                      <p className="text-xs text-gray-400">$25,143.00</p>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">+1.2%</div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[#1E2635]">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-400 text-xs font-bold">ETH</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Ethereum</p>
                      <p className="text-xs text-gray-400">$1,598.00</p>
                    </div>
                  </div>
                  <div className="text-red-400 text-sm font-medium">-0.8%</div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-400 text-xs font-bold">SOL</span>
                    </div>
                    <div>
                      <p className="font-medium text-white">Solana</p>
                      <p className="text-xs text-gray-400">$21.79</p>
                    </div>
                  </div>
                  <div className="text-green-400 text-sm font-medium">+3.4%</div>
                </div>
              </div>

              <button className="w-full mt-6 py-2 text-sm font-medium text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/10 transition">
                View All Markets
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0E1420] border-t border-[#1E2635] mt-auto py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">
                <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                  Crypto
                </span>
                <span className="text-white">Tracker</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">Real-time cryptocurrency data</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} <span className="text-blue-400">CryptoTracker</span>. All
              cryptocurrency data is hardcoded for demo purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CoinCard = ({ coinId }: { coinId: string }) => {
  const query = useQuery({
    queryKey: ['coin', coinId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/coin/${coinId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data for ${coinId}`);
      }
      return response.json() as Promise<CryptoCoin>;
    },
    refetchInterval: 1000 * 1, // 1 second
  });

  if (query.isPending) {
    return (
      <div className="flex flex-col p-6 animate-pulse">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-[#1E2635] rounded-full mr-3"></div>
          <div>
            <div className="h-4 w-16 bg-[#1E2635] rounded mb-2"></div>
            <div className="h-3 w-20 bg-[#1E2635] rounded"></div>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-6 w-24 bg-[#1E2635] rounded"></div>
          <div className="h-3 w-16 bg-[#1E2635] rounded"></div>
        </div>
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="flex flex-col p-6">
        <div className="flex items-center text-red-400">
          <svg
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="font-medium">Failed to load {coinId}</p>
        </div>
      </div>
    );
  }

  const coin = query.data;

  const priceChangeColor =
    coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400';
  const priceChangeIcon =
    coin.price_change_percentage_24h >= 0 ? (
      <svg
        className="w-3 h-3 mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="w-3 h-3 mr-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z"
          clipRule="evenodd"
        />
      </svg>
    );

  return (
    <div className="p-6 hover:bg-[#161F2E] transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={coin.image} alt={`${coin.name} logo`} className="w-8 h-8 mr-3" />
          <div>
            <p className="font-bold text-white">{coin.symbol.toUpperCase()}</p>
            <p className="text-xs text-gray-400">{coin.name}</p>
          </div>
        </div>
        <div className={`text-xs font-medium flex items-center ${priceChangeColor}`}>
          {priceChangeIcon}
          {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xl font-bold text-white">${coin.current_price.toLocaleString()}</p>
        <div className="mt-4 w-full bg-[#1E2635] h-1 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              coin.price_change_percentage_24h >= 0 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(Math.abs(coin.price_change_percentage_24h) * 10, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
