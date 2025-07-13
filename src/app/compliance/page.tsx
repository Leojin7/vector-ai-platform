'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileCheck, Download, Calendar, Filter, Search, CheckCircle,
  XCircle, Clock, AlertTriangle, Shield, Lock, Eye, Award
} from 'lucide-react';

export default function CompliancePage() {
  const [complianceData] = useState([
    {
      framework: 'SOC 2 Type II',
      status: 'compliant',
      lastAudit: '2024-11-15',
      nextAudit: '2025-11-15',
      score: 98,
      issues: 0,
      recommendations: 2
    },
    {
      framework: 'ISO 27001',
      status: 'compliant',
      lastAudit: '2024-10-20',
      nextAudit: '2025-10-20',
      score: 95,
      issues: 1,
      recommendations: 3
    },
    {
      framework: 'GDPR',
      status: 'compliant',
      lastAudit: '2024-12-01',
      nextAudit: '2025-06-01',
      score: 97,
      issues: 0,
      recommendations: 1
    },
    {
      framework: 'HIPAA',
      status: 'in-progress',
      lastAudit: '2024-09-10',
      nextAudit: '2025-03-10',
      score: 89,
      issues: 3,
      recommendations: 5
    }
  ]);

  const [auditLogs] = useState([
    {
      id: '1',
      action: 'User access review completed',
      user: 'System Auditor',
      timestamp: '2024-12-20 14:30:00',
      framework: 'SOC 2',
      result: 'passed'
    },
    {
      id: '2',
      action: 'Data retention policy updated',
      user: 'Alice Johnson',
      timestamp: '2024-12-20 10:15:00',
      framework: 'GDPR',
      result: 'passed'
    },
    {
      id: '3',
      action: 'Security control assessment',
      user: 'Bob Wilson',
      timestamp: '2024-12-19 16:45:00',
      framework: 'ISO 27001',
      result: 'failed'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400 bg-green-400/10';
      case 'in-progress': return 'text-yellow-400 bg-yellow-400/10';
      case 'non-compliant': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CheckCircle;
      case 'in-progress': return Clock;
      case 'non-compliant': return XCircle;
      default: return AlertTriangle;
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
            <h1 className="text-4xl font-bold text-white mb-2">Compliance & Audit</h1>
            <p className="text-slate-400">Monitor compliance status, manage audits, and track regulatory requirements [6].</p>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white hover:bg-gray-700 transition-all"
            >
              <Download className="w-4 h-4" />
              Export Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-xl text-white hover:bg-purple-700 transition-all"
            >
              <FileCheck className="w-5 h-5" />
              New Audit
            </motion.button>
          </div>
        </div>

        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Compliance Score', value: '95%', icon: Award, color: 'text-green-500' },
            { label: 'Active Frameworks', value: '4', icon: Shield, color: 'text-blue-500' },
            { label: 'Open Issues', value: '4', icon: AlertTriangle, color: 'text-yellow-500' },
            { label: 'Next Audit', value: '45 days', icon: Calendar, color: 'text-purple-500' }
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

        {/* Compliance Frameworks */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold text-white mb-6">Compliance Frameworks</h3>
          <div className="space-y-4">
            {complianceData.map((framework, index) => {
              const StatusIcon = getStatusIcon(framework.status);
              return (
                <motion.div
                  key={framework.framework}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{framework.framework}</h4>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getStatusColor(framework.status)}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="capitalize">{framework.status}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{framework.score}%</div>
                      <div className="text-slate-400 text-sm">Compliance Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-slate-400 text-sm">Last Audit</div>
                      <div className="text-white font-medium">{framework.lastAudit}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Next Audit</div>
                      <div className="text-white font-medium">{framework.nextAudit}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Open Issues</div>
                      <div className={`font-medium ${framework.issues > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {framework.issues}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-sm">Recommendations</div>
                      <div className="text-yellow-400 font-medium">{framework.recommendations}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-all"
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="px-4 py-2 bg-gray-700/50 text-slate-400 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      Generate Report
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Audit Trail */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Audit Trail</h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search audit logs..."
                  className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <select className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500">
                <option>All Frameworks</option>
                <option>SOC 2</option>
                <option>ISO 27001</option>
                <option>GDPR</option>
                <option>HIPAA</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Action</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Framework</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Timestamp</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Result</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log, index) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="py-3 px-4 text-white">{log.action}</td>
                    <td className="py-3 px-4 text-slate-300">{log.user}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                        {log.framework}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {log.result === 'passed' ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className={log.result === 'passed' ? 'text-green-400' : 'text-red-400'}>
                          {log.result}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 text-slate-400 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
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
