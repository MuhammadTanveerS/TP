"use client";
import { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink, BookOpen, Zap, Target, Lightbulb, Code, Star, Heart, Rocket } from 'lucide-react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Sample data - replace with your actual data
const topicsData = [
  {
    id: 1,
    title: "Advanced React Patterns",
    description: "Master complex React patterns and best practices",
    url: "https://example.com/react-patterns",
    icon: Code,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Core concepts every developer should know",
    url: "https://example.com/js-fundamentals",
    icon: Zap,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Create beautiful and intuitive user interfaces",
    url: "https://example.com/ui-ux",
    icon: Star,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "Web Performance Optimization",
    description: "Techniques to make your websites lightning fast",
    url: "https://example.com/performance",
    icon: Rocket,
    color: "from-green-500 to-teal-500"
  },
  {
    id: 5,
    title: "Modern CSS Techniques",
    description: "Advanced CSS features and methodologies",
    url: "https://example.com/css-modern",
    icon: Heart,
    color: "from-red-500 to-rose-500"
  },
  {
    id: 6,
    title: "API Integration Strategies",
    description: "Best practices for working with APIs",
    url: "https://example.com/api-integration",
    icon: Target,
    color: "from-indigo-500 to-blue-500"
  }
];

// Individual Topic Item Component
const TopicItem = ({ topic, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const IconComponent = topic.icon;

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => {
      window.open(topic.url, '_blank', 'noopener,noreferrer');
      setIsPressed(false);
    }, 150);
  };

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-95'
      }`}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      <div
        className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 cursor-pointer transition-all duration-300 ease-out transform ${
          isHovered ? 'scale-105 -translate-y-2' : 'scale-100 translate-y-0'
        } ${
          isPressed ? 'scale-95' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
      >
        {/* Gradient Background Overlay */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${topic.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />
        
        {/* Animated Border */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${topic.color} opacity-0 group-hover:opacity-100 transition-all duration-300`}
          style={{
            background: `linear-gradient(90deg, transparent, transparent)`,
            backgroundImage: isHovered ? `linear-gradient(90deg, var(--tw-gradient-stops))` : 'none',
            padding: '2px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor'
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            {/* Icon */}
            <div
              className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${topic.color} flex items-center justify-center shadow-lg transform transition-all duration-300 ${
                isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'
              }`}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300 ${
                  isHovered ? 'text-gray-700 dark:text-gray-200' : ''
                }`}
              >
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed truncate">
                {topic.description}
              </p>
            </div>
          </div>

          {/* Arrow Button */}
          <div
            className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 ${
              isHovered
                ? 'bg-gradient-to-r ' + topic.color + ' shadow-lg scale-110'
                : 'group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
            }`}
          >
            <ArrowRight
              className={`w-5 h-5 transition-all duration-300 ${
                isHovered
                  ? 'text-white translate-x-1'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Shine Effect */}
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -translate-x-full group-hover:translate-x-full group-hover:opacity-20 transition-all duration-1000 ease-out`}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
          }}
        />
      </div>
    </div>
  );
};

// Loading Skeleton Component
const TopicSkeleton = ({ index }) => (
  <div
    className="animate-pulse"
    style={{
      animationDelay: `${index * 50}ms`
    }}
  >
    <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/2"></div>
        </div>
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

// Main Component
export default function AnimatedTopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(new Set());

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setTopics(topicsData);
      setIsLoading(false);
      
      // Trigger staggered animation
      setTimeout(() => {
        topicsData.forEach((_, index) => {
          setTimeout(() => {
            setVisibleItems(prev => new Set([...prev, index]));
          }, index * 100);
        });
      }, 100);
    };

    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Learning Topics
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection of topics designed to accelerate your learning journey.
          </p>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          {isLoading
            ? // Loading Skeletons
              Array.from({ length: 6 }, (_, index) => (
                <TopicSkeleton key={`skeleton-${index}`} index={index} />
              ))
            : // Actual Topics
              topics.map((topic, index) => (
                <TopicItem
                  key={topic.id}
                  topic={topic}
                  index={index}
                  isVisible={visibleItems.has(index)}
                />
              ))
          }
        </div>

        {/* Footer */}
        {!isLoading && (
          <div className="text-center mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <p className="text-gray-500 dark:text-gray-400">
              Found {topics.length} topics to explore
            </p>
          </div>
        )}
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}