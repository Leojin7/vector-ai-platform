'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Upload, Download, Play, Pause, Settings, Trash2, Plus,
  Activity, Clock, TrendingUp, AlertCircle, CheckCircle, XCircle,
  BarChart3, Eye, Edit, Copy, RefreshCw, Filter, Search, Archive
} from 'lucide-react';

interface MLModel {
  id: string;
  name: string;
  version: string;
  status: 'deployed' | 'training' | 'testing' | 'archived';
  accuracy: number;
  lastUpdated: string;
  deploymentDate: string;
  framework: string;
  type: string;
  performance: {
    latency: string;
    throughput: string;
    memory: string;
  };
}

export default function ModelManagementPage() {
  const [models, setModels] = useState<MLModel[]>([
    {
      id: '1',
      name: 'Document Classifier v2.1',
      version: '2.1.0',
      status: 'deployed',
      accuracy: 98.5,
      lastUpdated: '2 hours ago',
      deploymentDate: '2024-12-15',
      framework: 'TensorFlow',
      type: 'Classification',
      performance: { latency: '45ms', throughput: '1000/min', memory: '512MB' }
    },
    {
      id: '2',
      name: 'Sentiment Analysis Engine',
      version: '1.8.3',
      status: 'deployed',
      accuracy: 94.2,
      lastUpdated: '1 day ago',
      deploymentDate: '2024-12-10',
      framework: 'PyTorch',
      type: 'NLP',
      performance: { latency: '32ms', throughput: '1500/min', memory: '256MB' }
    },
    {
      id: '3',
      name: 'Invoice Data Extractor',
      version: '3.0.0-beta',
      status: 'testing',
      accuracy: 96.8,
      lastUpdated: '3 hours ago',
      deploymentDate: 'N/A',
      framework: 'Hugging Face',
      type: 'OCR/NER',
      performance: { latency: '120ms', throughput: '500/min', memory: '1GB' }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'text-green-400 bg-green-400/10';
      case 'training': return 'text-blue-400 bg-blue-400/10';
      case 'testing': return 'text-yellow-400 bg-yellow-400/10';
      case 'archived': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return CheckCircle;
      case 'training': return Activity;
      case 'testing': return Clock;
      case 'archived': return Archive;
      default: return XCircle;
    }
  };

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || model.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Model Management</h1>
            <p className="text-slate-400">Deploy, monitor, and manage your machine learning models with enterprise-grade governance [1].</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Deploy Model
            </motion.button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Models', value: '24', icon: Cpu, color: 'text-blue-500' },
            { label: 'Deployed', value: '18', icon: CheckCircle, color: 'text-green-500' },
            { label: 'In Training', value: '3', icon: Activity, color: 'text-yellow-500' },
            { label: 'Avg Accuracy', value: '96.2%', icon: TrendingUp, color: 'text-purple-500' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                <span className="text-slate-400 text-sm">{metric.label}</span>
              </div>
              <div className="text-3xl font-bold text-white">{metric.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Status</option>
            <option value="deployed">Deployed</option>
            <option value="training">Training</option>
            <option value="testing">Testing</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filteredModels.map((model, index) => {
            const StatusIcon = getStatusIcon(model.status);
            return (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                {/* Model Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{model.name}</h3>
                    <p className="text-slate-400 text-sm">Version {model.version} • {model.framework}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(model.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="capitalize">{model.status}</span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{model.accuracy}%</div>
                    <div className="text-slate-400 text-xs">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{model.performance.latency}</div>
                    <div className="text-slate-400 text-xs">Latency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{model.performance.throughput}</div>
                    <div className="text-slate-400 text-xs">Throughput</div>
                  </div>
                </div>

                {/* Model Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Type:</span>
                    <span className="text-white">{model.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Memory Usage:</span>
                    <span className="text-white">{model.performance.memory}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Last Updated:</span>
                    <span className="text-white">{model.lastUpdated}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    Monitor
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Upload Modal */}
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
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Deploy New Model</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Model Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter model name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Framework</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>TensorFlow</option>
                      <option>PyTorch</option>
                      <option>Hugging Face</option>
                      <option>Scikit-learn</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setShowUploadModal(false)}
                      className="flex-1 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                    >
                      Deploy
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
