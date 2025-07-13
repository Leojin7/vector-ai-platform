'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, Plus, Search, Filter, CheckCircle, XCircle, Clock,
  AlertTriangle, Settings, Trash2, Eye, RefreshCw, Download,
  Upload, Link2, Server, Cloud, HardDrive, Globe, Key,
  Activity, Zap, BarChart3, FileText, Table, GitBranch,
  ArrowRight
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'database' | 'api' | 'file' | 'cloud_storage' | 'stream' | 'warehouse';
  provider: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  recordCount: string;
  dataSize: string;
  schema: {
    tables: number;
    columns: number;
  };
  connectionString: string;
  syncFrequency: string;
  description: string;
  tags: string[];
  healthScore: number;
}

interface DataLineage {
  source: string;
  target: string;
  transformation?: string;
  lastUpdate: string;
}

export default function DataSourcesPage() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: '1',
      name: 'Customer Database',
      type: 'database',
      provider: 'PostgreSQL',
      status: 'connected',
      lastSync: '2 minutes ago',
      recordCount: '2.4M',
      dataSize: '156 GB',
      schema: { tables: 24, columns: 186 },
      connectionString: 'postgresql://prod-db.internal:5432/customers',
      syncFrequency: 'Real-time',
      description: 'Primary customer data repository with user profiles, preferences, and transaction history',
      tags: ['Production', 'Customer Data', 'Critical'],
      healthScore: 98
    },
    {
      id: '2',
      name: 'Analytics Warehouse',
      type: 'warehouse',
      provider: 'Snowflake',
      status: 'connected',
      lastSync: '15 minutes ago',
      recordCount: '45.7M',
      dataSize: '2.3 TB',
      schema: { tables: 156, columns: 1240 },
      connectionString: 'snowflake://analytics.snowflakecomputing.com',
      syncFrequency: 'Hourly',
      description: 'Data warehouse for business intelligence and advanced analytics',
      tags: ['Analytics', 'Business Intelligence', 'Historical Data'],
      healthScore: 95
    },
    {
      id: '3',
      name: 'Salesforce CRM API',
      type: 'api',
      provider: 'Salesforce',
      status: 'syncing',
      lastSync: 'Syncing now',
      recordCount: '847K',
      dataSize: '12.4 GB',
      schema: { tables: 8, columns: 64 },
      connectionString: 'https://api.salesforce.com/v58.0/',
      syncFrequency: 'Every 30 minutes',
      description: 'Sales and customer relationship management data',
      tags: ['CRM', 'Sales', 'External API'],
      healthScore: 87
    },
    {
      id: '4',
      name: 'Document Storage',
      type: 'cloud_storage',
      provider: 'AWS S3',
      status: 'connected',
      lastSync: '1 hour ago',
      recordCount: '156K files',
      dataSize: '89.2 GB',
      schema: { tables: 0, columns: 0 },
      connectionString: 's3://vector-documents/',
      syncFrequency: 'On change',
      description: 'Document repository for AI processing and analysis',
      tags: ['Documents', 'AI Training', 'Cloud Storage'],
      healthScore: 92
    },
    {
      id: '5',
      name: 'Event Stream',
      type: 'stream',
      provider: 'Apache Kafka',
      status: 'error',
      lastSync: '2 hours ago',
      recordCount: '12.5M events',
      dataSize: '45.8 GB',
      schema: { tables: 0, columns: 0 },
      connectionString: 'kafka://events.internal:9092',
      syncFrequency: 'Real-time stream',
      description: 'Real-time event stream for user interactions and system events',
      tags: ['Real-time', 'Events', 'Streaming'],
      healthScore: 23
    }
  ]);

  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const [dataLineage] = useState<DataLineage[]>([
    { source: 'Customer Database', target: 'Analytics Warehouse', transformation: 'ETL Pipeline', lastUpdate: '1 hour ago' },
    { source: 'Salesforce CRM API', target: 'Customer Database', transformation: 'Data Sync', lastUpdate: '30 minutes ago' },
    { source: 'Event Stream', target: 'Analytics Warehouse', transformation: 'Stream Processing', lastUpdate: '2 hours ago' },
    { source: 'Document Storage', target: 'AI Training Pipeline', transformation: 'Data Preprocessing', lastUpdate: '45 minutes ago' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-400 bg-green-400/10';
      case 'disconnected': return 'text-gray-400 bg-gray-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      case 'syncing': return 'text-blue-400 bg-blue-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'disconnected': return XCircle;
      case 'error': return AlertTriangle;
      case 'syncing': return Activity;
      default: return Clock;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'database': return Database;
      case 'api': return Globe;
      case 'file': return FileText;
      case 'cloud_storage': return Cloud;
      case 'stream': return Zap;
      case 'warehouse': return Server;
      default: return Database;
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      source.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === 'all' || source.type === selectedType;
    return matchesSearch && matchesType;
  });

  const testConnection = (sourceId: string) => {
    setDataSources(sources => sources.map(source =>
      source.id === sourceId
        ? { ...source, status: 'syncing' as const }
        : source
    ));

    // Simulate connection test
    setTimeout(() => {
      setDataSources(sources => sources.map(source =>
        source.id === sourceId
          ? { ...source, status: 'connected' as const, lastSync: 'Just now' }
          : source
      ));
    }, 2000);
  };

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
            <h1 className="text-4xl font-bold text-white mb-2">Data Sources</h1>
            <p className="text-slate-400">Manage and monitor your data sources with comprehensive lineage tracking and health monitoring.</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Sync All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Data Source
            </motion.button>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Connected Sources', value: '47', icon: Database, color: 'text-blue-500' },
            { label: 'Total Records', value: '61.4M', icon: BarChart3, color: 'text-green-500' },
            { label: 'Data Volume', value: '2.6TB', icon: HardDrive, color: 'text-purple-500' },
            { label: 'Avg Health Score', value: '91%', icon: Activity, color: 'text-orange-500' }
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
              placeholder="Search data sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Types</option>
            <option value="database">Database</option>
            <option value="api">API</option>
            <option value="file">File</option>
            <option value="cloud_storage">Cloud Storage</option>
            <option value="stream">Stream</option>
            <option value="warehouse">Data Warehouse</option>
          </select>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Data Sources List */}
          <div className="xl:col-span-2">
            <div className="space-y-6">
              {filteredDataSources.map((source, index) => {
                const StatusIcon = getStatusIcon(source.status);
                const TypeIcon = getTypeIcon(source.type);
                return (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedSource(source.id)}
                    className={`bg-gray-800/50 backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all ${selectedSource === source.id
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
                          <h3 className="text-xl font-bold text-white">{source.name}</h3>
                          <p className="text-slate-400 text-sm">{source.provider} • {source.type.replace('_', ' ')}</p>
                          <p className="text-slate-300 text-sm mt-1">{source.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getHealthScoreColor(source.healthScore)}`}>
                            {source.healthScore}%
                          </div>
                          <div className="text-slate-400 text-xs">Health</div>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(source.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{source.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-slate-400 text-xs">Records</div>
                        <div className="text-white text-sm font-medium">{source.recordCount}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Data Size</div>
                        <div className="text-blue-400 text-sm font-medium">{source.dataSize}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Schema</div>
                        <div className="text-purple-400 text-sm font-medium">
                          {source.schema.tables > 0 ? `${source.schema.tables} tables` : 'No schema'}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Sync Frequency</div>
                        <div className="text-green-400 text-sm font-medium">{source.syncFrequency}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {source.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-slate-400 text-sm">
                        Last sync: {source.lastSync}
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            testConnection(source.id);
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
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <Eye className="w-4 h-4" />
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
            {/* Data Lineage */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <GitBranch className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Data Lineage</h3>
              </div>
              <div className="space-y-4">
                {dataLineage.map((lineage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-700/50 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-white text-sm font-medium">{lineage.source}</div>
                      <ArrowRight className="w-4 h-4 text-purple-400" />
                      <div className="text-white text-sm font-medium">{lineage.target}</div>
                    </div>
                    {lineage.transformation && (
                      <div className="text-purple-400 text-sm mb-1">{lineage.transformation}</div>
                    )}
                    <div className="text-slate-400 text-xs">{lineage.lastUpdate}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Data Quality Score */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Data Quality Overview</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-400 mb-2">91%</div>
                  <div className="text-slate-400">Overall Quality Score</div>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Completeness', score: 95 },
                    { name: 'Accuracy', score: 89 },
                    { name: 'Consistency', score: 92 },
                    { name: 'Timeliness', score: 87 }
                  ].map((metric, index) => (
                    <div key={metric.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{metric.name}</span>
                        <span className="text-white">{metric.score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.score}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Schema updated', source: 'Customer Database', time: '2 hours ago' },
                  { action: 'Sync completed', source: 'Analytics Warehouse', time: '4 hours ago' },
                  { action: 'Connection error', source: 'Event Stream', time: '6 hours ago' },
                  { action: 'New data source added', source: 'API Gateway', time: '1 day ago' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30"
                  >
                    <div className={`w-2 h-2 rounded-full ${activity.action.includes('error') ? 'bg-red-500' :
                      activity.action.includes('completed') ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                    <div className="flex-1">
                      <div className="text-white text-sm">{activity.action}</div>
                      <div className="text-slate-400 text-xs">{activity.source} • {activity.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Data Source Modal */}
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
                <h3 className="text-2xl font-bold text-white mb-6">Add New Data Source</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Source Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter source name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Source Type</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>Database</option>
                      <option>API Endpoint</option>
                      <option>File System</option>
                      <option>Cloud Storage</option>
                      <option>Data Stream</option>
                      <option>Data Warehouse</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-400 mb-2">Connection String</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="Enter connection details"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Provider</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., PostgreSQL, MySQL, AWS S3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Sync Frequency</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>Real-time</option>
                      <option>Every 5 minutes</option>
                      <option>Every 30 minutes</option>
                      <option>Hourly</option>
                      <option>Daily</option>
                      <option>On change</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-slate-400 mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="Describe the data source and its purpose"
                    />
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
