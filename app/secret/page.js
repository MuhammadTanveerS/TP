"use client";

import { useState } from 'react';
import { BookOpen, Upload, X, Plus, ArrowLeft, Save, Eye, FileText, Tag, Calendar, User } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

export default function AddNotesForm() {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
    tags: '',
    difficulty: 'intermediate',
    fileType: 'pdf',
    visibility: 'public'
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'History', 'Literature', 'Computer Science', 'Economics',
    'Psychology', 'Philosophy', 'Engineering', 'Other'
  ];


  //CREATING DB REFERENCE
  const dbref = collection(db, "XI")

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleFileUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   setUploadedFiles(prev => [...prev, ...files]);
  // };

  // const removeFile = (index) => {
  //   setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  // };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);

    try {
      setIsSubmitting(false);
      await addDoc(dbref, {
        chapter: formData.title,
        topic: formData.description,
        link: "www.google.com"
      });
      alert("Document added");
      // Reset form
      setFormData({
        title: '',
        subject: '',
        description: '',
        tags: '',
        difficulty: 'intermediate',
        fileType: 'pdf',
        visibility: 'public'
      });
    } catch (error) {
      setIsSubmitting(false);
      Alert("Error adding document: ", error);
    }

    // // Simulate form submission
    // setTimeout(() => {

    //   setIsSubmitting(false);
    //   console.log(formData)
    //   alert(formData.title);
    //   // Reset form
    //   setFormData({
    //     title: '',
    //     subject: '',
    //     description: '',
    //     tags: '',
    //     difficulty: 'intermediate',
    //     fileType: 'pdf',
    //     visibility: 'public'
    //   });
    // }, 2000);
  };

  const handlePreview = () => {
    alert('Preview functionality would show how your notes will appear to students');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800 shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">StudyNotes</span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </button>
              <button
                onClick={handlePreview}
                className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Add New Study Notes</h1>
          <p className="text-gray-400">Share your knowledge with fellow students by uploading your study materials.</p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Calculus: Derivatives and Applications"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  required
                >
                  <option value="">Select a subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of your notes content, topics covered, and what students will learn..."
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="e.g., calculus, derivatives, math, advanced"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Files
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  File Type
                </label>
                <select
                  name="fileType"
                  value={formData.fileType}
                  onChange={handleInputChange}
                  className="w-full md:w-auto px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="docx">Word Document</option>
                  <option value="pptx">PowerPoint</option>
                  <option value="txt">Text File</option>
                  <option value="image">Images</option>
                </select>
              </div>

              {/* File Upload Area */}
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Upload your files</h3>
                <p className="text-gray-400 mb-4">Drag and drop files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  //onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                >
                  Choose Files
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT, JPG, PNG (Max 10MB each)
                </p>
              </div>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-300">Uploaded Files:</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-white text-sm">{file.name}</span>
                        <span className="text-gray-400 text-xs ml-2">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Publication Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Visibility
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="public"
                      checked={formData.visibility === 'public'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-400 bg-gray-700 border-gray-600"
                    />
                    <span className="ml-3 text-white">Public - Anyone can view and download</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="students"
                      checked={formData.visibility === 'students'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-400 bg-gray-700 border-gray-600"
                    />
                    <span className="ml-3 text-white">Students Only - Registered students can access</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="visibility"
                      value="private"
                      checked={formData.visibility === 'private'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-400 bg-gray-700 border-gray-600"
                    />
                    <span className="ml-3 text-white">Private - Only you can access</span>
                  </label>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 text-blue-600 focus:ring-blue-400 bg-gray-700 border-gray-600 rounded"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-300">
                    I confirm that I have the right to share these materials and they comply with our
                    <a href="#" className="text-blue-400 hover:text-blue-300 ml-1">Terms of Service</a> and
                    <a href="#" className="text-blue-400 hover:text-blue-300 ml-1">Academic Integrity Policy</a>.
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Save as Draft
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Publish Notes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}