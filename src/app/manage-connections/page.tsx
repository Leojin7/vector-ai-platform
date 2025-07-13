'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Link2, Settings, Trash2, Eye, RefreshCw, Download, Plus,
  CheckCircle, XCircle, Clock, AlertTriangle, Activity, Zap,
  Database, Globe, Cloud, Server, Key, Shield, Wifi, Router,
  BarChart3, TrendingUp, TrendingDown, Play, Pause, Edit,
  Copy, Share, Archive, MoreHorizontal, Search, Filter, Award
} from 'lucide-react';

interface Connection {
  id: string;
  name: string;
  type: 'database' | 'api' | 'webhook' | 'sftp' | 'message_queue' | 'streaming';
  endpoint: string;
  status: 'active' | 'inactive' | 'error' | 'maintenance';
  protocol: string;
  authentication: {
    type: 'api_key' | 'oauth' | 'basic_auth' | 'certificate' | 'token';
    lastRotated?: string;
    expiresIn?: string;
  };
  performance: {
    latency: number;
    throughput: string;
    uptime: number;
    errorRate: number;
  };
  monitoring: {
    healthChecks: boolean;
    alerting: boolean;
    logging: boolean;
  };
  lastActive: string;
  createdAt: string;
  tags: string[];
  retryConfig: {
    maxRetries: number;
    backoffStrategy: 'linear' | 'exponential' | 'constant';
    retryDelay: number;
  };
}

interface ConnectionLog {
  id: string;
  connectionId: string;
  timestamp: string;
  event: 'connect' | 'disconnect' | 'error' | 'timeout' | 'retry';
  message: string;
  responseTime?: number;
  details?: Record<string, any>;
}

export default function ManageConnectionsPage() {
  const [connections, setConnections] = useState<Connection[]>([
    {
      id: '1',
      name: 'Production Database',
      type: 'database',
      endpoint: 'postgresql://prod-db.internal:5432/main',
      status: 'active',
      protocol: 'PostgreSQL',
      authentication: {
        type: 'certificate',
        lastRotated: '30 days ago',
        expiresIn: '60 days'
      },
      performance: {
        latency: 45,
        throughput: '2.4K req/min',
        uptime: 99.98,
        errorRate: 0.02
      },
      monitoring: {
        healthChecks: true,
        alerting: true,
        logging: true
      },
      lastActive: '2 minutes ago',
      createdAt: '6 months ago',
      tags: ['Production', 'Critical', 'Database'],
      retryConfig: {
        maxRetries: 3,
        backoffStrategy: 'exponential',
        retryDelay: 1000
      }
    },
    {
      id: '2',
      name: 'Payment Gateway API',
      type: 'api',
      endpoint: 'https://api.stripe.com/v1/',
      status: 'active',
      protocol: 'HTTPS',
      authentication: {
        type: 'api_key',
        lastRotated: '15 days ago',
        expiresIn: '75 days'
      },
      performance: {
        latency: 156,
        throughput: '856 req/min',
        uptime: 99.95,
        errorRate: 0.05
      },
      monitoring: {
        healthChecks: true,
        alerting: true,
        logging: true
      },
      lastActive: '1 minute ago',
      createdAt: '3 months ago',
      tags: ['Payment', 'External', 'API'],
      retryConfig: {
        maxRetries: 5,
        backoffStrategy: 'exponential',
        retryDelay: 2000
      }
    },
    {
      id: '3',
      name: 'Analytics Webhook',
      type: 'webhook',
      endpoint: 'https://analytics.vector.ai/webhook/events',
      status: 'error',
      protocol: 'HTTPS',
      authentication: {
        type: 'token',
        lastRotated: '7 days ago'
      },
      performance: {
        latency: 234,
        throughput: '1.2K events/min',
        uptime: 97.8,
        errorRate: 2.2
      },
      monitoring: {
        healthChecks: true,
        alerting: true,
        logging: true
      },
      lastActive: '2 hours ago',
      createdAt: '2 months ago',
      tags: ['Analytics', 'Events', 'Webhook'],
      retryConfig: {
        maxRetries: 3,
        backoffStrategy: 'linear',
        retryDelay: 5000
      }
    },
    {
      id: '4',
      name: 'Message Queue',
      type: 'message_queue',
      endpoint: 'amqp://messaging.internal:5672',
      status: 'maintenance',
      protocol: 'AMQP',
      authentication: {
        type: 'basic_auth',
        lastRotated: '45 days ago'
      },
      performance: {
        latency: 12,
        throughput: '15K msg/min',
        uptime: 99.99,
        errorRate: 0.01
      },
      monitoring: {
        healthChecks: true,
        alerting: false,
        logging: true
      },
      lastActive: '1 hour ago',
      createdAt: '8 months ago',
      tags: ['Messaging', 'Internal', 'Queue'],
      retryConfig: {
        maxRetries: 10,
        backoffStrategy: 'constant',
        retryDelay: 500
      }
    }
  ]);

  const [connectionLogs, setConnectionLogs] = useState<ConnectionLog[]>([
    {
      id: '1',
      connectionId: '1',
      timestamp: '2 minutes ago',
      event: 'connect',
      message: 'Connection established successfully',
      responseTime: 45,
      details: { host: 'prod-db.internal', port: 5432 }
    },
    {
      id: '2',
      connectionId: '3',
      timestamp: '2 hours ago',
      event: 'error',
      message: 'Connection timeout after 30 seconds',
      responseTime: 30000,
      details: { error: 'TIMEOUT', retryAttempt: 3 }
    },
    {
      id: '3',
      connectionId: '2',
      timestamp: '5 minutes ago',
      event: 'connect',
      message: 'API connection successful',
      responseTime: 156,
      details: { endpoint: '/v1/health' }
    }
  ]);

  const [selectedConnection, setSelectedConnection] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'inactive': return 'text-gray-400 bg-gray-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      case 'maintenance': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return XCircle;
      case 'error': return AlertTriangle;
      case 'maintenance': return Clock;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return Database;
      case 'api': return Globe;
      case 'webhook': return Zap;
      case 'sftp': return Server;
      case 'message_queue': return Activity;
      case 'streaming': return Wifi;
      default: return Link2;
    }
  };

  const getAuthIcon = (authType: string) => {
    switch (authType) {
      case 'api_key': return Key;
      case 'oauth': return Shield;
      case 'certificate': return Award;
      case 'token': return Key;
      default: return Shield;
    }
  };

  const testConnection = (connectionId: string) => {
    setConnections(connections.map(conn =>
      conn.id === connectionId
        ? { ...conn, status: 'maintenance' as const }
        : conn
    ));

    setTimeout(() => {
      setConnections(connections.map(conn =>
        conn.id === connectionId
          ? { ...conn, status: 'active' as const, lastActive: 'Just now' }
          : conn
      ));
    }, 3000);
  };

  const toggleConnection = (connectionId: string) => {
    setConnections(connections.map(conn =>
      conn.id === connectionId
        ? {
          ...conn,
          status: conn.status === 'active' ? 'inactive' : 'active' as const,
          lastActive: 'Just now'
        }
        : conn
    ));
  };

  const filteredConnections = connections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || connection.status === statusFilter;
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
            <h1 className="text-4xl font-bold text-white mb-2">Manage Connections</h1>
            <p className="text-slate-400">Monitor and manage all system connections with advanced health monitoring and automated failover capabilities.</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Test All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Export Config
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Connection
            </motion.button>
          </div>
        </div>

        {/* Connection Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Connections', value: '47', icon: Link2, color: 'text-blue-500' },
            { label: 'Active Connections', value: '42', icon: CheckCircle, color: 'text-green-500' },
            { label: 'Avg Latency', value: '89ms', icon: Activity, color: 'text-purple-500' },
            { label: 'Success Rate', value: '99.4%', icon: TrendingUp, color: 'text-orange-500' }
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

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search connections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Connections List */}
          <div className="xl:col-span-2">
            <div className="space-y-6">
              {filteredConnections.map((connection, index) => {
                const StatusIcon = getStatusIcon(connection.status);
                const TypeIcon = getTypeIcon(connection.type);
                const AuthIcon = getAuthIcon(connection.authentication.type);

                return (
                  <motion.div
                    key={connection.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedConnection(connection.id)}
                    className={`bg-gray-800/50 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all ${selectedConnection === connection.id
                        ? 'border-purple-500/50 bg-purple-600/10'
                        : 'border-gray-700/50 hover:border-gray-600/50'
                      }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{connection.name}</h3>
                          <p className="text-slate-400 text-sm">{connection.endpoint}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-purple-400 text-sm">{connection.protocol}</span>
                            <span className="text-slate-400">•</span>
                            <div className="flex items-center gap-1">
                              <AuthIcon className="w-3 h-3 text-slate-400" />
                              <span className="text-slate-400 text-sm">{connection.authentication.type.replace('_', ' ')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">{connection.performance.uptime}%</div>
                          <div className="text-slate-400 text-xs">Uptime</div>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(connection.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{connection.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-slate-400 text-xs">Latency</div>
                        <div className="text-blue-400 text-sm font-medium">{connection.performance.latency}ms</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Throughput</div>
                        <div className="text-green-400 text-sm font-medium">{connection.performance.throughput}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Error Rate</div>
                        <div className="text-orange-400 text-sm font-medium">{connection.performance.errorRate}%</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Last Active</div>
                        <div className="text-white text-sm font-medium">{connection.lastActive}</div>
                      </div>
                    </div>

                    {/* Monitoring Status */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${connection.monitoring.healthChecks ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-slate-400 text-sm">Health Checks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${connection.monitoring.alerting ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-slate-400 text-sm">Alerting</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${connection.monitoring.logging ? 'bg-green-500' : 'bg-gray-500'}`} />
                          <span className="text-slate-400 text-sm">Logging</span>
                        </div>
                      </div>
                      {connection.authentication.expiresIn && (
                        <div className="text-slate-400 text-sm">
                          Auth expires: {connection.authentication.expiresIn}
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {connection.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-slate-400 text-sm">
                        Created: {connection.createdAt}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            testConnection(connection.id);
                          }}
                          className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all text-sm"
                        >
                          Test
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleConnection(connection.id);
                          }}
                          className={`px-3 py-1 rounded-lg transition-all text-sm ${connection.status === 'active'
                              ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                              : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                            }`}
                        >
                          {connection.status === 'active' ? 'Disable' : 'Enable'}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Connection Logs */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {connectionLogs.slice(0, 8).map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-lg bg-gray-700/30"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${log.event === 'connect' ? 'bg-green-500' :
                        log.event === 'error' ? 'bg-red-500' :
                          log.event === 'disconnect' ? 'bg-yellow-500' :
                            'bg-blue-500'
                      }`} />
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{log.message}</div>
                      <div className="text-slate-400 text-xs mt-1">
                        {log.timestamp}
                        {log.responseTime && ` • ${log.responseTime}ms`}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connection Health Summary */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Health Summary</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">99.4%</div>
                  <div className="text-slate-400">Overall Reliability</div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Database Connections', health: 98 },
                    { name: 'API Endpoints', health: 96 },
                    { name: 'Webhooks', health: 92 },
                    { name: 'Message Queues', health: 100 }
                  ].map((item, index) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{item.name}</span>
                        <span className="text-white">{item.health}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.health}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Quick Stats</h3>
              <div className="space-y-4">
                {[
                  { label: 'Avg Response Time', value: '89ms', trend: 'down', change: '-12ms' },
                  { label: 'Failed Connections', value: '3', trend: 'up', change: '+1' },
                  { label: 'Retries/Hour', value: '24', trend: 'down', change: '-8' },
                  { label: 'Auth Renewals', value: '12', trend: 'stable', change: '±0' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
                  >
                    <div>
                      <div className="text-white text-sm font-medium">{stat.label}</div>
                      <div className="text-purple-400 text-lg font-bold">{stat.value}</div>
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-red-400' :
                        stat.trend === 'down' ? 'text-green-400' : 'text-gray-400'
                      }`}>
                      {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                        stat.trend === 'down' ? <TrendingDown className="w-4 h-4" /> :
                          <Activity className="w-4 h-4" />}
                      {stat.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Connection Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Add New Connection</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Connection Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                        placeholder="Enter connection name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Connection Type</label>
                      <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                        <option>Database</option>
                        <option>API Endpoint</option>
                        <option>Webhook</option>
                        <option>SFTP</option>
                        <option>Message Queue</option>
                        <option>Streaming</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Endpoint/URL</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter connection endpoint"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Protocol</label>
                      <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                        <option>HTTPS</option>
                        <option>HTTP</option>
                        <option>PostgreSQL</option>
                        <option>MySQL</option>
                        <option>AMQP</option>
                        <option>MQTT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Authentication</label>
                      <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                        <option>API Key</option>
                        <option>OAuth 2.0</option>
                        <option>Basic Auth</option>
                        <option>Certificate</option>
                        <option>Bearer Token</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Max Retries</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                        placeholder="3"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Retry Strategy</label>
                      <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                        <option>Exponential</option>
                        <option>Linear</option>
                        <option>Constant</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Retry Delay (ms)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-slate-400">Monitoring Options</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-white text-sm">Health Checks</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-white text-sm">Alerting</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span className="text-white text-sm">Logging</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                  >
                    Test & Add
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
