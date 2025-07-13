'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Plus, Search, Filter, MoreHorizontal, Mail,
  Phone, MapPin, Calendar, Activity, Crown, Shield
} from 'lucide-react';

export default function TeamPage() {
  const [teamMembers] = useState([
    {
      id: '1',
      name: 'Alex Chen',
      role: 'AI Engineer',
      department: 'Engineering',
      email: 'alex.chen@vector.ai',
      avatar: '/api/placeholder/64/64',
      status: 'online',
      lastActive: 'Now',
      projects: 5,
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      department: 'Product',
      email: 'sarah.j@vector.ai',
      avatar: '/api/placeholder/64/64',
      status: 'busy',
      lastActive: '5 min ago',
      projects: 8,
      location: 'New York, NY'
    },
    {
      id: '3',
      name: 'Marcus Rodriguez',
      role: 'Data Scientist',
      department: 'Research',
      email: 'marcus.r@vector.ai',
      avatar: '/api/placeholder/64/64',
      status: 'away',
      lastActive: '2 hours ago',
      projects: 3,
      location: 'Austin, TX'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-red-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-500';
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
            <h1 className="text-4xl font-bold text-white mb-2">Team</h1>
            <p className="text-slate-400">Collaborate with your team members and manage workspace access.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Invite Member
          </motion.button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Members', value: '24', icon: Users },
            { label: 'Active Projects', value: '16', icon: Activity },
            { label: 'Departments', value: '6', icon: Shield },
            { label: 'Online Now', value: '18', icon: Crown }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <stat.icon className="w-6 h-6 text-purple-400" />
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
              placeholder="Search team members..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Product</option>
            <option>Research</option>
            <option>Marketing</option>
          </select>
          <select className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500">
            <option>All Status</option>
            <option>Online</option>
            <option>Busy</option>
            <option>Away</option>
          </select>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
            >
              {/* Member Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(member.status)}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-purple-400 text-sm">{member.role}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Member Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{member.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{member.projects} active projects</span>
                </div>
              </div>

              {/* Status and Last Active */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                  <span className="text-slate-400 text-sm capitalize">{member.status}</span>
                </div>
                <span className="text-slate-400 text-sm">{member.lastActive}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
                >
                  Message
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="p-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <Phone className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Department Overview */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-8">Department Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Engineering', members: 12, lead: 'Alex Chen', projects: 8 },
              { name: 'Product', members: 6, lead: 'Sarah Johnson', projects: 5 },
              { name: 'Research', members: 4, lead: 'Marcus Rodriguez', projects: 3 },
              { name: 'Marketing', members: 8, lead: 'Emma Wilson', projects: 6 },
              { name: 'Sales', members: 10, lead: 'David Kim', projects: 12 },
              { name: 'Operations', members: 5, lead: 'Lisa Zhang', projects: 4 }
            ].map((dept, index) => (
              <motion.div
                key={dept.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-4">{dept.name}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Members:</span>
                    <span className="text-white">{dept.members}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Department Lead:</span>
                    <span className="text-purple-400">{dept.lead}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Active Projects:</span>
                    <span className="text-white">{dept.projects}</span>
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
