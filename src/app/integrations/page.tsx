'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Link2, Plus, Search, Filter, CheckCircle, XCircle, Clock,
  Settings, Trash2, Eye, RefreshCw, Database, Cloud,
  Smartphone, Globe, Mail, MessageSquare, CreditCard,
  FileText, BarChart3, Users, Zap, Activity, AlertTriangle,
  Star
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  provider: string;
  category: 'database' | 'cloud' | 'communication' | 'payment' | 'analytics' | 'productivity';
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  recordsCount: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isPopular?: boolean;
}

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      name: 'Salesforce CRM',
      provider: 'Salesforce',
      category: 'database',
      status: 'connected',
      lastSync: '2 minutes ago',
      recordsCount: '12,847',
      description: 'Customer relationship management and sales automation',
      icon: Database,
      isPopular: true
    },
    {
      id: '2',
      name: 'Slack Workspace',
      provider: 'Slack',
      category: 'communication',
      status: 'connected',
      lastSync: '5 minutes ago',
      recordsCount: '2,156',
      description: 'Team communication and collaboration platform',
      icon: MessageSquare,
      isPopular: true
    },
    {
      id: '3',
      name: 'AWS S3 Storage',
      provider: 'Amazon Web Services',
      category: 'cloud',
      status: 'syncing',
      lastSync: 'Syncing now',
      recordsCount: '50GB',
      description: 'Cloud storage and file management',
      icon: Cloud
    },
    {
      id: '4',
      name: 'Stripe Payments',
      provider: 'Stripe',
      category: 'payment',
      status: 'error',
      lastSync: '2 hours ago',
      recordsCount: '8,423',
      description: 'Payment processing and financial transactions',
      icon: CreditCard
    },
    {
      id: '5',
      name: 'Google Analytics',
      provider: 'Google',
      category: 'analytics',
      status: 'connected',
      lastSync: '10 minutes ago',
      recordsCount: '1.2M',
      description: 'Web analytics and user behavior tracking',
      icon: BarChart3,
      isPopular: true
    },
    {
      id: '6',
      name: 'Microsoft Office 365',
      provider: 'Microsoft',
      category: 'productivity',
      status: 'disconnected',
      lastSync: '1 day ago',
      recordsCount: '5,678',
      description: 'Office suite and productivity tools',
      icon: FileText
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const availableIntegrations = [
    { name: 'HubSpot CRM', provider: 'HubSpot', icon: Database, category: 'database' },
    { name: 'Microsoft Teams', provider: 'Microsoft', icon: MessageSquare, category: 'communication' },
    { name: 'Dropbox', provider: 'Dropbox', icon: Cloud, category: 'cloud' },
    { name: 'PayPal', provider: 'PayPal', icon: CreditCard, category: 'payment' },
    { name: 'Mixpanel', provider: 'Mixpanel', icon: BarChart3, category: 'analytics' },
    { name: 'Notion', provider: 'Notion', icon: FileText, category: 'productivity' },
    { name: 'Zoom', provider: 'Zoom', icon: MessageSquare, category: 'communication' },
    { name: 'GitHub', provider: 'GitHub', icon: Database, category: 'productivity' }
  ];

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'database': return Database;
      case 'cloud': return Cloud;
      case 'communication': return MessageSquare;
      case 'payment': return CreditCard;
      case 'analytics': return BarChart3;
      case 'productivity': return FileText;
      default: return Link2;
    }
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleIntegration = (id: string) => {
    setIntegrations(integrations.map(integration =>
      integration.id === id
        ? { ...integration, status: integration.status === 'connected' ? 'disconnected' : 'connected' as any }
        : integration
    ));
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
            <h1 className="text-4xl font-bold text-white mb-2">Integrations</h1>
            <p className="text-slate-400">Connect and manage third-party applications to streamline your workflows [8][9].</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add Integration
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Connections', value: '24', icon: Link2, color: 'text-blue-500' },
            { label: 'Data Synced', value: '2.8M', icon: Database, color: 'text-green-500' },
            { label: 'Daily API Calls', value: '156K', icon: Zap, color: 'text-purple-500' },
            { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                <span className="text-slate-400 text-sm">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Categories</option>
            <option value="database">Database</option>
            <option value="cloud">Cloud Storage</option>
            <option value="communication">Communication</option>
            <option value="payment">Payment</option>
            <option value="analytics">Analytics</option>
            <option value="productivity">Productivity</option>
          </select>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration, index) => {
            const StatusIcon = getStatusIcon(integration.status);
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                      <integration.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{integration.name}</h3>
                        {integration.isPopular && (
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <p className="text-slate-400 text-sm">{integration.provider}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(integration.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{integration.status}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-6">{integration.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-slate-400 text-xs">Last Sync</div>
                    <div className="text-white text-sm font-medium">{integration.lastSync}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-xs">Records</div>
                    <div className="text-white text-sm font-medium">{integration.recordsCount}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => toggleIntegration(integration.id)}
                    className={`flex-1 py-2 rounded-lg transition-all text-sm ${integration.status === 'connected'
                      ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30'
                      : 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                      }`}
                  >
                    {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add Integration Modal */}
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
                <h3 className="text-2xl font-bold text-white mb-6">Add New Integration</h3>

                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search available integrations..."
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {availableIntegrations.map((integration, index) => (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border border-gray-700 rounded-xl p-4 hover:border-purple-500/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                          <integration.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{integration.name}</h4>
                          <p className="text-slate-400 text-sm">{integration.provider}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="w-full py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all text-sm"
                      >
                        Connect
                      </motion.button>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all"
                  >
                    Cancel
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
