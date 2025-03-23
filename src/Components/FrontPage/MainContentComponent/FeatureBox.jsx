import  { useState, useEffect, useRef } from 'react';

const FeatureBox = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const heroRef = useRef(null);

  // Track mouse position for cursor-following effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
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
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const featureCards = [
    {
      id: "decision-making",
      title: "Decision-Making Agility",
      items: [
        "AI copilots assisted analytics",
        "Natural language querying",
        "AI-driven insights",
        "Interactive visualizations",
        "Reduced IT reliance"
      ]
    },
    {
      id: "customer-experience",
      title: "Enhanced Customer Experiences",
      items: [
        "Deep insights into behavior",
        "Personalized experiences",
        "Improved customer satisfaction"
      ]
    },
    {
      id: "operational-efficiency",
      title: "Operational Efficiency",
      items: [
        "Modern data infrastructure",
        "Streamlined processes",
        "Automated tasks",
        "Optimized resources",
        "Cost savings"
      ]
    },
    {
      id: "data-foundation",
      title: "Modern Data Foundations",
      items: [
        "High data quality & governance",
        "Data freshness & reliability",
        "Strong data security",
        "Improved decision-making",
        "Competitive edge"
      ]
    }
  ];

  return (
    <div 
      ref={heroRef}
      className="flex flex-col  items-center w-full h-full relative overflow-hidden bg-slate-950 p-8"
    >
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
        className="pointer-events-none absolute w-6 h-6 rounded-full bg-cyan-400 opacity-50 blur-md transition-all duration-200 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.5 : 0
        }}
      />
      <div 
        className="pointer-events-none absolute w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(147,51,234,0.8)] transition-all duration-75 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 1 : 0
        }}
      />

      {/* Content Section */}
      <div className="space-y-5 text-center mb-12">
        <h1 className="text-purple-300 text-4xl font-semibold">Why You Need an AI for Data Analysis</h1>
        <p className="p-5 text-gray-300 text-lg mt-2">
          <span className="font-semibold text-white">The Future </span>
         ` belongs to those who act. Here's why you can't afford to wait.`
        </p>
      </div>

      {/* Feature Grid with Separate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-4">
        {featureCards.map((card) => (
          <div 
            key={card.id}
            className="bg-slate-950 border border-gray-800 rounded-3xl overflow-hidden max-w-xl cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 p-6"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-500/30 rounded-full" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-purple-400 mt-4 text-center">{card.title}</h3>
            <hr className="border-t-2 border-purple-500/30 w-16 mx-auto my-3" />
            
            <ul className="text-gray-300 text-left space-y-2 text-lg mt-4">
              {card.items.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">🔹</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureBox;