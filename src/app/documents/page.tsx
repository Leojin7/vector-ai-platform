'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Upload, Download, Search, Filter, LayoutGrid,
  List, Eye, Edit, Trash2, Share, Star, Clock, User,
  Folder, Plus, MoreHorizontal, CheckCircle, AlertCircle,
  Image, File, Archive, Video, FileSpreadsheet, Tag,
  Zap, Brain, TrendingUp, Users, Calendar, FolderOpen
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'image' | 'video' | 'other';
  size: string;
  lastModified: string;
  author: string;
  tags: string[];
  status: 'processed' | 'processing' | 'error' | 'draft';
  thumbnail?: string;
  isStarred: boolean;
  aiInsights?: {
    summary: string;
    sentiment: 'positive' | 'neutral' | 'negative';
    keyTopics: string[];
    confidence: number;
  };
  collaborators: string[];
  version: string;
}

interface Folder {
  id: string;
  name: string;
  documentCount: number;
  lastModified: string;
  color: string;
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Q4_Financial_Report_2024.pdf',
      type: 'pdf',
      size: '2.4 MB',
      lastModified: '2 hours ago',
      author: 'Sarah Chen',
      tags: ['Finance', 'Q4', 'Reports', 'Critical'],
      status: 'processed',
      isStarred: true,
      aiInsights: {
        summary: 'Comprehensive financial analysis showing 15% revenue growth with detailed expense breakdown',
        sentiment: 'positive',
        keyTopics: ['Revenue Growth', 'Cost Optimization', 'Market Expansion'],
        confidence: 94
      },
      collaborators: ['Sarah Chen', 'Mike Johnson', 'Alex Lee'],
      version: 'v2.1'
    },
    {
      id: '2',
      name: 'Customer_Onboarding_Workflow.docx',
      type: 'docx',
      size: '1.8 MB',
      lastModified: '1 day ago',
      author: 'Mike Johnson',
      tags: ['Process', 'Onboarding', 'Customer', 'Template'],
      status: 'processed',
      isStarred: false,
      aiInsights: {
        summary: 'Detailed step-by-step customer onboarding process with automation recommendations',
        sentiment: 'neutral',
        keyTopics: ['Process Automation', 'Customer Experience', 'Workflow Optimization'],
        confidence: 87
      },
      collaborators: ['Mike Johnson', 'Lisa Wang'],
      version: 'v1.3'
    },
    {
      id: '3',
      name: 'Sales_Performance_Dashboard.xlsx',
      type: 'xlsx',
      size: '856 KB',
      lastModified: '3 hours ago',
      author: 'Alex Rodriguez',
      tags: ['Sales', 'Analytics', 'Dashboard', 'KPI'],
      status: 'processing',
      isStarred: true,
      aiInsights: {
        summary: 'Real-time sales metrics with predictive analytics and performance forecasting',
        sentiment: 'positive',
        keyTopics: ['Sales Metrics', 'Forecasting', 'Performance Analysis'],
        confidence: 91
      },
      collaborators: ['Alex Rodriguez', 'David Kim', 'Emma Wilson'],
      version: 'v3.0'
    },
    {
      id: '4',
      name: 'Product_Demo_Presentation.mp4',
      type: 'video',
      size: '24.7 MB',
      lastModified: '5 hours ago',
      author: 'Emma Wilson',
      tags: ['Demo', 'Product', 'Video', 'Marketing'],
      status: 'processed',
      isStarred: false,
      aiInsights: {
        summary: 'Engaging product demonstration highlighting key features and benefits',
        sentiment: 'positive',
        keyTopics: ['Product Features', 'User Benefits', 'Market Positioning'],
        confidence: 89
      },
      collaborators: ['Emma Wilson', 'Tom Brown'],
      version: 'v1.0'
    }
  ]);

  const [folders, setFolders] = useState<Folder[]>([
    { id: '1', name: 'Financial Reports', documentCount: 24, lastModified: '2 hours ago', color: 'bg-blue-500' },
    { id: '2', name: 'Marketing Assets', documentCount: 156, lastModified: '1 day ago', color: 'bg-purple-500' },
    { id: '3', name: 'Legal Documents', documentCount: 47, lastModified: '3 days ago', color: 'bg-green-500' },
    { id: '4', name: 'Product Specs', documentCount: 89, lastModified: '1 week ago', color: 'bg-orange-500' }
  ]);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  // Real-time document stats
  const [docStats, setDocStats] = useState({
    totalDocs: 1247,
    storageUsed: 2.4,
    processedToday: 89,
    sharedFiles: 156
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDocStats(prev => ({
        totalDocs: prev.totalDocs + Math.floor(Math.random() * 2),
        storageUsed: Math.min(10, prev.storageUsed + Math.random() * 0.01),
        processedToday: prev.processedToday + Math.floor(Math.random() * 2),
        sharedFiles: prev.sharedFiles + Math.floor(Math.random() * 1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'docx': return FileText;
      case 'xlsx': return FileSpreadsheet;
      case 'image': return Image;
      case 'video': return Video;
      default: return File;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'processing': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'draft': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' ||
      (selectedFilter === 'starred' && doc.isStarred) ||
      doc.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const toggleStar = (docId: string) => {
    setDocuments(docs => docs.map(doc =>
      doc.id === docId ? { ...doc, isStarred: !doc.isStarred } : doc
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {/* Enhanced Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-2">
              Intelligent Documents
            </h1>
            <p className="text-slate-400 text-lg">AI-powered document management with collaboration and insights [2][3].</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <Upload className="w-5 h-5" />
              Smart Upload
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              New Folder
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Documents', value: docStats.totalDocs.toLocaleString(), icon: FileText, color: 'text-blue-400', gradient: 'from-blue-500/20 to-cyan-500/20' },
            { label: 'Storage Used', value: `${docStats.storageUsed.toFixed(1)} GB`, icon: Archive, color: 'text-purple-400', gradient: 'from-purple-500/20 to-pink-500/20' },
            { label: 'Processed Today', value: docStats.processedToday.toString(), icon: CheckCircle, color: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/20' },
            { label: 'Active Collaborations', value: docStats.sharedFiles.toString(), icon: Users, color: 'text-orange-400', gradient: 'from-orange-500/20 to-red-500/20' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{stat.label}</span>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="text-3xl font-bold text-white"
                >
                  {stat.value}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Folders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-blue-400" />
            Quick Access Folders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {folders.map((folder, index) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.8 }}
                className="group cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 ${folder.color}/20 rounded-xl`}>
                    <Folder className={`w-6 h-6 ${folder.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{folder.name}</h4>
                    <p className="text-slate-400 text-sm">{folder.documentCount} documents</p>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">{folder.lastModified}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents with AI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-all"
            />
          </div>

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 transition-all"
          >
            <option value="all">All Documents</option>
            <option value="starred">Starred</option>
            <option value="processed">Processed</option>
            <option value="processing">Processing</option>
            <option value="draft">Drafts</option>
          </select>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('grid')}
              className={`p-4 rounded-2xl transition-all ${viewMode === 'grid'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setViewMode('list')}
              className={`p-4 rounded-2xl transition-all ${viewMode === 'list'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'bg-white/5 text-slate-400 hover:bg-white/10'
                }`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Documents Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocuments.map((doc, index) => {
              const FileIcon = getFileIcon(doc.type);
              return (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedDoc(doc.id)}
                  className={`group cursor-pointer bg-white/5 backdrop-blur-xl border-2 rounded-3xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${selectedDoc === doc.id
                    ? 'border-purple-500/50 bg-purple-600/10'
                    : 'border-white/10 hover:border-white/20'
                    }`}
                >
                  {/* Document Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl"
                      >
                        <FileIcon className="w-6 h-6 text-blue-400" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-bold truncate max-w-[200px]" title={doc.name}>
                          {doc.name}
                        </h3>
                        <p className="text-slate-400 text-sm">{doc.version} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleStar(doc.id);
                        }}
                        className={`p-2 rounded-xl transition-colors ${doc.isStarred ? 'text-yellow-400 bg-yellow-400/20' : 'text-slate-400 hover:text-yellow-400'
                          }`}
                      >
                        <Star className={`w-4 h-4 ${doc.isStarred ? 'fill-current' : ''}`} />
                      </motion.button>
                      <div className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </div>
                    </div>
                  </div>

                  {/* AI Insights */}
                  {doc.aiInsights && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="mb-4 p-4 bg-white/5 rounded-2xl border border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400 text-sm font-medium">AI Insights</span>
                        <span className={`text-xs ${getSentimentColor(doc.aiInsights.sentiment)}`}>
                          {doc.aiInsights.sentiment}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm mb-3 leading-relaxed">{doc.aiInsights.summary}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {doc.aiInsights.keyTopics.slice(0, 3).map(topic => (
                          <span key={topic} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs">Confidence</span>
                        <span className="text-green-400 text-xs font-medium">{doc.aiInsights.confidence}%</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doc.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-600/30"
                      >
                        {tag}
                      </span>
                    ))}
                    {doc.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-700/50 text-slate-400 text-xs rounded-full">
                        +{doc.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Collaboration Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">{doc.collaborators.length} collaborators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">{doc.lastModified}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-400 rounded-xl hover:from-purple-600/30 hover:to-blue-600/30 transition-all text-sm font-medium"
                    >
                      <Eye className="w-4 h-4 mx-auto" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-400 rounded-xl hover:from-blue-600/30 hover:to-cyan-600/30 transition-all text-sm font-medium"
                    >
                      <Download className="w-4 h-4 mx-auto" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 py-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 rounded-xl hover:from-green-600/30 hover:to-emerald-600/30 transition-all text-sm font-medium"
                    >
                      <Share className="w-4 h-4 mx-auto" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left py-6 px-8 text-slate-300 font-semibold">Name</th>
                    <th className="text-left py-6 px-8 text-slate-300 font-semibold">AI Insights</th>
                    <th className="text-left py-6 px-8 text-slate-300 font-semibold">Collaborators</th>
                    <th className="text-left py-6 px-8 text-slate-300 font-semibold">Modified</th>
                    <th className="text-left py-6 px-8 text-slate-300 font-semibold">Status</th>
                    <th className="text-left py-6 px-8 text-slate-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocuments.map((doc, index) => {
                    const FileIcon = getFileIcon(doc.type);
                    return (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-all duration-300"
                      >
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-500/20 rounded-xl">
                              <FileIcon className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <div className="text-white font-medium">{doc.name}</div>
                              <div className="text-slate-400 text-sm">{doc.size} • {doc.version}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          {doc.aiInsights && (
                            <div>
                              <div className={`text-sm ${getSentimentColor(doc.aiInsights.sentiment)} font-medium`}>
                                {doc.aiInsights.sentiment}
                              </div>
                              <div className="text-slate-400 text-xs">{doc.aiInsights.confidence}% confidence</div>
                            </div>
                          )}
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="text-white">{doc.collaborators.length}</span>
                          </div>
                        </td>
                        <td className="py-6 px-8 text-slate-400">{doc.lastModified}</td>
                        <td className="py-6 px-8">
                          <div className={`inline-flex px-3 py-1 rounded-full text-xs border ${getStatusColor(doc.status)}`}>
                            {doc.status}
                          </div>
                        </td>
                        <td className="py-6 px-8">
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => toggleStar(doc.id)}
                              className={`p-2 rounded-xl transition-colors ${doc.isStarred ? 'text-yellow-400 bg-yellow-400/20' : 'text-slate-400 hover:text-yellow-400'
                                }`}
                            >
                              <Star className={`w-4 h-4 ${doc.isStarred ? 'fill-current' : ''}`} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                            >
                              <Download className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/10"
                            >
                              <Share className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Smart Upload Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowUploadModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4"
                  >
                    <Zap className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2">Smart Document Upload</h3>
                  <p className="text-slate-400">AI-powered processing with automatic insights generation</p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center mb-8 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                >
                  <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-white text-lg mb-2">Drag and drop files here</p>
                  <p className="text-slate-400">or click to browse</p>
                  <input type="file" multiple className="hidden" />

                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-400 text-sm">Auto-tagging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">Sentiment analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 text-sm">Topic extraction</span>
                    </div>
                  </div>
                </motion.div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all font-medium"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium"
                  >
                    Start Processing
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
