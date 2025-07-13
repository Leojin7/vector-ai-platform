'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3, LineChart, PieChart, TrendingUp, TrendingDown, Activity,
  Clock, Cpu, MemoryStick, HardDrive, Wifi, Zap, Target, Award,
  RefreshCw, Download, Calendar, Filter, Eye, Settings,
  AlertTriangle, CheckCircle, ArrowUp, ArrowDown, Minus
} from 'lucide-react';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  target: number;
  historical: number[];
}

interface SystemResource {
  name: string;
  usage: number;
  limit: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  details: string;
}

export default function PerformanceAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([
    {
      id: '1',
      name: 'Response Time',
      value: 145,
      unit: 'ms',
      change: -12.3,
      trend: 'down',
      status: 'good',
      target: 200,
      historical: [165, 150, 148, 145, 142, 140, 145]
    },
    {
      id: '2',
      name: 'Throughput',
      value: 2847,
      unit: 'req/min',
      change: 18.7,
      trend: 'up',
      status: 'good',
      target: 3000,
      historical: [2400, 2500, 2650, 2700, 2750, 2800, 2847]
    },
    {
      id: '3',
      name: 'Error Rate',
      value: 0.8,
      unit: '%',
      change: 0.3,
      trend: 'up',
      status: 'warning',
      target: 0.5,
      historical: [0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.8]
    },
    {
      id: '4',
      name: 'Uptime',
      value: 99.97,
      unit: '%',
      change: 0.02,
      trend: 'up',
      status: 'good',
      target: 99.9,
      historical: [99.95, 99.96, 99.94, 99.97, 99.98, 99.97, 99.97]
    },
    {
      id: '5',
      name: 'Active Users',
      value: 1247,
      unit: 'users',
      change: 156,
      trend: 'up',
      status: 'good',
      target: 1500,
      historical: [1091, 1134, 1178, 1203, 1225, 1240, 1247]
    },
    {
      id: '6',
      name: 'Data Processing',
      value: 12.4,
      unit: 'GB/hr',
      change: 2.1,
      trend: 'up',
      status: 'good',
      target: 15,
      historical: [10.3, 10.8, 11.2, 11.8, 12.0, 12.2, 12.4]
    }
  ]);

  const [systemResources, setSystemResources] = useState<SystemResource[]>([
    {
      name: 'CPU Usage',
      usage: 67,
      limit: 100,
      status: 'healthy',
      trend: 'stable',
      details: '4 cores, Intel Xeon E5-2686 v4'
    },
    {
      name: 'Memory Usage',
      usage: 8.2,
      limit: 16,
      status: 'healthy',
      trend: 'up',
      details: '8.2GB / 16GB RAM'
    },
    {
      name: 'Storage Usage',
      usage: 245,
      limit: 500,
      status: 'healthy',
      trend: 'up',
      details: '245GB / 500GB SSD'
    },
    {
      name: 'Network I/O',
      usage: 127,
      limit: 1000,
      status: 'healthy',
      trend: 'stable',
      details: '127 Mbps / 1 Gbps'
    },
    {
      name: 'Database Connections',
      usage: 45,
      limit: 100,
      status: 'healthy',
      trend: 'down',
      details: '45 / 100 connections'
    },
    {
      name: 'API Rate Limit',
      usage: 1847,
      limit: 5000,
      status: 'healthy',
      trend: 'up',
      details: '1,847 / 5,000 req/hr'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'healthy': return 'text-green-400 bg-green-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'critical': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTrendIcon = (trend: string, change?: number) => {
    if (trend === 'up') return <ArrowUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <ArrowDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getResourceIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'cpu usage': return Cpu;
      case 'memory usage': return MemoryStick;
      case 'storage usage': return HardDrive;
      case 'network i/o': return Wifi;
      case 'database connections': return Activity;
      case 'api rate limit': return Zap;
      default: return Target;
    }
  };

  const filteredMetrics = performanceMetrics.filter(metric => {
    if (selectedCategory === 'all') return true;
    return metric.status === selectedCategory;
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
            <h1 className="text-4xl font-bold text-white mb-2">Performance Analytics</h1>
            <p className="text-slate-400">Monitor system performance, resource utilization, and optimization opportunities in real-time [3].</p>
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
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Settings className="w-5 h-5" />
              Configure
            </motion.button>
          </div>
        </div>

        {/* Time Range & Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex gap-2">
            {['1h', '24h', '7d', '30d'].map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.02 }}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-xl transition-all ${timeRange === range
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-slate-400 hover:bg-gray-700'
                  }`}
              >
                {range}
              </motion.button>
            ))}
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Metrics</option>
            <option value="good">Healthy</option>
            <option value="warning">Warning</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{metric.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl font-bold text-purple-400">
                      {metric.value}
                    </span>
                    <span className="text-slate-400 text-sm">{metric.unit}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend, metric.change)}
                  <span className={`text-sm font-medium ${metric.trend === 'up' && metric.change > 0 ? 'text-green-400' :
                      metric.trend === 'down' && metric.change < 0 ? 'text-red-400' :
                        'text-gray-400'
                    }`}>
                    {Math.abs(metric.change)}{metric.unit === '%' ? 'pp' : metric.unit}
                  </span>
                </div>
                <div className="text-slate-400 text-sm">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-2 rounded-full ${metric.status === 'good' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                        metric.status === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                  />
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-16 flex items-end justify-between gap-1">
                {metric.historical.map((value, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / Math.max(...metric.historical)) * 100}%` }}
                    transition={{ duration: 0.5, delay: (index * 0.1) + (i * 0.05) }}
                    className="bg-purple-500/50 flex-1 rounded-t"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* System Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">System Resources</h3>
            <div className="space-y-4">
              {systemResources.map((resource, index) => {
                const ResourceIcon = getResourceIcon(resource.name);
                const usagePercentage = typeof resource.usage === 'number' && typeof resource.limit === 'number'
                  ? (resource.usage / resource.limit) * 100
                  : 0;

                return (
                  <motion.div
                    key={resource.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-700/50 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                          <ResourceIcon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{resource.name}</h4>
                          <p className="text-slate-400 text-sm">{resource.details}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(resource.status)}`}>
                        {getTrendIcon(resource.trend)}
                        <span>{resource.status}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Usage</span>
                        <span className="text-white">
                          {resource.usage}{typeof resource.usage === 'number' && resource.name.includes('GB') ? 'GB' :
                            typeof resource.usage === 'number' && resource.name.includes('%') ? '%' :
                              typeof resource.usage === 'number' && resource.name.includes('Mbps') ? 'Mbps' : ''}
                          {' / '}
                          {resource.limit}{typeof resource.limit === 'number' && resource.name.includes('GB') ? 'GB' :
                            typeof resource.limit === 'number' && resource.name.includes('%') ? '%' :
                              typeof resource.limit === 'number' && resource.name.includes('Mbps') ? 'Mbps' : ''}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(usagePercentage, 100)}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-2 rounded-full ${usagePercentage < 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              usagePercentage < 90 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                'bg-gradient-to-r from-red-500 to-pink-500'
                            }`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Performance Trends</h3>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">96.8%</div>
                <div className="text-slate-400">Overall Performance Score</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <ArrowUp className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm">+2.3% from last week</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">145ms</div>
                  <div className="text-slate-400 text-sm">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.97%</div>
                  <div className="text-slate-400 text-sm">Uptime</div>
                </div>
              </div>

              {/* Performance Chart Placeholder */}
              <div className="h-32 bg-gray-700/30 rounded-xl flex items-center justify-center">
                <div className="text-slate-400 text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-sm">Performance Chart</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="space-y-3">
                <h4 className="text-white font-medium">Optimization Opportunities</h4>
                {[
                  'Optimize database queries to reduce response time',
                  'Implement caching for frequently accessed data',
                  'Scale CPU resources during peak hours'
                ].map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-300">{recommendation}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Detailed Performance Analytics</h3>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-all"
              >
                <LineChart className="w-4 h-4" />
                Line Chart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-all"
              >
                <BarChart3 className="w-4 h-4" />
                Bar Chart
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-700/30 rounded-xl flex items-center justify-center">
                <div className="text-slate-400 text-center">
                  <LineChart className="w-12 h-12 mx-auto mb-4" />
                  <div>Interactive Performance Chart</div>
                  <div className="text-sm mt-1">Real-time data visualization</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Peak Performance', value: '3:00 PM', trend: 'Daily peak traffic time' },
                { label: 'Lowest Latency', value: '2:00 AM', trend: 'Optimal performance window' },
                { label: 'Resource Alert', value: '85%', trend: 'Memory usage threshold' }
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-700/50 rounded-xl"
                >
                  <div className="text-slate-400 text-sm">{item.label}</div>
                  <div className="text-white font-bold text-lg">{item.value}</div>
                  <div className="text-slate-500 text-xs">{item.trend}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
