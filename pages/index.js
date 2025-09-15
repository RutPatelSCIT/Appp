import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Search, BarChart3, PieChart, Activity, Bell, Settings, Star, Eye, Filter, Calendar, Globe } from 'lucide-react';

export default function InteractiveApnaStocks() {
  const [stocks, setStocks] = useState([
    { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 34.25, changePercent: 1.42, volume: '12.5M', sector: 'Energy', marketCap: '16.6L Cr', pe: 24.5, high52w: 2800, low52w: 2100, news: 3 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3542.20, change: -25.80, changePercent: -0.72, volume: '8.2M', sector: 'IT', marketCap: '13.2L Cr', pe: 28.3, high52w: 4000, low52w: 3200, news: 5 },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1456.90, change: 18.45, changePercent: 1.28, volume: '15.3M', sector: 'IT', marketCap: '6.1L Cr', pe: 22.1, high52w: 1800, low52w: 1200, news: 2 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1678.30, change: 12.75, changePercent: 0.77, volume: '10.1M', sector: 'Banking', marketCap: '12.8L Cr', pe: 18.7, high52w: 1900, low52w: 1400, news: 4 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank', price: 945.60, change: -8.25, changePercent: -0.86, volume: '18.7M', sector: 'Banking', marketCap: '6.7L Cr', pe: 16.2, high52w: 1100, low52w: 800, news: 1 },
    { symbol: 'SBIN', name: 'State Bank of India', price: 567.85, change: 15.60, changePercent: 2.83, volume: '22.4M', sector: 'Banking', marketCap: '5.1L Cr', pe: 12.4, high52w: 650, low52w: 450, news: 6 },
    { symbol: 'ITC', name: 'ITC Limited', price: 456.20, change: 7.30, changePercent: 1.63, volume: '25.8M', sector: 'FMCG', marketCap: '5.7L Cr', pe: 26.8, high52w: 500, low52w: 350, news: 2 },
    { symbol: 'LT', name: 'Larsen & Toubro', price: 2234.50, change: -12.40, changePercent: -0.55, volume: '6.9M', sector: 'Infrastructure', marketCap: '3.1L Cr', pe: 19.5, high52w: 2500, low52w: 1800, news: 3 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel', price: 896.75, change: 22.15, changePercent: 2.53, volume: '14.2M', sector: 'Telecom', marketCap: '4.8L Cr', pe: 35.2, high52w: 1000, low52w: 700, news: 4 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [sortBy, setSortBy] = useState('changePercent');
  const [filterSector, setFilterSector] = useState('all');
  const [watchlist, setWatchlist] = useState(['RELIANCE', 'TCS']);
  const [notifications, setNotifications] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredStock, setHoveredStock] = useState(null);
  
  const [marketStats, setMarketStats] = useState({
    nifty: { value: 19845.65, change: 123.45, changePercent: 0.63 },
    sensex: { value: 66589.93, change: 234.67, changePercent: 0.35 },
    totalVolume: '₹45,678 Cr',
    marketCap: '₹2,85,67,890 Cr',
    advanceDecline: { advance: 1247, decline: 832, unchanged: 156 }
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const chartRef = useRef(null);

  // Simulated real-time updates
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setIsAnimating(true);
      
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const newChange = stock.change + (Math.random() - 0.5) * 5;
          const newPrice = stock.price + newChange - stock.change;
          const newChangePercent = (newChange / (newPrice - newChange)) * 100;
          
          // Create notifications for significant moves
          if (Math.abs(newChangePercent) > 2 && Math.random() > 0.8) {
            const notification = {
              id: Date.now() + Math.random(),
              stock: stock.symbol,
              type: newChangePercent > 0 ? 'gain' : 'loss',
              message: `${stock.symbol} ${newChangePercent > 0 ? 'surged' : 'dropped'} ${Math.abs(newChangePercent).toFixed(2)}%`,
              time: new Date().toLocaleTimeString()
            };
            setNotifications(prev => [notification, ...prev.slice(0, 4)]);
          }
          
          return {
            ...stock,
            price: Math.max(newPrice, stock.price * 0.8), // Prevent unrealistic drops
            change: newChange,
            changePercent: newChangePercent
          };
        })
      );

      // Update market stats
      setMarketStats(prev => ({
        ...prev,
        nifty: {
          ...prev.nifty,
          value: prev.nifty.value + (Math.random() - 0.5) * 50,
          change: prev.nifty.change + (Math.random() - 0.5) * 10
        },
        sensex: {
          ...prev.sensex,
          value: prev.sensex.value + (Math.random() - 0.5) * 100,
          change: prev.sensex.change + (Math.random() - 0.5) * 20
        }
      }));

      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  // Chart animation
  useEffect(() => {
    if (chartRef.current && selectedStock) {
      const canvas = chartRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Simple animated line chart
      const points = [];
      for (let i = 0; i < 50; i++) {
        points.push({
          x: (i / 49) * canvas.width,
          y: canvas.height/2 + Math.sin(i * 0.3 + Date.now() * 0.001) * 30 + (Math.random() - 0.5) * 20
        });
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, selectedStock.change >= 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point, i) => {
          if (i > 0) ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Line
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point, i) => {
          if (i > 0) ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = selectedStock.change >= 0 ? '#22c55e' : '#ef4444';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        requestAnimationFrame(animate);
      };
      
      animate();
    }
  }, [selectedStock]);

  const sectors = ['all', ...new Set(stocks.map(stock => stock.sector))];
  
  const filteredAndSortedStocks = stocks
    .filter(stock => 
      (stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterSector === 'all' || stock.sector === filterSector)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'changePercent':
          return Math.abs(b.changePercent) - Math.abs(a.changePercent);
        case 'price':
          return b.price - a.price;
        case 'volume':
          return parseFloat(b.volume) - parseFloat(a.volume);
        default:
          return 0;
      }
    });

  const toggleWatchlist = (symbol) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const MarketStatsCard = ({ title, value, change, changePercent, icon: Icon, gradient }) => (
    <div className={`bg-gradient-to-br ${gradient} p-1 rounded-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer`}>
      <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 h-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/70 text-sm font-medium">{title}</p>
            <p className={`text-2xl font-bold text-white transition-all duration-300 ${isAnimating ? 'scale-105' : ''}`}>
              {value.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-white/10 rounded-xl">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            change >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {change >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {change >= 0 ? '+' : ''}{change.toFixed(2)}
          </div>
          <span className={`text-xs ${change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            ({changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );

  const StockCard = ({ stock, index }) => (
    <div
      className={`group relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 
                 transition-all duration-500 hover:from-white/10 hover:to-white/15 hover:scale-[1.02] hover:shadow-2xl 
                 cursor-pointer transform ${isAnimating ? 'animate-pulse' : ''}`}
      onClick={() => setSelectedStock(stock)}
      onMouseEnter={() => setHoveredStock(stock.symbol)}
      onMouseLeave={() => setHoveredStock(null)}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${
        hoveredStock === stock.symbol ? 'opacity-100' : 'opacity-0'
      } ${stock.change >= 0 ? 'bg-green-500/10 shadow-green-500/20' : 'bg-red-500/10 shadow-red-500/20'} shadow-2xl`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${
              stock.change >= 0 ? 'from-green-400 to-emerald-600' : 'from-red-400 to-rose-600'
            } rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:rotate-12`}>
              <span className="text-white font-bold text-lg">{stock.symbol.substring(0, 2)}</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-xl font-bold text-white">{stock.symbol}</h4>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWatchlist(stock.symbol);
                  }}
                  className={`p-1 rounded-full transition-all duration-300 ${
                    watchlist.includes(stock.symbol) ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                  }`}
                >
                  <Star className={`w-4 h-4 ${watchlist.includes(stock.symbol) ? 'fill-current' : ''}`} />
                </button>
                {stock.news > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{stock.news} news</span>
                )}
              </div>
              <p className="text-gray-300 text-sm">{stock.name}</p>
              <p className="text-gray-400 text-xs">{stock.sector}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-white">₹{stock.price.toFixed(2)}</p>
            <div className="flex items-center justify-end space-x-2 mb-2">
              <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                stock.change >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {stock.change >= 0 ? '+' : ''}₹{Math.abs(stock.change).toFixed(2)}
              </span>
              <span className={`text-sm font-bold ${
                stock.change >= 0 ? 'text-green-300' : 'text-red-300'
              }`}>
                ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </span>
            </div>
            <div className="text-xs text-gray-400">
              Vol: {stock.volume} | P/E: {stock.pe}
            </div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="h-16 mb-4 bg-black/20 rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-end justify-center space-x-1 p-2">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-all duration-1000 ${
                  stock.change >= 0 ? 'bg-green-400' : 'bg-red-400'
                }`}
                style={{
                  height: `${20 + Math.sin(i * 0.5 + Date.now() * 0.001) * 20 + Math.random() * 20}%`,
                  animationDelay: `${i * 50}ms`
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress indicators */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-400">
            <span>52W Low: ₹{stock.low52w}</span>
            <span>52W High: ₹{stock.high52w}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                stock.change >= 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-rose-500'
              }`}
              style={{ 
                width: `${((stock.price - stock.low52w) / (stock.high52w - stock.low52w)) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-4 left-1/2 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 backdrop-blur-xl bg-white/5 border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform transition-transform hover:scale-110">
                <span className="text-white font-bold text-xl">AS</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  ApnaStocks.in
                </h1>
                <p className="text-sm text-gray-400">Real-time Market Intelligence</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              <div className="text-white text-sm font-mono bg-white/10 px-3 py-2 rounded-lg">
                {currentTime.toLocaleTimeString('en-IN')} IST
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-6xl font-bold text-white leading-tight">
              Your Gateway to 
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"> Indian Markets</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience real-time trading insights with advanced analytics, interactive charts, and AI-powered market intelligence
            </p>
          </div>

          {/* Enhanced Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl p-1">
                <div className="flex items-center">
                  <Search className="w-6 h-6 text-gray-400 ml-4" />
                  <input
                    type="text"
                    placeholder="Search stocks, sectors, or market cap..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  />
                  <div className="flex items-center space-x-2 pr-4">
                    <select
                      value={filterSector}
                      onChange={(e) => setFilterSector(e.target.value)}
                      className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-purple-500"
                    >
                      {sectors.map(sector => (
                        <option key={sector} value={sector} className="bg-gray-800">
                          {sector === 'all' ? 'All Sectors' : sector}
                        </option>
                      ))}
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white/10 text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-purple-500"
                    >
                      <option value="changePercent" className="bg-gray-800">Top Movers</option>
                      <option value="price" className="bg-gray-800">Price</option>
                      <option value="volume" className="bg-gray-800">Volume</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex justify-center space-x-2">
            {['overview', 'watchlist', 'sectors'].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeView === view
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MarketStatsCard
            title="NIFTY 50"
            value={marketStats.nifty.value}
            change={marketStats.nifty.change}
            changePercent={marketStats.nifty.changePercent}
            icon={TrendingUp}
            gradient="from-emerald-500 to-teal-600"
          />
          <MarketStatsCard
            title="SENSEX"
            value={marketStats.sensex.value}
            change={marketStats.sensex.change}
            changePercent={marketStats.sensex.changePercent}
            icon={BarChart3}
            gradient="from-blue-500 to-indigo-600"
          />
          <MarketStatsCard
            title="Market Volume"
            value={parseFloat(marketStats.totalVolume.replace(/[₹,\s]/g, ''))}
            change={1234}
            changePercent={2.1}
            icon={Activity}
            gradient="from-purple-500 to-violet-600"
          />
          <MarketStatsCard
            title="Market Cap"
            value={parseFloat(marketStats.marketCap.replace(/[₹,\s]/g, '')) / 100}
            change={15670}
            changePercent={0.8}
            icon={PieChart}
            gradient="from-pink-500 to-rose-600"
          />
        </div>

        {/* Notifications Panel */}
        {notifications.length > 0 && (
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              Live Market Alerts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-xl border-l-4 ${
                    notification.type === 'gain' ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p className="text-white text-sm">{notification.message}</p>
                    <span className="text-gray-400 text-xs">{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stock List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-bold text-white flex items-center">
              {activeView === 'watchlist' && <Star className="w-8 h-8 mr-3 text-yellow-400" />}
              {activeView === 'overview' && <Globe className="w-8 h-8 mr-3 text-blue-400" />}
              {activeView === 'sectors' && <PieChart className="w-8 h-8 mr-3 text-purple-400" />}
              {activeView === 'watchlist' ? 'My Watchlist' : 
               activeView === 'sectors' ? 'Sector Performance' : 'Live Stock Prices'}
            </h3>
            <div className="text-sm text-gray-400">
              {filteredAndSortedStocks.length} stocks • Updated {currentTime.toLocaleTimeString()}
            </div>
          </div>
          
          <div className="grid gap-6">
            {(activeView === 'watchlist' 
              ? filteredAndSortedStocks.filter(stock => watchlist.includes(stock.symbol))
              : filteredAndSortedStocks
            ).map((stock, index) => (
              <StockCard key={stock.symbol} stock={stock} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced Stock Detail Modal */}
        {selectedStock && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${
                      selectedStock.change >= 0 ? 'from-green-400 to-emerald-600' : 'from-red-400 to-rose-600'
                    } rounded-2xl flex items-center justify-center`}>
                      <span className="text-white font-bold text-xl">{selectedStock.symbol.substring(0, 2)}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">{selectedStock.name}</h3>
                      <p className="text-gray-300">{selectedStock.symbol} • {selectedStock.sector}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStock(null)}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Price Info */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                        <p className="text-gray-400 text-sm mb-2">Current Price</p>
                        <p className="text-4xl font-bold text-white">₹{selectedStock.price.toFixed(2)}</p>
                        <div className={`flex items-center mt-2 px-3 py-1 rounded-full text-sm font-bold ${
                          selectedStock.change >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                        }`}>
                          {selectedStock.change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                          {selectedStock.change >= 0 ? '+' : ''}₹{selectedStock.change.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                        <p className="text-gray-400 text-sm mb-2">Change %</p>
                        <p className={`text-4xl font-bold ${selectedStock.changePercent >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                          {selectedStock.changePercent >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                        </p>
                        <p className="text-gray-400 text-sm mt-2">Today's Performance</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20">
                        <p className="text-blue-300 text-sm mb-1">Volume</p>
                        <p className="text-xl font-bold text-white">{selectedStock.volume}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-4 border border-purple-500/20">
                        <p className="text-purple-300 text-sm mb-1">P/E Ratio</p>
                        <p className="text-xl font-bold text-white">{selectedStock.pe}</p>
                      </div>
                      <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 rounded-xl p-4 border border-pink-500/20">
                        <p className="text-pink-300 text-sm mb-1">Market Cap</p>
                        <p className="text-xl font-bold text-white">{selectedStock.marketCap}</p>
                      </div>
                    </div>

                    {/* 52 Week Range */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-white font-bold mb-4">52 Week Range</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-red-300">Low: ₹{selectedStock.low52w}</span>
                          <span className="text-green-300">High: ₹{selectedStock.high52w}</span>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 h-3 rounded-full relative transition-all duration-1000"
                              style={{ width: `${((selectedStock.price - selectedStock.low52w) / (selectedStock.high52w - selectedStock.low52w)) * 100}%` }}
                            >
                              <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg transform translate-x-1/2 -translate-y-0"></div>
                            </div>
                          </div>
                          <p className="text-center text-xs text-gray-400 mt-2">
                            Current: ₹{selectedStock.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Chart */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-white font-bold mb-4 flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Live Price Chart
                      </h4>
                      <div className="relative h-64 bg-black/20 rounded-xl overflow-hidden">
                        <canvas
                          ref={chartRef}
                          className="w-full h-full"
                        />
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                          <p className="text-white text-sm font-bold">₹{selectedStock.price.toFixed(2)}</p>
                          <p className={`text-xs ${selectedStock.change >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                            {selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                          </p>
                        </div>
                      </div>
                      
                      {/* Chart Controls */}
                      <div className="flex justify-center space-x-2 mt-4">
                        {['1D', '5D', '1M', '3M', '1Y'].map((period) => (
                          <button
                            key={period}
                            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-all duration-200"
                          >
                            {period}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10">
                      <h4 className="text-white font-bold mb-4">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Open:</span>
                          <span className="text-white">₹{(selectedStock.price - selectedStock.change).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Prev Close:</span>
                          <span className="text-white">₹{(selectedStock.price - selectedStock.change).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Day High:</span>
                          <span className="text-white">₹{(selectedStock.price + Math.abs(selectedStock.change) * 0.5).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Day Low:</span>
                          <span className="text-white">₹{(selectedStock.price - Math.abs(selectedStock.change) * 0.3).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Avg Volume:</span>
                          <span className="text-white">{selectedStock.volume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Beta:</span>
                          <span className="text-white">{(Math.random() * 2 + 0.5).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* News & Insights */}
                    {selectedStock.news > 0 && (
                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                        <h4 className="text-white font-bold mb-4 flex items-center">
                          <Activity className="w-5 h-5 mr-2" />
                          Latest News ({selectedStock.news})
                        </h4>
                        <div className="space-y-3">
                          {Array.from({ length: Math.min(selectedStock.news, 3) }).map((_, i) => (
                            <div key={i} className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <div>
                                <p className="text-white text-sm font-medium">
                                  {selectedStock.symbol} reports {selectedStock.change >= 0 ? 'strong' : 'mixed'} quarterly results
                                </p>
                                <p className="text-gray-400 text-xs mt-1">
                                  {Math.floor(Math.random() * 60)} minutes ago
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => toggleWatchlist(selectedStock.symbol)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      watchlist.includes(selectedStock.symbol)
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    <Star className={`w-5 h-5 ${watchlist.includes(selectedStock.symbol) ? 'fill-current' : ''}`} />
                    <span>{watchlist.includes(selectedStock.symbol) ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
                    <TrendingUp className="w-5 h-5" />
                    <span>Buy</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-rose-700 transition-all duration-300">
                    <TrendingDown className="w-5 h-5" />
                    <span>Sell</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-slate-900/50 to-slate-800/50 backdrop-blur-xl border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AS</span>
                </div>
                <span className="text-xl font-bold text-white">ApnaStocks.in</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted Indian stock market companion with real-time data and intelligent insights.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Markets</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">NSE</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">BSE</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Commodities</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Mutual Funds</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Tools</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Portfolio Tracker</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Stock Screener</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Market Analysis</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Price Alerts</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Help Center</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">API Documentation</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Contact Us</p>
                <p className="text-gray-400 hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 ApnaStocks.in - Powered by cutting-edge technology and market intelligence
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Real-time data • Advanced Analytics • Secure Trading
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
