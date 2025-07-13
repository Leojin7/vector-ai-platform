'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserCheck, Plus, Search, Filter, MoreHorizontal, Edit,
  Trash2, Shield, Key, Clock, CheckCircle, XCircle,
  Crown, Users, Settings, Mail,
  Eye
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer' | 'guest';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  department: string;
  permissions: string[];
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Administrator',
      email: 'john.admin@vector.ai',
      role: 'admin',
      status: 'active',
      lastLogin: '2 hours ago',
      department: 'IT',
      permissions: ['full_access', 'user_management', 'system_config']
    },
    {
      id: '2',
      name: 'Jane Editor',
      email: 'jane.editor@vector.ai',
      role: 'editor',
      status: 'active',
      lastLogin: '1 day ago',
      department: 'Content',
      permissions: ['read_write', 'workflow_management']
    },
    {
      id: '3',
      name: 'Bob Viewer',
      email: 'bob.viewer@vector.ai',
      role: 'viewer',
      status: 'inactive',
      lastLogin: '1 week ago',
      department: 'Sales',
      permissions: ['read_only']
    }
  ]);

  const [showAddUser, setShowAddUser] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-400 bg-red-400/10';
      case 'editor': return 'text-blue-400 bg-blue-400/10';
      case 'viewer': return 'text-green-400 bg-green-400/10';
      case 'guest': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Crown;
      case 'editor': return Edit;
      case 'viewer': return Eye;
      case 'guest': return Users;
      default: return Users;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'inactive': return 'text-red-400';
      case 'pending': return 'text-yellow-400';
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
            <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
            <p className="text-slate-400">Manage user access, roles, and permissions across your organization.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowAddUser(true)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            Add User
          </motion.button>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: '127', icon: Users, color: 'text-blue-500' },
            { label: 'Active Users', value: '98', icon: CheckCircle, color: 'text-green-500' },
            { label: 'Pending Invites', value: '12', icon: Clock, color: 'text-yellow-500' },
            { label: 'Admins', value: '8', icon: Crown, color: 'text-red-500' }
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
              placeholder="Search users..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>
          <select className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500">
            <option>All Roles</option>
            <option>Admin</option>
            <option>Editor</option>
            <option>Viewer</option>
            <option>Guest</option>
          </select>
          <select className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Pending</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="text-left py-4 px-6 text-slate-400 font-medium">User</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-medium">Role</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-medium">Department</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-medium">Last Login</th>
                  <th className="text-left py-4 px-6 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-purple-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-slate-400 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getRoleColor(user.role)}`}>
                          <RoleIcon className="w-4 h-4" />
                          <span className="capitalize">{user.role}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-white">{user.department}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' :
                            user.status === 'inactive' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />
                          <span className={`capitalize ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-400">{user.lastLogin}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-slate-400 hover:text-white transition-colors"
                          >
                            <Key className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Permissions Overview */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-8">Role Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: 'admin',
                name: 'Administrator',
                permissions: ['Full System Access', 'User Management', 'Settings', 'Billing'],
                color: 'text-red-400 bg-red-400/10'
              },
              {
                role: 'editor',
                name: 'Editor',
                permissions: ['Read/Write Access', 'Workflow Management', 'Team Collaboration'],
                color: 'text-blue-400 bg-blue-400/10'
              },
              {
                role: 'viewer',
                name: 'Viewer',
                permissions: ['Read-only Access', 'View Reports', 'Export Data'],
                color: 'text-green-400 bg-green-400/10'
              },
              {
                role: 'guest',
                name: 'Guest',
                permissions: ['Limited Access', 'View Public Content'],
                color: 'text-gray-400 bg-gray-400/10'
              }
            ].map((roleInfo, index) => {
              const RoleIcon = getRoleIcon(roleInfo.role);
              return (
                <motion.div
                  key={roleInfo.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${roleInfo.color} mb-4`}>
                    <RoleIcon className="w-4 h-4" />
                    <span>{roleInfo.name}</span>
                  </div>
                  <div className="space-y-2">
                    {roleInfo.permissions.map(permission => (
                      <div key={permission} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300">{permission}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Add User Modal */}
        <AnimatePresence>
          {showAddUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowAddUser(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Add New User</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500"
                      placeholder="user@vector.ai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Role</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>Viewer</option>
                      <option>Editor</option>
                      <option>Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Department</label>
                    <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:outline-none focus:border-purple-500">
                      <option>Engineering</option>
                      <option>Product</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setShowAddUser(false)}
                      className="flex-1 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all"
                    >
                      Send Invite
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
