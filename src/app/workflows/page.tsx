'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus, Play, Pause, Edit, Trash2, Copy, MoreHorizontal,
  Workflow, Clock, CheckCircle, AlertCircle, Search, Filter
} from 'lucide-react';

export default function WorkflowsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [workflows, setWorkflows] = useState([
    {
      id: 1,
      name: 'Invoice Processing',
      description: 'Automated invoice extraction and validation',
      status: 'active',
      lastRun: '2 minutes ago',
      successRate: '98.5%',
      runs: 1247
    },
    {
      id: 2,
      name: 'Document Classification',
      description: 'AI-powered document categorization',
      status: 'paused',
      lastRun: '1 hour ago',
      successRate: '96.2%',
      runs: 856
    },
    {
      id: 3,
      name: 'Customer Onboarding',
      description: 'Streamlined customer registration process',
      status: 'active',
      lastRun: '15 minutes ago',
      successRate: '99.1%',
      runs: 423
    },
    {
      id: 4,
      name: 'Email Automation',
      description: 'Intelligent email routing and responses',
      status: 'error',
      lastRun: '3 hours ago',
      successRate: '94.8%',
      runs: 2156
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'paused':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const toggleWorkflow = (id: number) => {
    setWorkflows(workflows.map(w =>
      w.id === id
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ));
  };

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    workflow.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Workflows</h1>
            <p className="text-slate-400">Create, manage, and monitor your automation workflows.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Workflow
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
          >
            <Filter className="w-5 h-5" />
            Filter
          </motion.button>
        </div>

        {/* Workflows Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Workflow className="w-8 h-8 text-purple-500" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{workflow.name}</h3>
                    <p className="text-slate-400 text-sm">{workflow.description}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <MoreHorizontal className="w-5 h-5 text-slate-400" />
                </motion.button>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 mb-4">
                {getStatusIcon(workflow.status)}
                <span className="text-sm font-medium text-white capitalize">{workflow.status}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-slate-400 text-xs">Success Rate</div>
                  <div className="text-white font-bold">{workflow.successRate}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-xs">Total Runs</div>
                  <div className="text-white font-bold">{workflow.runs.toLocaleString()}</div>
                </div>
              </div>

              {/* Last Run */}
              <div className="mb-6">
                <div className="text-slate-400 text-xs">Last Run</div>
                <div className="text-white text-sm">{workflow.lastRun}</div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleWorkflow(workflow.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${workflow.status === 'active'
                    ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                    : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                    }`}
                >
                  {workflow.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Edit className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Copy className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
