'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot, Brain, Cpu, Play, Pause, Settings, Trash2, Plus,
  Activity, Clock, Zap, MessageSquare, FileText, Database,
  CheckCircle, AlertCircle, XCircle
} from 'lucide-react';

export default function AIAgentsPage() {
  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Document Classifier',
      description: 'Automatically categorizes incoming documents using ML',
      status: 'active',
      type: 'classifier',
      performance: 98.5,
      lastActivity: '2 minutes ago',
      tasksCompleted: 1247,
      avgResponseTime: '1.2s'
    },
    {
      id: 2,
      name: 'Email Assistant',
      description: 'Intelligent email routing and auto-responses',
      status: 'active',
      type: 'assistant',
      performance: 96.8,
      lastActivity: '5 minutes ago',
      tasksCompleted: 856,
      avgResponseTime: '0.8s'
    },
    {
      id: 3,
      name: 'Data Extractor',
      description: 'Extracts structured data from unstructured documents',
      status: 'paused',
      type: 'extractor',
      performance: 94.2,
      lastActivity: '1 hour ago',
      tasksCompleted: 423,
      avgResponseTime: '2.1s'
    },
    {
      id: 4,
      name: 'Sentiment Analyzer',
      description: 'Analyzes customer feedback sentiment in real-time',
      status: 'error',
      type: 'analyzer',
      performance: 89.7,
      lastActivity: '3 hours ago',
      tasksCompleted: 2156,
      avgResponseTime: '0.5s'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'paused':
        return <Pause className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'classifier':
        return FileText;
      case 'assistant':
        return MessageSquare;
      case 'extractor':
        return Database;
      case 'analyzer':
        return Brain;
      default:
        return Bot;
    }
  };

  const toggleAgent = (id: number) => {
    setAgents(agents.map(agent =>
      agent.id === id
        ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
        : agent
    ));
  };

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
            <h1 className="text-4xl font-bold text-white mb-2">AI Agents</h1>
            <p className="text-slate-400">Deploy and manage intelligent AI agents for automated tasks.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Deploy New Agent
          </motion.button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bot className="w-8 h-8 text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-white">4</div>
                <div className="text-slate-400 text-sm">Total Agents</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-white">2</div>
                <div className="text-slate-400 text-sm">Active Agents</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-white">4.7K</div>
                <div className="text-slate-400 text-sm">Tasks Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-orange-500" />
              <div>
                <div className="text-2xl font-bold text-white">94.8%</div>
                <div className="text-slate-400 text-sm">Avg Performance</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {agents.map((agent, index) => {
            const TypeIcon = getTypeIcon(agent.type);
            return (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-600/20">
                      <TypeIcon className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                      <p className="text-slate-400 text-sm">{agent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <span className="text-sm font-medium text-white capitalize">{agent.status}</span>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{agent.performance}%</div>
                    <div className="text-slate-400 text-xs">Performance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{agent.tasksCompleted.toLocaleString()}</div>
                    <div className="text-slate-400 text-xs">Tasks Done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{agent.avgResponseTime}</div>
                    <div className="text-slate-400 text-xs">Avg Response</div>
                  </div>
                </div>

                {/* Activity */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Last activity: {agent.lastActivity}</span>
                  </div>
                </div>

                {/* Performance Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Performance Score</span>
                    <span className="text-white">{agent.performance}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${agent.performance}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`h-2 rounded-full ${agent.performance >= 95 ? 'bg-green-500' :
                        agent.performance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleAgent(agent.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${agent.status === 'active'
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                      : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                      }`}
                  >
                    {agent.status === 'active' ? (
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
                    <Settings className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Agent Templates */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Agent Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Customer Support Bot', icon: MessageSquare, description: 'Handles customer inquiries automatically' },
              { name: 'Data Processing Agent', icon: Database, description: 'Processes and validates incoming data' },
              { name: 'Content Moderator', icon: FileText, description: 'Reviews and moderates user-generated content' }
            ].map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-blue-600/20">
                    <template.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{template.name}</h3>
                    <p className="text-slate-400 text-sm">{template.description}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
                >
                  Deploy Template
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
