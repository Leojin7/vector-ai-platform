'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Lightbulb, TrendingUp, TrendingDown, Target, Award,
  AlertTriangle, CheckCircle, Clock, Zap, Activity, Eye,
  BarChart3, PieChart, ArrowRight, Star, Bookmark, Share,
  RefreshCw, Download, Filter, Search, ThumbsUp, ThumbsDown,
  Shield
} from 'lucide-react';

interface Insight {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'cost' | 'security' | 'efficiency' | 'user_experience';
  priority: 'low' | 'medium' | 'high' | 'critical';
  impact: string;
  effort: 'low' | 'medium' | 'high';
  potentialSavings?: string;
  confidence: number;
  aiGenerated: boolean;
  isBookmarked: boolean;
  implementationSteps: string[];
  relatedMetrics: string[];
  timestamp: string;
}

interface Recommendation {
  id: string;
  type: 'optimization' | 'alert' | 'opportunity';
  title: string;
  description: string;
  impact: number;
  complexity: 'simple' | 'moderate' | 'complex';
  estimatedTime: string;
  benefits: string[];
}

export default function PerformanceInsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      title: 'Database Query Optimization Opportunity',
      description: 'Our AI analysis detected 15 slow-running queries that could be optimized with proper indexing, potentially reducing response time by 40%.',
      category: 'performance',
      priority: 'high',
      impact: 'High - Response time improvement',
      effort: 'medium',
      potentialSavings: '40% faster queries',
      confidence: 94,
      aiGenerated: true,
      isBookmarked: false,
      implementationSteps: [
        'Analyze slow query log',
        'Create composite indexes on frequently queried columns',
        'Optimize JOIN operations',
        'Test performance improvements'
      ],
      relatedMetrics: ['Response Time', 'Database Performance', 'User Experience'],
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      title: 'Cost Reduction Through Auto-Scaling',
      description: 'Historical usage patterns suggest implementing auto-scaling could reduce infrastructure costs by 25% while maintaining performance.',
      category: 'cost',
      priority: 'medium',
      impact: 'Medium - Cost optimization',
      effort: 'high',
      potentialSavings: '$2,400/month',
      confidence: 87,
      aiGenerated: true,
      isBookmarked: true,
      implementationSteps: [
        'Configure auto-scaling groups',
        'Set up CloudWatch metrics',
        'Define scaling policies',
        'Monitor and adjust thresholds'
      ],
      relatedMetrics: ['Cost per Transaction', 'Resource Utilization', 'System Load'],
      timestamp: '4 hours ago'
    },
    {
      id: '3',
      title: 'API Rate Limiting Enhancement',
      description: 'Current API usage patterns indicate implementing intelligent rate limiting could improve system stability and prevent abuse.',
      category: 'security',
      priority: 'medium',
      impact: 'Medium - Security improvement',
      effort: 'low',
      confidence: 91,
      aiGenerated: true,
      isBookmarked: false,
      implementationSteps: [
        'Implement Redis-based rate limiting',
        'Configure tiered limits by user type',
        'Add rate limit headers',
        'Monitor and alert on threshold breaches'
      ],
      relatedMetrics: ['API Response Time', 'Error Rate', 'Security Score'],
      timestamp: '6 hours ago'
    },
    {
      id: '4',
      title: 'Memory Usage Optimization',
      description: 'Memory usage spikes during peak hours suggest implementing caching strategies could improve performance and reduce resource consumption.',
      category: 'efficiency',
      priority: 'high',
      impact: 'High - Resource optimization',
      effort: 'medium',
      potentialSavings: '30% memory reduction',
      confidence: 89,
      aiGenerated: true,
      isBookmarked: true,
      implementationSteps: [
        'Implement Redis caching layer',
        'Cache frequently accessed data',
        'Set appropriate TTL values',
        'Monitor cache hit rates'
      ],
      relatedMetrics: ['Memory Usage', 'Cache Hit Rate', 'Response Time'],
      timestamp: '1 day ago'
    }
  ]);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'optimization',
      title: 'Implement Connection Pooling',
      description: 'Database connection pooling can reduce connection overhead and improve response times',
      impact: 85,
      complexity: 'moderate',
      estimatedTime: '2-3 days',
      benefits: ['Reduced connection overhead', 'Better resource utilization', 'Improved scalability']
    },
    {
      id: '2',
      type: 'alert',
      title: 'High Memory Usage Detected',
      description: 'Memory usage has been consistently above 85% for the past 2 hours',
      impact: 70,
      complexity: 'simple',
      estimatedTime: '1 hour',
      benefits: ['Prevent out-of-memory errors', 'Maintain system stability', 'Improve user experience']
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Enable Compression for Static Assets',
      description: 'Enabling gzip compression could reduce bandwidth usage by up to 60%',
      impact: 60,
      complexity: 'simple',
      estimatedTime: '30 minutes',
      benefits: ['Reduced bandwidth costs', 'Faster page load times', 'Better user experience']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-400/10';
      case 'high': return 'text-orange-400 bg-orange-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return TrendingUp;
      case 'cost': return Target;
      case 'security': return Shield;
      case 'efficiency': return Zap;
      case 'user_experience': return Star;
      default: return Lightbulb;
    }
  };

  const getRecommendationTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return TrendingUp;
      case 'alert': return AlertTriangle;
      case 'opportunity': return Lightbulb;
      default: return Brain;
    }
  };

  const toggleBookmark = (insightId: string) => {
    setInsights(insights.map(insight =>
      insight.id === insightId
        ? { ...insight, isBookmarked: !insight.isBookmarked }
        : insight
    ));
  };

  const filteredInsights = insights.filter(insight => {
    const matchesSearch = insight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || insight.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            <h1 className="text-4xl font-bold text-white mb-2">Performance Insights</h1>
            <p className="text-slate-400">AI-powered insights and recommendations to optimize your platform performance and efficiency.</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh Insights
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
          </div>
        </div>

        {/* Insights Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Insights', value: '127', icon: Brain, color: 'text-purple-500' },
            { label: 'High Priority', value: '8', icon: AlertTriangle, color: 'text-red-500' },
            { label: 'Cost Savings', value: '$12.4K', icon: Target, color: 'text-green-500' },
            { label: 'Implemented', value: '89%', icon: CheckCircle, color: 'text-blue-500' }
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
              placeholder="Search insights..."
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
            <option value="performance">Performance</option>
            <option value="cost">Cost Optimization</option>
            <option value="security">Security</option>
            <option value="efficiency">Efficiency</option>
            <option value="user_experience">User Experience</option>
          </select>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Insights List */}
          <div className="xl:col-span-2">
            <div className="space-y-6">
              {filteredInsights.map((insight, index) => {
                const CategoryIcon = getCategoryIcon(insight.category);
                return (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                          <CategoryIcon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-white">{insight.title}</h3>
                            {insight.aiGenerated && (
                              <div className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full">
                                AI Generated
                              </div>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">{insight.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => toggleBookmark(insight.id)}
                          className={`p-2 rounded-lg transition-colors ${insight.isBookmarked
                            ? 'text-yellow-400 bg-yellow-400/10'
                            : 'text-slate-400 hover:text-yellow-400'
                            }`}
                        >
                          <Bookmark className={`w-4 h-4 ${insight.isBookmarked ? 'fill-current' : ''}`} />
                        </motion.button>
                        <div className={`px-3 py-1 rounded-full text-sm ${getPriorityColor(insight.priority)}`}>
                          {insight.priority}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-slate-400 text-xs">Impact</div>
                        <div className="text-white text-sm font-medium">{insight.impact}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Effort</div>
                        <div className="text-white text-sm font-medium capitalize">{insight.effort}</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Confidence</div>
                        <div className="text-purple-400 text-sm font-medium">{insight.confidence}%</div>
                      </div>
                      {insight.potentialSavings && (
                        <div>
                          <div className="text-slate-400 text-xs">Potential Savings</div>
                          <div className="text-green-400 text-sm font-medium">{insight.potentialSavings}</div>
                        </div>
                      )}
                    </div>

                    {/* Implementation Steps */}
                    <div className="mb-4">
                      <div className="text-slate-400 text-sm mb-2">Implementation Steps:</div>
                      <div className="space-y-1">
                        {insight.implementationSteps.slice(0, 2).map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span className="text-slate-300">{step}</span>
                          </div>
                        ))}
                        {insight.implementationSteps.length > 2 && (
                          <div className="text-purple-400 text-sm">
                            +{insight.implementationSteps.length - 2} more steps
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Related Metrics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {insight.relatedMetrics.map(metric => (
                        <span
                          key={metric}
                          className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">{insight.timestamp}</span>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-1 px-3 py-1 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all text-sm"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          Helpful
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-1 px-3 py-1 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all text-sm"
                        >
                          <Eye className="w-3 h-3" />
                          View Details
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all text-sm"
                        >
                          <Share className="w-3 h-3" />
                          Share
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
            {/* Quick Recommendations */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Quick Recommendations</h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => {
                  const TypeIcon = getRecommendationTypeIcon(rec.type);
                  return (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-700/50 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                          <p className="text-slate-400 text-xs mt-1">{rec.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 text-xs">Impact</span>
                        <div className="flex-1 mx-2 bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full"
                            style={{ width: `${rec.impact}%` }}
                          />
                        </div>
                        <span className="text-white text-xs">{rec.impact}%</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">{rec.estimatedTime}</span>
                        <span className={`px-2 py-1 rounded-full ${rec.complexity === 'simple' ? 'bg-green-600/20 text-green-400' :
                          rec.complexity === 'moderate' ? 'bg-yellow-600/20 text-yellow-400' :
                            'bg-red-600/20 text-red-400'
                          }`}>
                          {rec.complexity}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Insights Summary */}
            <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Insights Summary</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">94.7%</div>
                  <div className="text-slate-400 text-sm">Overall Health Score</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400">12</div>
                    <div className="text-slate-400 text-xs">Active Insights</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">8</div>
                    <div className="text-slate-400 text-xs">Completed</div>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  {[
                    { name: 'Performance', count: 5, color: 'bg-blue-500' },
                    { name: 'Cost', count: 3, color: 'bg-green-500' },
                    { name: 'Security', count: 2, color: 'bg-red-500' },
                    { name: 'Efficiency', count: 2, color: 'bg-purple-500' }
                  ].map((category, index) => (
                    <div key={category.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-slate-300 text-sm">{category.name}</span>
                      </div>
                      <span className="text-white text-sm">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
