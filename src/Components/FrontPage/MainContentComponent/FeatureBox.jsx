import { useState, useRef } from 'react';
import { FaBrain, FaUsers, FaCogs, FaDatabase } from 'react-icons/fa'; // Import FontAwesome icons

const FeatureBox = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const heroRef = useRef(null);

  const featureCards = [
    {
      id: "decision-making",
      title: "Decision-Making Agility",
      icon: <FaBrain className="text-purple-400 w-8 h-8" />,
      items: [
        "AI copilots assisted analytics",
        "Natural language querying",
        "AI-driven insights",
        "Interactive visualizations",
        "Reduced IT reliance",
      ],
    },
    {
      id: "customer-experience",
      title: "Enhanced Customer Experiences",
      icon: <FaUsers className="text-purple-400 w-8 h-8" />,
      items: [
        "Deep insights into behavior",
        "Personalized experiences",
        "Improved customer satisfaction",
      ],
    },
    {
      id: "operational-efficiency",
      title: "Operational Efficiency",
      icon: <FaCogs className="text-purple-400 w-8 h-8" />,
      items: [
        "Modern data infrastructure",
        "Streamlined processes",
        "Automated tasks",
        "Optimized resources",
        "Cost savings",
      ],
    },
    {
      id: "data-foundation",
      title: "Modern Data Foundations",
      icon: <FaDatabase className="text-purple-400 w-8 h-8" />,
      items: [
        "High data quality & governance",
        "Data freshness & reliability",
        "Strong data security",
        "Improved decision-making",
        "Competitive edge",
      ],
    },
  ];

  return (
    <div
      ref={heroRef}
      className="flex flex-col items-center w-full h-full relative overflow-hidden bg-[#240046] p-8"
    >
      {/* Content Section */}
      <div className="space-y-5 text-center mb-12">
        <h1 className="text-purple-300 text-4xl font-semibold">
          Why You Need AI for Data Analysis
        </h1>
        <p className="p-5 text-gray-300 text-lg mt-2">
          <span className="font-semibold text-white">The Future </span>
          {` belongs to those who act. Here's why you can't afford to wait.`}
        </p>
      </div>

      {/* Feature Grid with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full px-4">
        {featureCards.map((card) => (
          <div
            key={card.id}
            className="bg-slate-950 border border-gray-800 rounded-3xl overflow-hidden transform-none transition-all duration-300 hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/20 p-6"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Card Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                {card.icon}
              </div>
            </div>

            {/* Card Title */}
            <h3 className="text-2xl font-bold text-purple-400 mt-4 text-center">
              {card.title}
            </h3>
            <hr className="border-t-2 border-purple-500/30 w-16 mx-auto my-3" />

            {/* Card Content */}
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
