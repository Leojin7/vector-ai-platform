'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, Zap, Activity, Clock, CheckCircle,
  AlertTriangle, Cpu, Database, Workflow, Brain, FileText, Shield,
  Plus, ArrowRight, Play, Pause, Settings, RefreshCw, Download,
  Eye, Heart, Star, Award, Target, Rocket, Globe, Lock
} from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState([
    {
      label: 'Active Workflows',
      value: '247',
      change: '+12.5%',
      icon: Workflow,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: 'AI Agents Running',
      value: '18',
      change: '+25%',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      label: 'Documents Processed',
      value: '12.4K',
      change: '+18.3%',
      icon: FileText,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: 'System Uptime',
      value: '99.98%',
      change: '+0.1%',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10'
    },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      action: 'Workflow "Invoice Processing AI" completed successfully',
      time: '2 min ago',
      status: 'success',
      user: 'System AI',
      details: '247 invoices processed with 98.5% accuracy'
    },
    {
      id: 2,
      action: 'New AI Agent "Document Classifier v2.1" deployed',
      time: '15 min ago',
      status: 'info',
      user: 'Admin User',
      details: 'Performance improved by 15% over previous version'
    },
    {
      id: 3,
      action: 'Integration with Salesforce CRM updated',
      time: '1 hour ago',
      status: 'success',
      user: 'Integration Service',
      details: '1,250 records synchronized in 2.3 seconds'
    },
    {
      id: 4,
      action: 'Security scan detected potential vulnerability',
      time: '2 hours ago',
      status: 'warning',
      user: 'Security AI',
      details: 'Medium severity issue auto-patched'
    },
  ]);

  const [systemHealth, setSystemHealth] = useState({
    api: { status: 'online', responseTime: '45ms', load: '67%' },
    database: { status: 'online', responseTime: '12ms', load: '23%' },
    aiEngine: { status: 'online', responseTime: '123ms', load: '89%' },
    storage: { status: 'maintenance', responseTime: '89ms', load: '45%' }
  });

  const [quickActions] = useState([
    { label: 'Create Workflow', icon: Plus, href: '/workflows', color: 'bg-purple-600' },
    { label: 'Deploy AI Agent', icon: Brain, href: '/ai-agents', color: 'bg-blue-600' },
    { label: 'Add Integration', icon: Database, href: '/integrations', color: 'bg-green-600' },
    { label: 'View Analytics', icon: BarChart3, href: '/analytics', color: 'bg-orange-600' }
  ]);

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
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome back! Here's what's happening with your AI automation platform.</p>
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
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{stat.change}</span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  View All
                </motion.button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-700/30 hover:bg-gray-700/50 transition-all"
                  >
                    <div className={`w-3 h-3 rounded-full mt-2 ${activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`} />
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">{activity.action}</div>
                      <div className="text-slate-400 text-sm mb-2">{activity.details}</div>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{activity.time}</span>
                        <span>by {activity.user}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.02, x: 4 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full flex items-center gap-3 p-4 rounded-xl bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:bg-purple-600/30 transition-all"
                  >
                    <action.icon className="w-5 h-5" />
                    <span className="font-medium">{action.label}</span>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">System Health</h3>
              <div className="space-y-4">
                {Object.entries(systemHealth).map(([service, data], index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
                  >
                    <div>
                      <div className="text-white font-medium capitalize">{service}</div>
                      <div className="text-slate-400 text-sm">{data.responseTime} • {data.load} load</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${data.status === 'online' ? 'bg-green-500' :
                          data.status === 'maintenance' ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      <span className={`text-sm capitalize ${data.status === 'online' ? 'text-green-400' :
                          data.status === 'maintenance' ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                        {data.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
