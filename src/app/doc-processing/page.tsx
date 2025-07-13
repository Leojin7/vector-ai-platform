'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Brain, Zap, CheckCircle, Clock, AlertTriangle,
  Settings, Play, Pause, Download, Upload, Eye, BarChart3,
  Activity, Target, Award, RefreshCw, Filter, Search
} from 'lucide-react';

interface ProcessingJob {
  id: string;
  fileName: string;
  type: 'ocr' | 'classification' | 'extraction' | 'analysis';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  estimatedTime: string;
  accuracy?: number;
  confidence?: number;
}

interface ProcessingTemplate {
  id: string;
  name: string;
  description: string;
  steps: string[];
  accuracy: number;
  avgTime: string;
  usageCount: number;
}

export default function DocumentProcessingPage() {
  const [jobs, setJobs] = useState<ProcessingJob[]>([
    {
      id: '1',
      fileName: 'invoice_batch_2024.pdf',
      type: 'extraction',
      status: 'processing',
      progress: 73,
      startTime: '2 minutes ago',
      estimatedTime: '3 minutes',
      accuracy: 97.5,
      confidence: 94.2
    },
    {
      id: '2',
      fileName: 'contracts_review.docx',
      type: 'analysis',
      status: 'completed',
      progress: 100,
      startTime: '15 minutes ago',
      estimatedTime: 'Completed',
      accuracy: 99.1,
      confidence: 96.8
    },
    {
      id: '3',
      fileName: 'scan_documents.pdf',
      type: 'ocr',
      status: 'queued',
      progress: 0,
      startTime: 'Just now',
      estimatedTime: '5 minutes',
    },
    {
      id: '4',
      fileName: 'customer_forms.pdf',
      type: 'classification',
      status: 'failed',
      progress: 45,
      startTime: '1 hour ago',
      estimatedTime: 'Failed',
    }
  ]);

  const [templates] = useState<ProcessingTemplate[]>([
    {
      id: '1',
      name: 'Invoice Processing',
      description: 'Extract invoice data including amounts, dates, and vendor information',
      steps: ['OCR Extraction', 'Data Validation', 'Field Mapping', 'Quality Check'],
      accuracy: 98.5,
      avgTime: '2.3 min',
      usageCount: 1247
    },
    {
      id: '2',
      name: 'Contract Analysis',
      description: 'Analyze contracts for key terms, clauses, and compliance requirements',
      steps: ['Text Extraction', 'Clause Detection', 'Risk Assessment', 'Summary Generation'],
      accuracy: 96.2,
      avgTime: '4.7 min',
      usageCount: 856
    },
    {
      id: '3',
      name: 'Document Classification',
      description: 'Automatically categorize documents by type and content',
      steps: ['Content Analysis', 'Category Matching', 'Confidence Scoring', 'Auto-tagging'],
      accuracy: 94.8,
      avgTime: '1.1 min',
      usageCount: 2156
    }
  ]);

  const [selectedTab, setSelectedTab] = useState<'processing' | 'templates' | 'analytics'>('processing');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'processing': return 'text-blue-400 bg-blue-400/10';
      case 'queued': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return Activity;
      case 'queued': return Clock;
      case 'failed': return AlertTriangle;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ocr': return Eye;
      case 'classification': return Target;
      case 'extraction': return Zap;
      case 'analysis': return Brain;
      default: return FileText;
    }
  };

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
            <h1 className="text-4xl font-bold text-white mb-2">Document Processing</h1>
            <p className="text-slate-400">AI-powered document processing with OCR, extraction, and analysis capabilities [7].</p>
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
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Upload className="w-5 h-5" />
              Process New
            </motion.button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Documents Processed', value: '2,847', icon: FileText, color: 'text-blue-500' },
            { label: 'Average Accuracy', value: '96.8%', icon: Target, color: 'text-green-500' },
            { label: 'Processing Speed', value: '2.1 min', icon: Zap, color: 'text-purple-500' },
            { label: 'Success Rate', value: '98.2%', icon: Award, color: 'text-orange-500' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
                <span className="text-slate-400 text-sm">{metric.label}</span>
              </div>
              <div className="text-3xl font-bold text-white">{metric.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'processing', label: 'Active Processing', icon: Activity },
            { id: 'templates', label: 'Processing Templates', icon: Settings },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${selectedTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-slate-400 hover:bg-gray-700'
                }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Content based on selected tab */}
        <AnimatePresence mode="wait">
          {selectedTab === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Active Processing Jobs</h3>
                <div className="space-y-4">
                  {jobs.map((job, index) => {
                    const StatusIcon = getStatusIcon(job.status);
                    const TypeIcon = getTypeIcon(job.type);
                    return (
                      <motion.div
                        key={job.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-700/50 rounded-xl p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                              <TypeIcon className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-medium">{job.fileName}</h4>
                              <p className="text-slate-400 text-sm capitalize">{job.type} Processing</p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(job.status)}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="capitalize">{job.status}</span>
                          </div>
                        </div>

                        {job.status === 'processing' && (
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-slate-400">Progress</span>
                              <span className="text-white">{job.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${job.progress}%` }}
                                transition={{ duration: 1 }}
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              />
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-slate-400 text-xs">Started</div>
                            <div className="text-white text-sm">{job.startTime}</div>
                          </div>
                          <div>
                            <div className="text-slate-400 text-xs">ETA</div>
                            <div className="text-white text-sm">{job.estimatedTime}</div>
                          </div>
                          {job.accuracy && (
                            <div>
                              <div className="text-slate-400 text-xs">Accuracy</div>
                              <div className="text-green-400 text-sm">{job.accuracy}%</div>
                            </div>
                          )}
                          {job.confidence && (
                            <div>
                              <div className="text-slate-400 text-xs">Confidence</div>
                              <div className="text-blue-400 text-sm">{job.confidence}%</div>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {job.status === 'processing' ? (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"
                            >
                              <Pause className="w-4 h-4" />
                              Pause
                            </motion.button>
                          ) : job.status === 'completed' ? (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all"
                            >
                              <Download className="w-4 h-4" />
                              Download
                            </motion.button>
                          ) : job.status === 'failed' ? (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all"
                            >
                              <Play className="w-4 h-4" />
                              Retry
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
                            >
                              <Play className="w-4 h-4" />
                              Start
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="px-4 py-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {templates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                        <Brain className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-400">{template.accuracy}%</div>
                        <div className="text-slate-400 text-xs">Accuracy</div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{template.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="text-slate-400 text-sm">Processing Steps:</div>
                      {template.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                          <span className="text-slate-300">{step}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <div className="text-slate-400 text-xs">Avg Time</div>
                        <div className="text-white font-medium">{template.avgTime}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Usage Count</div>
                        <div className="text-white font-medium">{template.usageCount.toLocaleString()}</div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                    >
                      Use Template
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Processing Performance</h3>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-400 mb-2">96.8%</div>
                      <div className="text-slate-400">Overall Accuracy</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">2.1min</div>
                        <div className="text-slate-400 text-sm">Avg Processing Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">98.2%</div>
                        <div className="text-slate-400 text-sm">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Usage Statistics</h3>
                  <div className="space-y-4">
                    {['OCR Processing', 'Data Extraction', 'Document Classification', 'Content Analysis'].map((type, index) => (
                      <div key={type} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-300">{type}</span>
                          <span className="text-white">{85 - index * 15}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${85 - index * 15}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
