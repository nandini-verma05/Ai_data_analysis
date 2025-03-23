import  { useState, useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import CardSection from "./MainContentComponent/CardSection";
import FeatureBox from "./MainContentComponent/FeatureBox";

const MainContent = () => {
  const [hoverButton, setHoverButton] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);
  
  // Track mouse position for cursor-following effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setIsHovering(true);
      }
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);
  
  return (
    <section>
      <div 
        ref={heroRef}
        className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 relative overflow-hidden"
      >
        {/* Neon grid background */}
        <div className="absolute inset-0 bg-grid-slate-800/10 opacity-30 
                      after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-slate-950 after:to-transparent"></div>
        
        {/* Animated neon glow elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl "></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500 rounded-full filter blur-2xl " ></div>
        <div className="absolute top-1/2 -left-20 w-40 h-40 bg-cyan-500 rounded-full filter blur-3xl " ></div>
        
        {/* Cursor-following neon particles */}
        <div 
          className="pointer-events-none absolute w-12 h-12 rounded-full bg-cyan-500 opacity-30 blur-xl transition-all duration-100 ease-out"
          style={{ 
            left: `${mousePosition.x}px`, 
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 0.3 : 0
          }}
        />
        <div 
          className="pointer-events-none absolute w-6 h-6 rounded-full bg-blue-400 opacity-50 blur-md transition-all duration-200 ease-out"
          style={{ 
            left: `${mousePosition.x}px`, 
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 0.5 : 0
          }}
        />
        <div 
          className="pointer-events-none absolute w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-75 ease-out"
          style={{ 
            left: `${mousePosition.x}px`, 
            top: `${mousePosition.y}px`,
            transform: 'translate(-50%, -50%)',
            opacity: isHovering ? 1 : 0
          }}
        />
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between">
          {/* Content section */}
          <div className="max-w-xl mb-12 md:mb-0">
            <span className="inline-block text-blue-400 font-medium text-sm md:text-base uppercase tracking-wide mb-3 
                           animate-pulse">
              AI-POWERED DATA ANALYSIS
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 
                         bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500 text-transparent bg-clip-text 
                         shadow-blue-500/20 relative">
              Transform Data Into Actionable Insights
              <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-20 blur-xl"></span>
            </h1>
            
            <p className="text-slate-300 text-lg mb-8">
              DataAI Insights uses advanced artificial intelligence to analyze your data, uncover hidden patterns, and deliver predictive insights in minutes, not days.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <button 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg 
                         transition-all duration-300 transform hover:-translate-y-1 relative group overflow-hidden"
                onMouseEnter={() => setHoverButton('trial')}
                onMouseLeave={() => setHoverButton(null)}
              >
                Start Free Trial
                {/* Neon glow effect on hover */}
                <span className={`absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-30 blur transition-opacity duration-300`}></span>
                <span className={`absolute inset-0 border border-blue-400 rounded-lg ${hoverButton === 'trial' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 
                                shadow-[0_0_15px_rgba(59,130,246,0.5)]`}></span>
              </button>
              
              <button 
                className="px-6 py-3 bg-transparent border border-slate-600 text-white font-semibold rounded-lg 
                         hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 relative group"
                onMouseEnter={() => setHoverButton('demo')}
                onMouseLeave={() => setHoverButton(null)}
              >
                Watch Demo
                <span className={`absolute inset-0 border border-blue-400 rounded-lg ${hoverButton === 'demo' ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 
                                shadow-[0_0_15px_rgba(59,130,246,0.5)]`}></span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Real-time analysis', 'Predictive insights', 'No-code solution'].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 group hover:bg-slate-800/30 p-2 rounded-lg transition-all duration-300"
                >
                  <CheckCircle className="text-cyan-400 h-5 w-5 group-hover:text-cyan-300 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.7)] transition-all duration-300" />
                  <span className="text-slate-300 group-hover:text-white transition-colors duration-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dashboard visualization */}
          <div className="w-full md:w-2/5 lg:w-1/2 relative group">
            <div className="relative z-20 transform translate-x-6 md:translate-x-12 lg:translate-x-0 transition-all duration-500 
                          group-hover:translate-y-2 group-hover:scale-105">
              <div className="bg-slate-950 border border-gray-800 rounded-3xl overflow-hidden max-w-xl cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20">
                <img src="/api/placeholder/600/400" alt="AI Analytics Dashboard" className="rounded-lg w-full" />
                
                {/* Neon highlight lines */}
                
              </div>
            </div>
            
            {/* Interactive glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-50 group-hover:opacity-20 group-hover:w-72 group-hover:h-72 transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    
      <div id="card-section" className="">  
        <CardSection />
      </div>
      
      <div id="feature-box" >
        <FeatureBox />
      </div>
    </section>
  );
};

export default MainContent;