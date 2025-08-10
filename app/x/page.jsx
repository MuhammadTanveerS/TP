"use client";
import { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Make sure to adjust the path to your firebase config
import { ArrowRight, ExternalLink, BookOpen, Zap, Target, Lightbulb, Code, Star, Heart, Rocket, FileText, Book, GraduationCap } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Icon mapping function - maps topic names to icons
const getTopicIcon = (topic) => {
  const iconMap = {
    'react': Code,
    'javascript': Zap,
    'design': Star,
    'performance': Rocket,
    'css': Heart,
    'api': Target,
    'math': Target,
    'science': Lightbulb,
    'literature': Book,
    'default': FileText
  };

  const topicLower = (topic || '').toLowerCase();
  const matchedIcon = Object.keys(iconMap).find(key => topicLower.includes(key));
  return iconMap[matchedIcon] || iconMap.default;
};

// Color mapping function - maps topic names to gradient colors
const getTopicColor = (topic) => {
  const colorMap = {
    'react': "from-blue-500 to-cyan-500",
    'javascript': "from-yellow-500 to-orange-500",
    'design': "from-purple-500 to-pink-500",
    'performance': "from-green-500 to-teal-500",
    'css': "from-red-500 to-rose-500",
    'api': "from-indigo-500 to-blue-500",
    'math': "from-emerald-500 to-teal-500",
    'science': "from-violet-500 to-purple-500",
    'literature': "from-amber-500 to-yellow-500",
    'default': "from-gray-500 to-slate-500"
  };

  // Get all colors except the 'default'
  const colorValues = Object.entries(colorMap)
    .filter(([key]) => key !== 'default')
    .map(([, value]) => value);

  // Pick one randomly based on topic for consistency
  const hash = (topic || '').split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  const randomIndex = Math.abs(hash) % colorValues.length;
  return colorValues[randomIndex];
};

// Chapter Header Component
const ChapterHeader = ({ chapterName, itemCount, isVisible }) => {
  return (
    <div
      className={`transform transition-all duration-500 ease-out mb-6 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {chapterName}
        </h2>
        <div className="h-1 flex-1 bg-gradient-to-r from-purple-600 to-transparent rounded-full"></div>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>
    </div>
  );
};

// 1. Topic Icon Component
const TopicIcon = ({ topic, isHovered }) => {
  const IconComponent = getTopicIcon(topic);
  const color = getTopicColor(topic);

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
const TopicContent = ({ chapter, topic, isHovered }) => {
  return (
    <div className="flex-1 min-w-0">
      <h3
        className={`text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300 ${isHovered ? 'text-gray-700 dark:text-gray-200' : ''
          }`}
      >
        {topic || 'Untitled Topic'}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed truncate">
        {chapter || 'No description available'}
      </p>
    </div>
  );
};

// 3. Action Button Component
const ActionButton = ({ topic, isHovered }) => {
  const color = getTopicColor(topic);

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
const TopicCardBackground = ({ topic, isHovered }) => {
  const color = getTopicColor(topic);

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
const TopicItem = ({ note, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!note.link) return;

    setIsPressed(true);
    setTimeout(() => {
      // Check if the link starts with http/https, if not add https://
      const url = note.link.startsWith('http') ? note.link : `https://${note.link}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsPressed(false);
    }, 150);
  };

  return (
    <div
      className={`transform transition-all duration-700 ease-out ${isVisible
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-8 opacity-0 scale-95'
        }`}
      style={{
        transitionDelay: `${index * 100}ms`
      }}
    >
      <div
        className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-300 ease-out transform ${note.link ? 'cursor-pointer' : 'cursor-default'
          } ${isHovered && note.link ? 'scale-105 -translate-y-2' : 'scale-100 translate-y-0'
          } ${isPressed ? 'scale-95' : ''
          }`}
        onMouseEnter={() => note.link && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => note.link && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
      >
        <TopicCardBackground topic={note.topic} isHovered={isHovered} />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 min-w-0">
            <TopicIcon
              topic={note.topic}
              isHovered={isHovered}
            />
            <TopicContent
              chapter={note.description}
              topic={note.topic}
              isHovered={isHovered}
            />
          </div>

          {note.link && <ActionButton topic={note.topic} isHovered={isHovered} />}
          {!note.link && (
            <div className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gray-400" />
            </div>
          )}
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

// Chapter Skeleton Component
const ChapterSkeleton = ({ index }) => (
  <div
    className="animate-pulse mb-8"
    style={{
      animationDelay: `${index * 100}ms`
    }}
  >
    <div className="flex items-center space-x-4 mb-6">
      <div className="h-1 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg w-48"></div>
      <div className="h-1 flex-1 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
    </div>
    <div className="space-y-4">
      {Array.from({ length: 2 }, (_, itemIndex) => (
        <TopicSkeleton key={`skeleton-${index}-${itemIndex}`} index={itemIndex} />
      ))}
    </div>
  </div>
);

// 8. Page Header Component
const PageHeader = ({ notesCount, chapterCount }) => {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };
  
  return (
    <div className="text-center mb-12">
      <div
        onClick={goToHome}
        className="cursor-pointer inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <GraduationCap className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Grade X Learning Materials
      </h1>
      {chapterCount > 0 && (
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {chapterCount} {chapterCount === 1 ? 'Chapter' : 'Chapters'} • {notesCount} {notesCount === 1 ? 'Resource' : 'Resources'}
        </p>
      )}
    </div>
  );
};

// 9. Error Message Component
const ErrorMessage = ({ message }) => (
  <div className="text-center py-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-2xl mb-4">
      <ExternalLink className="w-8 h-8 text-red-600 dark:text-red-400" />
    </div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Unable to Load Notes
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      {message || 'There was an error loading the study notes. Please try again later.'}
    </p>
  </div>
);

// 10. Empty State Component
const EmptyState = () => (
  <div className="text-center py-12">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
      <BookOpen className="w-8 h-8 text-gray-400" />
    </div>
    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      No Notes Found
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      There are no study notes available at the moment.
    </p>
  </div>
);

// Function to group notes by chapter
const groupNotesByChapter = (notes) => {
  const grouped = notes.reduce((acc, note) => {
    const chapter = note.chapter || 'Uncategorized';
    if (!acc[chapter]) {
      acc[chapter] = [];
    }
    acc[chapter].push(note);
    return acc;
  }, {});

  // Sort chapters naturally (Chapter 1, Chapter 2, etc.)
  const sortedChapters = Object.keys(grouped).sort((a, b) => {
    // Extract numbers from chapter names for proper sorting
    const aNum = parseInt(a.match(/\d+/)?.[0] || '0');
    const bNum = parseInt(b.match(/\d+/)?.[0] || '0');
    
    if (aNum !== bNum) {
      return aNum - bNum;
    }
    
    // If no numbers or same numbers, sort alphabetically
    return a.localeCompare(b);
  });

  return sortedChapters.map(chapter => ({
    chapter,
    notes: grouped[chapter]
  }));
};

// 11. Topics List Component (Updated to show by chapters)
const TopicsList = ({ notes, loading, error, visibleItems, visibleChapters }) => {
  if (loading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 3 }, (_, index) => (
          <ChapterSkeleton key={`chapter-skeleton-${index}`} index={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (notes.length === 0) {
    return <EmptyState />;
  }

  const groupedNotes = groupNotesByChapter(notes);

  return (
    <div className="space-y-8">
      {groupedNotes.map((chapterGroup, chapterIndex) => (
        <div key={chapterGroup.chapter} className="space-y-4">
          <ChapterHeader
            chapterName={chapterGroup.chapter}
            itemCount={chapterGroup.notes.length}
            isVisible={visibleChapters.has(chapterIndex)}
          />
          <div className="space-y-4 pl-4">
            {chapterGroup.notes.map((note, noteIndex) => {
              const globalIndex = notes.findIndex(n => n.id === note.id);
              return (
                <TopicItem
                  key={note.id}
                  note={note}
                  index={globalIndex}
                  isVisible={visibleItems.has(globalIndex)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

// 12. Page Footer Component
const PageFooter = ({ notesCount, chapterCount, isVisible }) => {
  if (!isVisible || notesCount === 0) return null;

  return (
    <div className="text-center mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
      <p className="text-gray-500 dark:text-gray-400">
        Found {notesCount} study {notesCount === 1 ? 'resource' : 'resources'} across {chapterCount} {chapterCount === 1 ? 'chapter' : 'chapters'} from Class X
      </p>
    </div>
  );
};

// 13. Custom Styles Component
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

// 14. Main Component - Firebase Integration
export default function StudentsPage2() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [visibleChapters, setVisibleChapters] = useState(new Set());

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const querySnapshot = await getDocs(collection(db, "X"));
        const studentData = [];

        querySnapshot.forEach((doc) => {
          studentData.push({ id: doc.id, ...doc.data() });
        });

        setNotes(studentData);

        // Group notes by chapter to get chapter count
        const groupedNotes = groupNotesByChapter(studentData);

        // Trigger staggered animation after data loads
        setTimeout(() => {
          // First animate chapter headers
          groupedNotes.forEach((_, chapterIndex) => {
            setTimeout(() => {
              setVisibleChapters(prev => new Set([...prev, chapterIndex]));
            }, chapterIndex * 200);
          });

          // Then animate individual items
          setTimeout(() => {
            studentData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => new Set([...prev, index]));
              }, index * 100);
            });
          }, 300);
        }, 100);

      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to load study notes. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const chapterCount = groupNotesByChapter(notes).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader notesCount={notes.length} chapterCount={chapterCount} />

        <TopicsList
          notes={notes}
          loading={loading}
          error={error}
          visibleItems={visibleItems}
          visibleChapters={visibleChapters}
        />

        <PageFooter
          notesCount={notes.length}
          chapterCount={chapterCount}
          isVisible={!loading && !error}
        />
      </div>

      <CustomStyles />
    </div>
  );
}