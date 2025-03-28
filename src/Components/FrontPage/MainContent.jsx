import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CardSection from "./MainContentComponent/CardSection";
import FeatureBox from "./MainContentComponent/FeatureBox";
import image1 from "./img/image2.png";
import image2 from "./img/image7.jpg";
import image3 from "./img/image8.png";
import image4 from "./img/image9.jfif";
import image5 from "./img/image1.jpg";
import image6 from "./img/image4.png";

const MainContent = () => {
  const [hoverButton, setHoverButton] = useState(null);
  const [textIndex, setTextIndex] = useState(0);
  const [bgImageIndex, setBgImageIndex] = useState(0);

  const backgroundImages = [image1, image2, image3, image4, image5];
  const headlineTexts = [
    "Transform Data Into Actionable Insights",
    "Turn Complex Data Into Clear Decisions",
    "Unlock Hidden Patterns In Your Data",
    "Predict Trends Before They Happen",
  ];
  const descriptionTexts = [
    "DataAI Insights uses advanced AI to analyze your data, uncover patterns, and deliver predictive insights in minutes.",
    "Our AI platform helps businesses of all sizes make data-driven decisions with clarity.",
    "Combine machine learning with intuitive visuals to see what others miss.",
    "Stop reacting — start predicting future outcomes with advanced forecasting.",
  ];

  // Combined transition timing
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % headlineTexts.length);
      setBgImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#3b0764] to-[#240046] relative overflow-hidden">
        {/* Background Images with Framer Motion */}
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={bgImageIndex}
              src={backgroundImages[bgImageIndex]}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/90 via-[#3b0764]/70 to-[#240046]/90"></div>
        </div>

        {/* Image6 in upper right corner */}
        <motion.div
          className="absolute bottom-4 right-0 z-20"
          style={{ width: '600px', height: '600px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src={image6}
            alt="Decoration"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between">
          {/* Left Content Section */}
          <div className="max-w-xl mb-12 md:mb-0">
            <div className="relative h-8">
              <span className="inline-block text-cyan-400 font-medium text-sm md:text-base uppercase tracking-wide mb-3 animate-pulse">
                AI-POWERED DATA ANALYSIS
              </span>
            </div>

            {/* Headline with Framer Motion */}
            <div className="mb-6 relative h-32 md:h-40 lg:h-48 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={textIndex}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-transparent bg-clip-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {headlineTexts[textIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Description with Framer Motion */}
            <div className="relative mb-8 h-24 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={textIndex}
                  className="text-slate-300 text-lg w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {descriptionTexts[textIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-[#00F5A0] to-[#00D9F5] text-slate-900 font-semibold rounded-lg relative overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoverButton("trial")}
                onMouseLeave={() => setHoverButton(null)}
              >
                Start Free Trial
              </motion.button>

              <motion.button
                className="px-8 py-3 bg-transparent border border-slate-600 text-white font-semibold rounded-lg relative"
                whileHover={{ 
                  y: -5, 
                  borderColor: "#f472b6",
                  backgroundColor: "rgba(30, 41, 59, 0.3)",
                  boxShadow: "0 10px 25px -5px rgba(244, 114, 182, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoverButton("demo")}
                onMouseLeave={() => setHoverButton(null)}
              >
                Watch Demo
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Real-time analysis", "Predictive insights", "No-code solution"].map(
                (feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2 p-2 rounded-lg bg-slate-900/30 border border-slate-700/50"
                    whileHover={{ 
                      backgroundColor: "rgba(30, 41, 59, 0.4)",
                      borderColor: "rgba(34, 211, 238, 0.2)"
                    }}
                  >
                    <CheckCircle className="text-cyan-400 h-5 w-5" />
                    <span className="text-slate-300">{feature}</span>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Empty Right Section */}
          <div className="w-full md:w-2/5 lg:w-1/2"></div>
        </div>
      </div>

      {/* Card Section */}
      <div id="card-section">
        <CardSection />
      </div>

      {/* Feature Box */}
      <div id="feature-box">
        <FeatureBox />
      </div>
    </section>
  );
};

export default MainContent;