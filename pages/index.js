import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ApnaStocks() {
  const [stocks, setStocks] = useState([
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 34.25, changePercent: 1.42, volume: '12.5M' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3542.20, change: -25.80, changePercent: -0.72, volume: '8.2M' },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1456.90, change: 18.45, changePercent: 1.28, volume: '15.3M' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.30, change: 12.75, changePercent: 0.77, volume: '10.1M' },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 945.60, change: -8.25, changePercent: -0.86, volume: '18.7M' },
    { symbol: 'SBIN', name: 'State Bank of India', price: 567.85, change: 15.60, changePercent: 2.83, volume: '22.4M' },
    { symbol: 'ITC', name: 'ITC Limited', price: 456.20, change: 7.30, changePercent: 1.63, volume: '25.8M' },
    { symbol: 'LT', name: 'Larsen & Toubro', price: 2234.50, change: -12.40, changePercent: -0.55, volume: '6.9M' },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 896.75, change: 22.15, changePercent: 2.53, volume: '14.2M' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [marketStats, setMarketStats] = useState({
    nifty: { value: 19845.65, change: 123.45, changePercent: 0.63 },
    sensex: { value: 66589.93, change: 234.67, changePercent: 0.35 },
    totalVolume: '₹45,678 Cr',
    marketCap: '₹2,85,67,890 Cr'
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate real-time price updates
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 10,
          change: stock.change + (Math.random() - 0.5) * 2,
        }))
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const filteredStocks = stocks.filter(stock => 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>ApnaStocks.in - Indian Stock Market Dashboard</title>
        <meta name="description" content="Track Indian stocks with real-time data and beautiful UI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AS</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  ApnaStocks.in
                </h1>
              </div>
              <div className="text-white text-sm">
                {currentTime.toLocaleTimeString('en-IN')} IST
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <h2 className="text-5xl font-bold text-white mb-4">
              Your Gateway to Indian Markets
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Track live stock prices, analyze trends, and make informed investment decisions
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stocks (e.g., RELIANCE, TCS...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Market Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">NIFTY 50</p>
                  <p className="text-2xl font-bold text-white">{marketStats.nifty.value.toFixed(2)}</p>
                  <p className={`text-sm ${marketStats.nifty.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {marketStats.nifty.change >= 0 ? '+' : ''}{marketStats.nifty.change.toFixed(2)} ({marketStats.nifty.changePercent.toFixed(2)}%)
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">SENSEX</p>
                  <p className="text-2xl font-bold text-white">{marketStats.sensex.value.toFixed(2)}</p>
                  <p className={`text-sm ${marketStats.sensex.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {marketStats.sensex.change >= 0 ? '+' : ''}{marketStats.sensex.change.toFixed(2)} ({marketStats.sensex.changePercent.toFixed(2)}%)
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Volume</p>
                  <p className="text-2xl font-bold text-white">{marketStats.totalVolume}</p>
                  <p className="text-sm text-gray-400">Today's Trading</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Market Cap</p>
                  <p className="text-2xl font-bold text-white">{marketStats.marketCap}</p>
                  <p className="text-sm text-gray-400">Total Value</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Stock List */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">Live Stock Prices</h3>
            <div className="grid gap-4">
              {filteredStocks.map((stock, index) => (
                <div
                  key={stock.symbol}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                  onClick={() => setSelectedStock(stock)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{stock.symbol.substring(0, 2)}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{stock.symbol}</h4>
                        <p className="text-gray-400 text-sm">{stock.name}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-white">₹{stock.price.toFixed(2)}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change >= 0 ? '+' : ''}₹{Math.abs(stock.change).toFixed(2)}
                        </span>
                        <span className={`text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-400">Volume</p>
                      <p className="text-sm text-white font-medium">{stock.volume}</p>
                    </div>

                    <div className={`flex items-center ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {stock.change >= 0 ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${stock.change >= 0 ? 'bg-green-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min(Math.abs(stock.changePercent) * 20, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock Detail Modal */}
          {selectedStock && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">{selectedStock.name}</h3>
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Current Price</p>
                      <p className="text-2xl font-bold text-white">₹{selectedStock.price.toFixed(2)}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Change</p>
                      <p className={`text-xl font-bold ${selectedStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedStock.change >= 0 ? '+' : ''}₹{selectedStock.change.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Change %</p>
                      <p className={`text-xl font-bold ${selectedStock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-gray-400 text-sm">Volume</p>
                      <p className="text-xl font-bold text-white">{selectedStock.volume}</p>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="bg-white/10 rounded-lg p-4">
                    <p className="text-white font-semibold mb-4">Price Chart (Mock)</p>
                    <div className="h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded flex items-end justify-center">
                      <p className="text-gray-400">Chart visualization would go here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center">
              <p className="text-gray-400">
                © 2024 ApnaStocks.in - Your trusted Indian stock market companion
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Real-time data, beautiful UI, powered by Next.js
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
        }
        
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        
        .text-transparent {
          color: transparent;
        }
      `}</style>
    </>
  );
}
