'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Lock, Key, AlertTriangle, CheckCircle, XCircle,
  Eye, RefreshCw, Settings, Clock, Activity, Users,
  Globe, Database, Wifi, Smartphone
} from 'lucide-react';

export default function SecurityPage() {
  const [securityMetrics] = useState([
    { label: 'Security Score', value: '98%', status: 'excellent', icon: Shield },
    { label: 'Threats Blocked', value: '1,247', status: 'good', icon: AlertTriangle },
    { label: 'Active Sessions', value: '42', status: 'normal', icon: Users },
    { label: 'Last Scan', value: '2 min ago', status: 'recent', icon: Clock }
  ]);

  const [threats] = useState([
    {
      id: '1',
      type: 'Suspicious Login Attempt',
      severity: 'high',
      timestamp: '2 minutes ago',
      source: '192.168.1.100',
      status: 'blocked',
      details: 'Multiple failed login attempts from unusual location'
    },
    {
      id: '2',
      type: 'API Rate Limit Exceeded',
      severity: 'medium',
      timestamp: '15 minutes ago',
      source: 'api.external.com',
      status: 'monitored',
      details: 'External service exceeded rate limits'
    },
    {
      id: '3',
      type: 'Unauthorized File Access',
      severity: 'low',
      timestamp: '1 hour ago',
      source: 'internal',
      status: 'resolved',
      details: 'User attempted to access restricted file'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-red-400';
      case 'monitored': return 'text-yellow-400';
      case 'resolved': return 'text-green-400';
      default: return 'text-gray-400';
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
            <h1 className="text-4xl font-bold text-white mb-2">Security</h1>
            <p className="text-slate-400">Monitor security threats, manage access controls, and ensure platform integrity [6].</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Scan Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Settings className="w-5 h-5" />
              Security Settings
            </motion.button>
          </div>
        </div>

        {/* Security Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <metric.icon className="w-6 h-6 text-purple-400" />
                <span className="text-slate-400 text-sm">{metric.label}</span>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className={`text-sm ${metric.status === 'excellent' ? 'text-green-400' :
                  metric.status === 'good' ? 'text-blue-400' : 'text-yellow-400'
                }`}>
                {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Security Status */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Security Status</h3>
            <div className="space-y-4">
              {[
                { name: 'Two-Factor Authentication', status: 'enabled', icon: Key },
                { name: 'SSL/TLS Encryption', status: 'enabled', icon: Lock },
                { name: 'Firewall Protection', status: 'enabled', icon: Shield },
                { name: 'DDoS Protection', status: 'enabled', icon: Globe },
                { name: 'Intrusion Detection', status: 'enabled', icon: Eye },
                { name: 'Data Backup', status: 'enabled', icon: Database }
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-purple-400" />
                    <span className="text-white">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm capitalize">{item.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Recent Security Events</h3>
            <div className="space-y-4">
              {[
                { event: 'Security scan completed', time: '5 min ago', type: 'info' },
                { event: 'Failed login attempt blocked', time: '12 min ago', type: 'warning' },
                { event: 'New device registered', time: '1 hour ago', type: 'info' },
                { event: 'Password changed', time: '2 hours ago', type: 'success' },
                { event: 'API key rotated', time: '4 hours ago', type: 'info' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30"
                >
                  <div className={`w-2 h-2 rounded-full ${activity.type === 'warning' ? 'bg-yellow-500' :
                      activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                  <div className="flex-1">
                    <div className="text-white text-sm">{activity.event}</div>
                    <div className="text-slate-400 text-xs">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Threat Detection */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Threat Detection</h3>
            <div className="flex gap-2">
              <select className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500">
                <option>All Severities</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <select className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500">
                <option>All Status</option>
                <option>Blocked</option>
                <option>Monitored</option>
                <option>Resolved</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {threats.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <div>
                      <h4 className="text-white font-medium">{threat.type}</h4>
                      <p className="text-slate-400 text-sm">{threat.details}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </div>
                    <div className={`text-sm ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-400">Source: {threat.source}</span>
                    <span className="text-slate-400">{threat.timestamp}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Security Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Enable Advanced Threat Protection',
                description: 'Activate AI-powered threat detection for enhanced security',
                priority: 'high',
                action: 'Enable Now'
              },
              {
                title: 'Update Security Policies',
                description: 'Review and update access control policies',
                priority: 'medium',
                action: 'Review'
              },
              {
                title: 'Rotate API Keys',
                description: 'Regular rotation of API keys improves security',
                priority: 'low',
                action: 'Schedule'
              },
              {
                title: 'Security Training',
                description: 'Provide security awareness training to team members',
                priority: 'medium',
                action: 'Plan'
              }
            ].map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-700/50 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-medium mb-1">{rec.title}</h4>
                    <p className="text-slate-400 text-sm">{rec.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${rec.priority === 'high' ? 'bg-red-400/10 text-red-400' :
                      rec.priority === 'medium' ? 'bg-yellow-400/10 text-yellow-400' :
                        'bg-green-400/10 text-green-400'
                    }`}>
                    {rec.priority}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="w-full py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
                >
                  {rec.action}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
