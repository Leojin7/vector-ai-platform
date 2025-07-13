'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag, Star, Download, Eye, Search, Filter, TrendingUp,
  Zap, Shield, Award, Clock, Users, Heart, ExternalLink
} from 'lucide-react';

export default function MarketplacePage() {
  const [products] = useState([
    {
      id: '1',
      name: 'Advanced OCR Suite',
      category: 'Document Processing',
      description: 'High-accuracy OCR with support for 50+ languages',
      price: '$299/month',
      rating: 4.9,
      reviews: 247,
      downloads: '12K',
      vendor: 'TextVision AI',
      featured: true,
      tags: ['OCR', 'Multi-language', 'Enterprise']
    },
    {
      id: '2',
      name: 'Sentiment Analytics Pro',
      category: 'NLP Tools',
      description: 'Real-time sentiment analysis with industry-specific models',
      price: '$199/month',
      rating: 4.7,
      reviews: 156,
      downloads: '8.5K',
      vendor: 'EmotiAI Labs',
      featured: true,
      tags: ['Sentiment', 'Real-time', 'Industry-specific']
    },
    {
      id: '3',
      name: 'Fraud Detection Engine',
      category: 'Security',
      description: 'ML-powered fraud detection with 99.7% accuracy',
      price: '$499/month',
      rating: 4.8,
      reviews: 89,
      downloads: '5.2K',
      vendor: 'SecureML Inc',
      featured: false,
      tags: ['Fraud Detection', 'Security', 'ML']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'All Categories',
    'Document Processing',
    'NLP Tools',
    'Computer Vision',
    'Security',
    'Analytics',
    'Automation'
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            AI Marketplace
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover premium AI solutions and extensions to supercharge your automation workflows [4][7].
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search marketplace..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase().replace(' ', '-')}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Solutions Available', value: '500+', icon: ShoppingBag },
            { label: 'Verified Vendors', value: '120+', icon: Shield },
            { label: 'Total Downloads', value: '2.3M', icon: Download },
            { label: 'Average Rating', value: '4.8★', icon: Star }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 text-center"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">Featured Solutions</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.filter(p => p.featured).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
              >
                {/* Product Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{product.name}</h3>
                      <p className="text-slate-400 text-sm">{product.vendor}</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm mb-4">{product.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{product.rating}</span>
                      <span className="text-slate-400 text-sm">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400 text-sm">{product.downloads}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-purple-400">{product.price}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                  >
                    Install Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-gray-700/50 text-slate-400 rounded-xl hover:bg-gray-700 transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">All Solutions</h2>
          <div className="space-y-4">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center">
                      <Zap className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                      <p className="text-slate-400 mb-2">{product.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-purple-400 font-medium">{product.vendor}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white">{product.rating}</span>
                        </div>
                        <span className="text-slate-400">{product.downloads} downloads</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-400">{product.price}</div>
                      <div className="text-slate-400 text-sm">{product.category}</div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                      >
                        Install
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
