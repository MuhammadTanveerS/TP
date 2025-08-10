"use client";

import { useState } from 'react';
import { BookOpen, Search, Download, Star, Users, Clock, ChevronRight, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {db} from './firebase';

export default function StudyNotesHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const goToX = () => {
    router.push('/x'); 
  };

   const goToXi = () => {
    router.push('/xi'); 
  };


  const subjects = [
    { name: 'X', notes: 24, color: 'bg-blue-100 text-blue-800', link:'x' },
    { name: 'XI', notes: 18, color: 'bg-green-100 text-green-800', link:'xi' },
    // { name: 'Chemistry', notes: 21, color: 'bg-purple-100 text-purple-800' },
    // { name: 'Biology', notes: 15, color: 'bg-pink-100 text-pink-800' },
    // { name: 'History', notes: 12, color: 'bg-yellow-100 text-yellow-800' },
    // { name: 'Literature', notes: 16, color: 'bg-indigo-100 text-indigo-800' }
  ];

  const recentNotes = [
    { title: 'Calculus: Derivatives and Applications', subject: 'Mathematics', date: '2 days ago', downloads: 156 },
    // { title: 'Quantum Mechanics Fundamentals', subject: 'Physics', date: '3 days ago', downloads: 89 },
    // { title: 'Organic Chemistry Reactions', subject: 'Chemistry', date: '1 week ago', downloads: 203 },
    // { title: 'Cell Biology and Genetics', subject: 'Biology', date: '1 week ago', downloads: 134 }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 cursor-pointer">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-white ">IBA PSS</span>
            </div>
            
            {/* Desktop Navigation */}
            {/* <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">All Notes</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Subjects</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Recent</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Upload Notes
              </button>
            </div> */}

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {/* {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-300 hover:text-blue-400 px-2 py-2">All Notes</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 px-2 py-2">Subjects</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 px-2 py-2">Recent</a>
                <a href="#" className="text-gray-300 hover:text-blue-400 px-2 py-2">About</a>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-2 mt-2">
                  Upload Notes
                </button>
              </div>
            </div>
          )} */}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Student Learning Materials
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
             Study Notes & Resources by Your Instructor
            </p>
            
            {/* Search Bar */}
            {/* <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for notes, subjects, or topics..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-800 text-white placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 border border-gray-600"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div> */}

            {/* Stats */}
            {/* <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">150+</div>
                <div className="text-gray-400">Study Notes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">12</div>
                <div className="text-gray-400">Subjects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-gray-400">Students</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Subjects Grid */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Browse by Grade</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
              <div onClick={goToX} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Grade X</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium `}>
                      View
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Comprehensive study materials and notes for students of Grade X.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Updated weekly</span>
                  </div>
                </div>
              </div>

              <div onClick={goToXi} className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 hover:shadow-lg hover:border-gray-600 transition-all cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">Grade XI</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium `}>
                      View
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">
                    Comprehensive study materials and notes for students of Grade XI.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Updated weekly</span>
                  </div>
                </div>
              </div>

          </div>
        </section>

        {/* Recent Notes */}
        {/* <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recently Added</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentNotes.map((note, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1 mr-4">{note.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{note.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{note.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{note.downloads} downloads</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* Features Section */}
        {/* <section className="bg-white rounded-2xl shadow-sm border p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose StudyNotes?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Notes</h3>
              <p className="text-gray-600">
                Detailed study materials covering all major topics and concepts in your curriculum.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600">
                All notes are reviewed and curated to ensure accuracy and educational value.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaborative Learning</h3>
              <p className="text-gray-600">
                Connect with fellow students and contribute to a growing knowledge base.
              </p>
            </div>
          </div>
        </section> */}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">StudyNotes</span>
              </div>
              <p className="text-gray-400">
                Empowering students with quality study materials and collaborative learning resources.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">All Notes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Subjects</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Upload</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report Issue</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Get notified about new study materials and updates.</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IBA PSS. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}