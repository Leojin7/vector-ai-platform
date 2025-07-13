'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Brain, Play, Pause, Settings, Plus, Activity,
  GitBranch, Zap, Clock, CheckCircle, AlertTriangle,
  XCircle, Eye, Edit, Trash2, RefreshCw, Download,
  MessageSquare, Database, FileText, Target, Award,
  ArrowRight, BarChart3, TrendingUp, Network, Cpu
} from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: 'orchestrator' | 'worker' | 'analyzer' | 'validator';
  status: 'active' | 'idle' | 'error' | 'paused';
  performance: number;
  tasksCompleted: number;
  connectedTo: string[];
  description: string;
  lastActivity: string;
  specialization: string;
  workload: number;
}

interface Workflow {
  id: string;
  name: string;
  agents: string[];
  status: 'running' | 'paused' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  estimatedCompletion: string;
  throughput: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function MultiAgentPage() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: '1',
      name: 'Master Orchestrator',
      type: 'orchestrator',
      status: 'active',
      performance: 98.5,
      tasksCompleted: 2847,
      connectedTo: ['2', '3', '4'],
      description: 'Central coordination hub managing workflow distribution and agent coordination',
      lastActivity: '2 seconds ago',
      specialization: 'Task Distribution',
      workload: 85
    },
    {
      id: '2',
      name: 'Document Processor Alpha',
      type: 'worker',
      status: 'active',
      performance: 94.2,
      tasksCompleted: 1856,
      connectedTo: ['5'],
      description: 'Specialized in document parsing, OCR, and content extraction',
      lastActivity: '1 minute ago',
      specialization: 'Document Processing',
      workload: 72
    },
    {
      id: '3',
      name: 'Data Analytics Engine',
      type: 'analyzer',
      status: 'active',
      performance: 96.8,
      tasksCompleted: 1423,
      connectedTo: ['4'],
      description: 'Advanced analytics and pattern recognition across multiple data sources',
      lastActivity: '30 seconds ago',
      specialization: 'Data Analysis',
      workload: 68
    },
    {
      id: '4',
      name: 'Quality Validator',
      type: 'validator',
      status: 'idle',
      performance: 99.1,
      tasksCompleted: 923,
      connectedTo: [],
      description: 'Ensures output quality and validates results against business rules',
      lastActivity: '5 minutes ago',
      specialization: 'Quality Control',
      workload: 25
    },
    {
      id: '5',
      name: 'ML Inference Worker',
      type: 'worker',
      status: 'active',
      performance: 92.4,
      tasksCompleted: 3421,
      connectedTo: ['3'],
      description: 'Machine learning model inference and prediction generation',
      lastActivity: '10 seconds ago',
      specialization: 'ML Inference',
      workload: 89
    }
  ]);

  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Invoice Processing Pipeline',
      agents: ['1', '2', '3', '4'],
      status: 'running',
      progress: 73,
      startTime: '2 hours ago',
      estimatedCompletion: '45 minutes',
      throughput: '127 docs/hour',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Customer Data Analysis',
      agents: ['1', '3', '5'],
      status: 'running',
      progress: 45,
      startTime: '4 hours ago',
      estimatedCompletion: '2.5 hours',
      throughput: '89 records/hour',
      priority: 'medium'
    },
    {
      id: '3',
      name: 'Compliance Report Generation',
      agents: ['1', '2', '4'],
      status: 'completed',
      progress: 100,
      startTime: '1 day ago',
      estimatedCompletion: 'Completed',
      throughput: '156 reports/hour',
      priority: 'critical'
    }
  ]);

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalTasks: 8647,
    activeTasks: 247,
    avgResponseTime: '0.34s',
    successRate: 99.2
  });

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics(prev => ({
        totalTasks: prev.totalTasks + Math.floor(Math.random() * 5),
        activeTasks: prev.activeTasks + Math.floor(Math.random() * 3) - 1,
        avgResponseTime: (Math.random() * 0.5 + 0.2).toFixed(2) + 's',
        successRate: Math.min(99.9, prev.successRate + (Math.random() - 0.5) * 0.1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'orchestrator': return Network;
      case 'worker': return Cpu;
      case 'analyzer': return BarChart3;
      case 'validator': return CheckCircle;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'idle': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'paused': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
        {/* Enhanced Header with Glassmorphism */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-2">
              Multi-Agent Orchestration
            </h1>
            <p className="text-slate-400 text-lg">
              Coordinate AI agents with enterprise-grade orchestration patterns and real-time monitoring [7].
            </p>
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
              className="flex items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all duration-300"
            >
              <RefreshCw className="w-5 h-5" />
              Real-time Sync
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Workflow
            </motion.button>
          </motion.div>
        </div>

        {/* Real-time Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Tasks', value: realTimeMetrics.totalTasks.toLocaleString(), icon: Activity, color: 'text-blue-400', gradient: 'from-blue-500/20 to-cyan-500/20' },
            { label: 'Active Workflows', value: workflows.filter(w => w.status === 'running').length.toString(), icon: GitBranch, color: 'text-purple-400', gradient: 'from-purple-500/20 to-pink-500/20' },
            { label: 'Response Time', value: realTimeMetrics.avgResponseTime, icon: Clock, color: 'text-green-400', gradient: 'from-green-500/20 to-emerald-500/20' },
            { label: 'Success Rate', value: `${realTimeMetrics.successRate.toFixed(1)}%`, icon: TrendingUp, color: 'text-orange-400', gradient: 'from-orange-500/20 to-red-500/20' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${metric.gradient} backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/10 rounded-2xl">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{metric.label}</span>
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="text-3xl font-bold text-white"
                >
                  {metric.value}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Agent Network Visualization */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <div className="xl:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Network className="w-7 h-7 text-purple-400" />
                Agent Network Topology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agents.map((agent, index) => {
                  const TypeIcon = getAgentTypeIcon(agent.type);
                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.8 }}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`group cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${selectedAgent === agent.id
                          ? 'border-purple-500/50 bg-purple-600/10 shadow-purple-500/20'
                          : 'border-white/10 hover:border-white/20 bg-white/5'
                        }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                            className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl"
                          >
                            <TypeIcon className="w-6 h-6 text-purple-400" />
                          </motion.div>
                          <div>
                            <h4 className="text-white font-bold text-lg">{agent.name}</h4>
                            <p className="text-slate-400 text-sm">{agent.specialization}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </div>
                      </div>

                      <p className="text-slate-300 text-sm mb-4 leading-relaxed">{agent.description}</p>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">{agent.performance}%</div>
                          <div className="text-slate-400 text-xs">Performance</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{agent.tasksCompleted.toLocaleString()}</div>
                          <div className="text-slate-400 text-xs">Tasks</div>
                        </div>
                      </div>

                      {/* Workload Indicator */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-400">Workload</span>
                          <span className="text-white">{agent.workload}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${agent.workload}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className={`h-2 rounded-full ${agent.workload > 80 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                                agent.workload > 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                  'bg-gradient-to-r from-green-500 to-blue-500'
                              }`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-sm">{agent.lastActivity}</span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                          >
                            <Settings className="w-4 h-4 text-slate-400" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all"
                          >
                            <Eye className="w-4 h-4 text-slate-400" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Active Workflows Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <GitBranch className="w-6 h-6 text-purple-400" />
                Active Workflows
              </h3>
              <div className="space-y-4">
                {workflows.map((workflow, index) => (
                  <motion.div
                    key={workflow.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 1 }}
                    className="border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-white font-medium">{workflow.name}</h4>
                        <p className="text-slate-400 text-sm">{workflow.agents.length} agents</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(workflow.priority)}`}>
                        {workflow.priority}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white">{workflow.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${workflow.progress}%` }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs mb-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Started:</span>
                        <span className="text-white">{workflow.startTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ETA:</span>
                        <span className="text-white">{workflow.estimatedCompletion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Throughput:</span>
                        <span className="text-purple-400">{workflow.throughput}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all text-xs"
                      >
                        {workflow.status === 'running' ? 'Pause' : 'Resume'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-white/10 text-slate-400 rounded-lg hover:bg-white/20 transition-all"
                      >
                        <Eye className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Create Workflow Modal */}
        <AnimatePresence>
          {showCreateModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowCreateModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl font-bold text-white mb-8 text-center">Create New Workflow</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-slate-300 mb-3 font-medium">Workflow Name</label>
                    <input
                      type="text"
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-all"
                      placeholder="Enter workflow name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-3 font-medium">Select Agents</label>
                    <div className="grid grid-cols-2 gap-3">
                      {agents.map(agent => (
                        <label key={agent.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                          <input type="checkbox" className="rounded border-white/20" />
                          <span className="text-white text-sm">{agent.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 py-4 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      Create Workflow
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
