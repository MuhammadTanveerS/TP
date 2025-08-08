"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// 1. Topic Icon Component
const TopicIcon = ({ icon: IconComponent, color, isHovered }) => {
  return (
    <div
      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center shadow-lg transform transition-all duration-300 ${isHovered ? 'rotate-6 scale-110' : 'rotate-0 scale-100'
        }`}
    >
      <IconComponent className="w-6 h-6 text-white" />
    </div>
  );
};

// 2. Topic Content Component
const TopicContent = ({ title, description, isHovered }) => {
  return (
    <div className="flex-1 min-w-0">
      <h3
        className={`text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300 ${isHovered ? 'text-gray-700 dark:text-gray-200' : ''
          }`}
      >
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed truncate">
        {description}
      </p>
    </div>
  );
};

// 3. Action Button Component
const ActionButton = ({ color, isHovered }) => {
  return (
    <div
      className={`flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center transition-all duration-300 ${isHovered
          ? 'bg-gradient-to-r ' + color + ' shadow-lg scale-110'
          : 'group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
        }`}
    >
      <ArrowRight
        className={`w-5 h-5 transition-all duration-300 ${isHovered
            ? 'text-white translate-x-1'
            : 'text-gray-600 dark:text-gray-400'
          }`}
      />
    </div>
  );
};

// 4. Shine Effect Component
const ShineEffect = () => {
  return (
    <div
      className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -translate-x-full group-hover:translate-x-full group-hover:opacity-20 transition-all duration-1000 ease-out`}
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
      }}
    />
  );
};

// 5. Topic Card Background Component
const TopicCardBackground = ({ color, isHovered }) => {
  return (
    <>
      {/* Gradient Background Overlay */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      />

      {/* Animated Border */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-all duration-300`}
        style={{
          background: `linear-gradient(90deg, transparent, transparent)`,
          backgroundImage: isHovered ? `linear-gradient(90deg, var(--tw-gradient-stops))` : 'none',
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor'
        }}
      />
    </>
  );
};

// 6. Individual Topic Item Component
const TopicItem = ({ topic, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

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
        <TopicCardBackground color={topic.color} isHovered={isHovered} />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <TopicIcon 
              icon={topic.icon} 
              color={topic.color} 
              isHovered={isHovered} 
            />
            <TopicContent 
              title={topic.title} 
              description={topic.description} 
              isHovered={isHovered} 
            />
          </div>

          <ActionButton color={topic.color} isHovered={isHovered} />
        </div>

        <ShineEffect />
      </div>
    </div>
  );
};

// 7. Loading Skeleton Component
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

// 8. Page Header Component
const PageHeader = () => {
  return (
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
  );
};

// 9. Page Footer Component
const PageFooter = ({ topicCount, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="text-center mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
      <p className="text-gray-500 dark:text-gray-400">
        Found {topicCount} topics to explore
      </p>
    </div>
  );
};

// 10. Topics List Component
const TopicsList = ({ topics, isLoading, visibleItems }) => {
  return (
    <div className="space-y-4">
      {isLoading
        ? Array.from({ length: 6 }, (_, index) => (
            <TopicSkeleton key={`skeleton-${index}`} index={index} />
          ))
        : topics.map((topic, index) => (
            <TopicItem
              key={topic.id}
              topic={topic}
              index={index}
              isVisible={visibleItems.has(index)}
            />
          ))
      }
    </div>
  );
};

// 11. Custom Styles Component
const CustomStyles = () => (
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
);

export default function StudentsPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "X"));
        const studentData = [];

        querySnapshot.forEach((doc) => {
          studentData.push({ id: doc.id, ...doc.data() });
        });

        setNotes(studentData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <p>Loading Learning Materials...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      {notes.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((student) => (
            <li
              key={student.id}
              className="border p-4 rounded shadow-md bg-white"
            >
              <p><strong>Name:</strong> {student.chapter}</p>
              <p><strong>Age:</strong> {student.link}</p>
              <p><strong>Grade:</strong> {student.topic}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
