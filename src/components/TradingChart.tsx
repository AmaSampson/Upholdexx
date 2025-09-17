import React, { useEffect, useRef } from 'react';

const TradingChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Generate mock price data
    const generatePriceData = () => {
      const data = [];
      let price = 43000;
      for (let i = 0; i < 100; i++) {
        price += (Math.random() - 0.5) * 1000;
        data.push(price);
      }
      return data;
    };

    const priceData = generatePriceData();
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    const padding = 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * (width - 2 * padding)) / 10;
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding + (i * (height - 2 * padding)) / 5;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw price line
    const minPrice = Math.min(...priceData);
    const maxPrice = Math.max(...priceData);
    const priceRange = maxPrice - minPrice;

    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();

    priceData.forEach((price, index) => {
      const x = padding + (index * (width - 2 * padding)) / (priceData.length - 1);
      const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
    gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    priceData.forEach((price, index) => {
      const x = padding + (index * (width - 2 * padding)) / (priceData.length - 1);
      const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding);
      ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();

    // Draw price labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
      const price = minPrice + (i * priceRange) / 5;
      const y = height - padding - (i * (height - 2 * padding)) / 5;
      ctx.fillText(`$${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, padding - 10, y + 4);
    }

    // Animation loop for live updates
    const animate = () => {
      // Add small random movement to simulate live data
      const lastPrice = priceData[priceData.length - 1];
      const newPrice = lastPrice + (Math.random() - 0.5) * 200;
      priceData.shift();
      priceData.push(newPrice);

      // Redraw chart (simplified for performance)
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 2000);
    };

    animate();
  }, []);

  return (
    <div className="w-full h-64 relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      <div className="absolute top-4 left-4 text-white">
        <div className="text-2xl font-bold">$43,250.00</div>
        <div className="text-green-400 text-sm flex items-center">
          +2.45% (24h)
        </div>
      </div>
    </div>
  );
};

export default TradingChart;