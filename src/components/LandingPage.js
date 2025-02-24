import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ArrowRightIcon,
  SparklesIcon,
  ClipboardIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    {
      icon: <ClipboardIcon className="h-8 w-8" />,
      title: "Stay Organized",
      description: "Keep your tasks organized in a clean, intuitive interface",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: "Beautiful Design",
      description: "Modern and minimal design that enhances productivity",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <BoltIcon className="h-8 w-8" />,
      title: "Quick & Easy",
      description: "Simple and fast way to manage your daily tasks",
      color: "bg-emerald-50 border-emerald-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
            Task Management
            <br />
            <span className="text-primary">Simplified</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience a cleaner, more efficient way to manage your tasks
          </p>
          
          <motion.div
            whileHover="hover"
            variants={{
              hover: {
                scale: 1.02,
                transition: { duration: 0.2 }
              }
            }}
          >
            <Link 
              to="/todo"
              className="group relative inline-flex items-center gap-2 bg-primary px-8 py-4 rounded-lg font-semibold text-lg text-white overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <ArrowRightIcon className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-secondary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-xl ${feature.color} border-2 backdrop-blur-lg transform transition-all duration-300 hover:shadow-lg`}
            >
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-20"
          variants={itemVariants}
        >
          <div className="inline-block p-8 rounded-2xl bg-white shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Ready to Start?</h2>
            <p className="text-gray-600 mb-6">
              Begin organizing your tasks in a better way
            </p>
            <motion.div
              whileHover="hover"
              variants={{
                hover: {
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }
              }}
            >
              <Link 
                to="/todo"
                className="group relative inline-flex items-center gap-2 bg-white border-2 border-primary px-8 py-3 rounded-lg font-semibold text-primary overflow-hidden"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Try Now</span>
                <ArrowRightIcon className="h-5 w-5 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all" />
                <div className="absolute inset-0 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/5 rounded-full w-32 h-32 md:w-64 md:h-64"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingPage; 