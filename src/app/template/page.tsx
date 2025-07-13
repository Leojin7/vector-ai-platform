'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, Download, Star, Eye, Search, Filter, Code,
  Workflow, Database, Zap, Clock, Users
} from 'lucide-react';

export default function TemplatesPage() {
  const [templates] = useState([
    {
      id: '1',
      name: 'Invoice Processing Workflow',
      category: 'Document Processing',
      description: 'Complete invoice processing with OCR, validation, and approval workflows',
      downloads: '2.3K',
      rating: 4.9,
      complexity: 'Intermediate',
      estimatedTime: '15 min',
      tags: ['OCR', 'Approval', 'Finance'],
      featured: true
    },
    {
      id: '2',
      name: 'Customer Onboarding Suite',
      category: 'CRM',
      description: 'End-to-end customer onboarding with KYC, document verification, and welcome sequences',
      downloads: '1.8K',
      rating: 4.7,
      complexity: 'Advanced',
      estimatedTime: '30 min',
      tags: ['KYC', 'Verification', 'Onboarding'],
      featured: true
    },
    {
      id: '3',
      name: 'Email Classification Engine',
      category: 'Communication',
      description: 'Automatically classify and route emails using AI-powered categorization',
      downloads: '3.1K',
      rating: 4.8,
      complexity: 'Beginner',
      estimatedTime: '10 min',
      tags: ['Email', 'Classification', 'Routing'],
      featured: false
    }
  ]);

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Beginner': return 'text-green-400 bg-green-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'Advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Templates & Extensions</h1>
            <p className="text-slate-400">Pre-built workflow templates and extensions to accelerate your automation projects.</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Templates Available', value: '150+', icon: FileText },
            { label: 'Total Downloads', value: '50K+', icon: Download },
            { label: 'Community Contributors', value: '200+', icon: Users }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500">
            <option>All Categories</option>
            <option>Document Processing</option>
            <option>CRM</option>
            <option>Communication</option>
            <option>Finance</option>
            <option>HR</option>
          </select>
          <select className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Featured Templates */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Templates</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {templates.filter(t => t.featured).map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                      <Workflow className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{template.name}</h3>
                      <p className="text-slate-400 text-sm">{template.category}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${getComplexityColor(template.complexity)}`}>
                    {template.complexity}
                  </div>
                </div>

                <p className="text-slate-300 mb-6">{template.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {template.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{template.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">{template.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">{template.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                  >
                    Use Template
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-gray-700/50 text-slate-400 rounded-xl hover:bg-gray-700 transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Templates */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">All Templates</h2>
          <div className="space-y-4">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center">
                      <Workflow className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                      <p className="text-slate-400 mb-2">{template.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-purple-400">{template.category}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{template.rating}</span>
                        </div>
                        <span className="text-slate-400">{template.downloads} downloads</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full text-sm ${getComplexityColor(template.complexity)}`}>
                      {template.complexity}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                      >
                        Use Template
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                      >
                        <Code className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
