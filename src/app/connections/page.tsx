'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Link2, Plus, Search, Filter, CheckCircle, XCircle, Clock, AlertTriangle,
  Settings, Trash2, Eye, RefreshCw, Database, Cloud, Globe, Server,
  Key, Shield, Activity, Zap, Download, Upload, TestTube, Play,
  Pause, MoreHorizontal, Cable, Wifi, Router, HardDrive
} from 'lucide-react';

interface ExternalSystem {
  id: string;
  name: string;
  type: 'api' | 'database' | 'file_system' | 'cloud_service' | 'webhook';
  url: string;
  status: 'connected' | 'disconnected' | 'error' | 'testing';
  lastConnected: string;
  responseTime: string;
  uptime: string;
  dataTransferred: string;
  authentication: 'api_key' | 'oauth' | 'basic_auth' | 'token';
  description: string;
  region?: string;
  version?: string;
}

interface ConnectionTest {
  id: string;
  systemId: string;
  testType: 'connectivity' | 'authentication' | 'performance' | 'data_sync';
  status: 'running' | 'passed' | 'failed' | 'pending';
  duration: string;
  message: string;
  timestamp: string;
}

export default function ConnectionsPage() {
  const [systems, setSystems] = useState<ExternalSystem[]>([
    {
      id: '1',
      name: 'Customer Database API',
      type: 'api',
      url: 'https://api.customer-db.com/v2',
      status: 'connected',
      lastConnected: '2 minutes ago',
      responseTime: '145ms',
      uptime: '99.98%',
      dataTransferred: '2.4GB',
      authentication: 'api_key',
      description: 'Primary customer data repository with real-time synchronization',
      region: 'US-East',
      version: '2.1.0'
    },
    {
      id: '2',
      name: 'AWS S3 Storage',
      type: 'cloud_service',
      url: 's3://vector-platform-storage',
      status: 'connected',
      lastConnected: '5 minutes ago',
      responseTime: '89ms',
      uptime: '99.99%',
      dataTransferred: '15.7GB',
      authentication: 'oauth',
      description: 'Document storage and backup repository',
      region: 'US-West-2',
      version: 'Latest'
    },
    {
      id: '3',
      name: 'PostgreSQL Analytics DB',
      type: 'database',
      url: 'postgresql://analytics.internal:5432/analytics',
      status: 'error',
      lastConnected: '2 hours ago',
      responseTime: 'Timeout',
      uptime: '97.5%',
      dataTransferred: '856MB',
      authentication: 'basic_auth',
      description: 'Analytics data warehouse for reporting and insights',
      region: 'EU-Central',
      version: '14.9'
    },
    {
      id: '4',
      name: 'Webhook Notification System',
      type: 'webhook',
      url: 'https://notifications.vector.ai/webhook',
      status: 'testing',
      lastConnected: 'Testing now',
      responseTime: '234ms',
      uptime: '99.2%',
      dataTransferred: '127MB',
      authentication: 'token',
      description: 'Real-time event notifications and alerts',
      region: 'Global',
      version: '1.0.0'
    }
  ]);

  const [connectionTests, setConnectionTests] = useState<ConnectionTest[]>([
    {
      id: '1',
      systemId: '1',
      testType: 'connectivity',
      status: 'passed',
      duration: '0.3s',
      message: 'Connection established successfully',
      timestamp: '2 minutes ago'
    },
    {
      id: '2',
      systemId: '3',
      testType: 'authentication',
      status: 'failed',
      duration: '5.2s',
      message: 'Authentication failed: Invalid credentials',
      timestamp: '15 minutes ago'
    },
    {
      id: '3',
      systemId: '4',
      testType: 'performance',
      status: 'running',
      duration: '...',
      message: 'Testing response time and throughput',
      timestamp: 'Just now'
    }
  ]);

  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-400/10';
      case 'disconnected': return 'text-gray-400 bg-gray-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      case 'testing': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'disconnected': return XCircle;
      case 'error': return AlertTriangle;
      case 'testing': return Activity;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'api': return Globe;
      case 'database': return Database;
      case 'file_system': return HardDrive;
      case 'cloud_service': return Cloud;
      case 'webhook': return Zap;
      default: return Server;
    }
  };

  const runConnectionTest = (systemId: string, testType: ConnectionTest['testType']) => {
    const newTest: ConnectionTest = {
      id: Date.now().toString(),
      systemId,
      testType,
      status: 'running',
      duration: '...',
      message: 'Test in progress...',
      timestamp: 'Just now'
    };

    setConnectionTests(prev => [newTest, ...prev]);

    // Simulate test completion
    setTimeout(() => {
      setConnectionTests(prev => prev.map(test =>
        test.id === newTest.id
          ? { ...test, status: 'passed', duration: '1.2s', message: 'Test completed successfully' }
          : test
      ));
    }, 2000);
  };

  const filteredSystems = systems.filter(system =>
    system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    system.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <h1 className="text-4xl font-bold text-white mb-2">Connect External Systems</h1>
            <p className="text-slate-400">Configure and manage connections to external APIs, databases, and services with real-time monitoring.</p>
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
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Connection
            </motion.button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Connections', value: '24', icon: Link2, color: 'text-blue-500' },
            { label: 'Avg Response Time', value: '156ms', icon: Activity, color: 'text-green-500' },
            { label: 'Data Transferred', value: '18.9GB', icon: Database, color: 'text-purple-500' },
            { label: 'Uptime Average', value: '99.7%', icon: Shield, color: 'text-orange-500' }
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

        {/* Search */}
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
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Systems List */}
          <div className="xl:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">External Systems</h3>
              <div className="space-y-4">
                {filteredSystems.map((system, index) => {
                  const StatusIcon = getStatusIcon(system.status);
                  const TypeIcon = getTypeIcon(system.type);
                  return (
                    <motion.div
                      key={system.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedSystem(system.id)}
                      className={`border rounded-2xl p-6 cursor-pointer transition-all ${selectedSystem === system.id
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
                            <h4 className="text-white font-medium text-lg">{system.name}</h4>
                            <p className="text-slate-400 text-sm">{system.url}</p>
                            <p className="text-slate-300 text-sm mt-1">{system.description}</p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(system.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{system.status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-slate-400 text-xs">Response Time</div>
                          <div className="text-white text-sm font-medium">{system.responseTime}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">Uptime</div>
                          <div className="text-green-400 text-sm font-medium">{system.uptime}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">Data Transferred</div>
                          <div className="text-blue-400 text-sm font-medium">{system.dataTransferred}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 text-xs">Last Connected</div>
                          <div className="text-white text-sm font-medium">{system.lastConnected}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-slate-400">Auth: <span className="text-purple-400 capitalize">{system.authentication.replace('_', ' ')}</span></span>
                          {system.region && <span className="text-slate-400">Region: <span className="text-white">{system.region}</span></span>}
                          {system.version && <span className="text-slate-400">Version: <span className="text-white">{system.version}</span></span>}
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              runConnectionTest(system.id, 'connectivity');
                            }}
                            className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all text-sm"
                          >
                            Test
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Connection Tests & Details */}
          <div className="space-y-6">
            {/* Test Results */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Tests</h3>
              <div className="space-y-3">
                {connectionTests.slice(0, 5).map((test, index) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-700/30"
                  >
                    <div>
                      <div className="text-white text-sm font-medium capitalize">
                        {test.testType.replace('_', ' ')} Test
                      </div>
                      <div className="text-slate-400 text-xs">{test.message}</div>
                      <div className="text-slate-500 text-xs">{test.timestamp}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs">{test.duration}</span>
                      <div className={`w-2 h-2 rounded-full ${test.status === 'passed' ? 'bg-green-500' :
                          test.status === 'failed' ? 'bg-red-500' :
                            test.status === 'running' ? 'bg-blue-500 animate-pulse' :
                              'bg-yellow-500'
                        }`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connection Health */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Connection Health</h3>
              <div className="space-y-4">
                {['API Endpoints', 'Database Connections', 'File Systems', 'Cloud Services'].map((type, index) => (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{type}</span>
                      <span className="text-white">{95 - index * 5}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${95 - index * 5}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
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
                className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Add External System Connection</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">System Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter system name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Connection Type</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>API Endpoint</option>
                      <option>Database</option>
                      <option>File System</option>
                      <option>Cloud Service</option>
                      <option>Webhook</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-400 mb-2">URL/Endpoint</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="https://api.example.com/v1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Authentication</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>API Key</option>
                      <option>OAuth 2.0</option>
                      <option>Basic Auth</option>
                      <option>Bearer Token</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Region</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>US-East</option>
                      <option>US-West</option>
                      <option>EU-Central</option>
                      <option>Asia-Pacific</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
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
                    Test & Connect
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
