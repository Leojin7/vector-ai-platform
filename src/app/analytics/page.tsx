'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, LineChart, PieChart, TrendingUp, Download, Calendar,
  Filter, RefreshCw, Eye, Users, Zap, Activity, Clock, Target
} from 'lucide-react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('workflows');

  const metrics = [
    {
      id: 'workflows',
      label: 'Workflow Performance',
      value: '156',
      change: '+23%',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      id: 'users',
      label: 'Active Users',
      value: '42',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-500'
    },
    {
      id: 'processing',
      label: 'Data Processed',
      value: '2.4TB',
      change: '+45%',
      trend: 'up',
      icon: Zap,
      color: 'text-green-500'
    },
    {
      id: 'success',
      label: 'Success Rate',
      value: '98.7%',
      change: '+2.1%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-500'
    },
  ];

  const chartData = [
    { name: 'Mon', workflows: 45, users: 12, processing: 2.1, success: 98 },
    { name: 'Tue', workflows: 52, users: 15, processing: 2.3, success: 97 },
    { name: 'Wed', workflows: 48, users: 18, processing: 2.5, success: 99 },
    { name: 'Thu', workflows: 61, users: 22, processing: 2.8, success: 98 },
    { name: 'Fri', workflows: 55, users: 25, processing: 3.1, success: 99 },
    { name: 'Sat', workflows: 40, users: 20, processing: 2.2, success: 97 },
    { name: 'Sun', workflows: 38, users: 16, processing: 1.9, success: 98 },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        { }
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Overview & Analytics</h1>
            <p className="text-slate-400">Comprehensive insights into your AI automation platform performance.</p>
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

        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {['1day', '7days', '30days', '90days'].map((range) => (
            <motion.button
              key={range}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-xl transition-all ${timeRange === range
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-slate-300 hover:bg-gray-700'
                }`}
            >
              {range === '1day' ? '24 Hours' :
                range === '7days' ? '7 Days' :
                  range === '30days' ? '30 Days' : '90 Days'}
            </motion.button>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedMetric(metric.id)}
              className={`bg-gray-800/50 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all ${selectedMetric === metric.id ? 'border-purple-500/50' : 'border-gray-700/50'
                }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-700/50`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                  <TrendingUp className="w-4 h-4" />
                  {metric.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-slate-400 text-sm">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Main Chart */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Performance Trends</h3>
              <LineChart className="w-6 h-6 text-purple-500" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
              <div className="text-slate-400 z-10">Interactive chart visualization</div>
              {/* Simulated chart bars */}
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around p-4">
                {chartData.map((data, index) => (
                  <motion.div
                    key={data.name}
                    initial={{ height: 0 }}
                    animate={{ height: `${data.workflows}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="w-8 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-md"
                    style={{ maxHeight: '150px' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Chart */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Usage Distribution</h3>
              <PieChart className="w-6 h-6 text-blue-500" />
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-700/30 rounded-xl relative">
              <div className="w-32 h-32 rounded-full border-8 border-purple-500 border-r-transparent animate-spin" />
              <div className="absolute text-center">
                <div className="text-2xl font-bold text-white">87%</div>
                <div className="text-slate-400 text-sm">Efficiency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analytics Table */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Detailed Analytics</h3>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-all"
              >
                <Filter className="w-4 h-4" />
                Filter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition-all"
              >
                <Calendar className="w-4 h-4" />
                Date Range
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Metric</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Current</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Previous</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Change</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Total Workflows', current: '247', previous: '220', change: '+12.3%', trend: 'up' },
                  { metric: 'Success Rate', current: '98.7%', previous: '96.5%', change: '+2.2%', trend: 'up' },
                  { metric: 'Avg Response Time', current: '1.2s', previous: '1.8s', change: '-33.3%', trend: 'up' },
                  { metric: 'Error Rate', current: '1.3%', previous: '3.5%', change: '-62.9%', trend: 'up' },
                  { metric: 'Data Throughput', current: '2.4TB', previous: '1.7TB', change: '+41.2%', trend: 'up' },
                ].map((row, index) => (
                  <motion.tr
                    key={row.metric}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{row.metric}</td>
                    <td className="py-3 px-4 text-white">{row.current}</td>
                    <td className="py-3 px-4 text-slate-400">{row.previous}</td>
                    <td className={`py-3 px-4 font-medium ${row.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                      {row.change}
                    </td>
                    <td className="py-3 px-4">
                      <TrendingUp className={`w-4 h-4 ${row.trend === 'up' ? 'text-green-400' : 'text-red-400 rotate-180'}`} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
