'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Brain, Cpu, Zap, TrendingUp, Activity, Shield,
  Play, Pause, Settings, Download, Upload,
  BarChart3, Clock, CheckCircle, AlertTriangle,
  Sparkles, Database, Cloud, Server
} from 'lucide-react';
import { useToast } from '../../components/ui/useToast';

interface AIModel {
  id: string;
  name: string;
  type: 'LLM' | 'Vision' | 'Audio' | 'Multimodal';
  status: 'active' | 'training' | 'idle' | 'error';
  accuracy: number;
  performance: number;
  lastTrained: string;
  requestsToday: number;
  description: string;
  version: string;
  provider: string;
}

export default function ModelsPage() {
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [models, setModels] = useState<AIModel[]>([
    {
      id: '1',
      name: 'VECTOR-GPT Pro',
      type: 'LLM',
      status: 'active',
      accuracy: 98.7,
      performance: 94.2,
      lastTrained: '2 hours ago',
      requestsToday: 15420,
      description: 'Advanced language model optimized for document processing and analysis',
      version: 'v2.1.0',
      provider: 'VECTOR AI'
    },
    {
      id: '2',
      name: 'VisionNet Ultra',
      type: 'Vision',
      status: 'active',
      accuracy: 99.3,
      performance: 91.8,
      lastTrained: '6 hours ago',
      requestsToday: 8930,
      description: 'Computer vision model for document OCR and image analysis',
      version: 'v1.8.2',
      provider: 'VECTOR AI'
    },
    {
      id: '3',
      name: 'AudioScope',
      type: 'Audio',
      status: 'training',
      accuracy: 96.1,
      performance: 88.5,
      lastTrained: '1 day ago',
      requestsToday: 2340,
      description: 'Speech-to-text and audio classification for voice workflows',
      version: 'v1.3.1',
      provider: 'VECTOR AI'
    },
    {
      id: '4',
      name: 'OmniMind',
      type: 'Multimodal',
      status: 'active',
      accuracy: 97.8,
      performance: 89.7,
      lastTrained: '4 hours ago',
      requestsToday: 6720,
      description: 'Multimodal AI combining text, vision, and audio processing',
      version: 'v3.0.0-beta',
      provider: 'VECTOR AI'
    }
  ]);

  const statusColors = {
    active: 'bg-emerald-500/20 text-emerald-600 border-emerald-500/30',
    training: 'bg-blue-500/20 text-blue-600 border-blue-500/30',
    idle: 'bg-gray-500/20 text-gray-600 border-gray-500/30',
    error: 'bg-red-500/20 text-red-600 border-red-500/30'
  };

  const typeColors = {
    LLM: 'from-purple-500 to-indigo-500',
    Vision: 'from-blue-500 to-cyan-500',
    Audio: 'from-green-500 to-teal-500',
    Multimodal: 'from-orange-500 to-red-500'
  };

  const handleModelAction = (action: string, modelId: string, modelName: string) => {
    switch (action) {
      case 'start':
        toast.ai(`Starting ${modelName} model...`, { title: 'Model Activation' });
        break;
      case 'stop':
        toast.warning(`Stopping ${modelName} model`, { title: 'Model Deactivation' });
        break;
      case 'retrain':
        const progressToast = toast.aiProgress(`Retraining ${modelName}...`, 0);
        // Simulate training progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress >= 100) {
            clearInterval(interval);
            toast.dismiss(progressToast.id);
            toast.success(`${modelName} retrained successfully!`, { title: 'Training Complete' });
          } else {
            progressToast.update(progress);
          }
        }, 500);
        break;
      default:
        toast.info(`${action} action triggered for ${modelName}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg">
            <Brain className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Models Dashboard
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Manage and monitor your AI model fleet
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Active Models', value: '3', icon: Activity, color: 'from-emerald-500 to-green-500' },
            { label: 'Total Requests', value: '33.4K', icon: BarChart3, color: 'from-blue-500 to-cyan-500' },
            { label: 'Avg Accuracy', value: '98.2%', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
            { label: 'Uptime', value: '99.9%', icon: Shield, color: 'from-orange-500 to-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-xl bg-gradient-to-r ${stat.color} text-white`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">+12%</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Models Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {models.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className={`backdrop-blur-xl bg-white/20 dark:bg-gray-800/20 border border-white/30 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl cursor-pointer transition-all duration-300 ${selectedModel === model.id ? 'ring-2 ring-purple-500/50' : ''
              }`}
            onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
          >
            {/* Model Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${typeColors[model.type]} text-white shadow-lg`}>
                  {model.type === 'LLM' && <Brain className="w-6 h-6" />}
                  {model.type === 'Vision' && <Cpu className="w-6 h-6" />}
                  {model.type === 'Audio' && <Activity className="w-6 h-6" />}
                  {model.type === 'Multimodal' && <Sparkles className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {model.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {model.type} • {model.version}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[model.status]}`}>
                {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
              </div>
            </div>

            {/* Model Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              {model.description}
            </p>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {model.accuracy}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {model.performance}%
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Performance</div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Last trained {model.lastTrained}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>{model.requestsToday.toLocaleString()} requests today</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {model.status === 'active' ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModelAction('stop', model.id, model.name);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModelAction('start', model.id, model.name);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Start
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleModelAction('retrain', model.id, model.name);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Retrain
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleModelAction('configure', model.id, model.name);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Configure
              </motion.button>
            </div>

            {/* Expanded Details */}
            {selectedModel === model.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Technical Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Provider:</span>
                        <span className="text-gray-900 dark:text-white">{model.provider}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Version:</span>
                        <span className="text-gray-900 dark:text-white">{model.version}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Type:</span>
                        <span className="text-gray-900 dark:text-white">{model.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Recent Performance</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Latency:</span>
                        <span className="text-green-600 dark:text-green-400">120ms avg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Error Rate:</span>
                        <span className="text-green-600 dark:text-green-400">0.03%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Throughput:</span>
                        <span className="text-blue-600 dark:text-blue-400">2.3K req/min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

