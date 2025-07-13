'use client';
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Play, Save, Undo, Redo, Download, Upload, Settings,
  Plus, Trash2, Copy, Move, ZoomIn, ZoomOut, Grid,
  Workflow, Database, MessageSquare, Mail, FileText
} from 'lucide-react';

export default function BuilderPage() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  const nodeTypes = [
    { id: 'trigger', name: 'Trigger', icon: Play, color: 'bg-green-500' },
    { id: 'action', name: 'Action', icon: Workflow, color: 'bg-blue-500' },
    { id: 'condition', name: 'Condition', icon: MessageSquare, color: 'bg-yellow-500' },
    { id: 'data', name: 'Data Source', icon: Database, color: 'bg-purple-500' },
    { id: 'email', name: 'Email', icon: Mail, color: 'bg-red-500' },
    { id: 'document', name: 'Document', icon: FileText, color: 'bg-indigo-500' },
  ];

  const [nodes, setNodes] = useState([
    { id: '1', type: 'trigger', x: 100, y: 100, label: 'File Upload Trigger' },
    { id: '2', type: 'action', x: 300, y: 100, label: 'Extract Text' },
    { id: '3', type: 'condition', x: 500, y: 100, label: 'Validate Format' },
    { id: '4', type: 'action', x: 700, y: 100, label: 'Send Notification' },
  ]);

  const handleZoomIn = () => setZoomLevel(Math.min(zoomLevel + 10, 200));
  const handleZoomOut = () => setZoomLevel(Math.max(zoomLevel - 10, 50));

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div>
          <h1 className="text-2xl font-bold text-white">Visual Automation Builder</h1>
          <p className="text-slate-400">Design workflows with drag-and-drop interface</p>
        </div>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all"
          >
            <Undo className="w-4 h-4" />
            Undo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all"
          >
            <Redo className="w-4 h-4" />
            Redo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all"
          >
            <Save className="w-4 h-4" />
            Save
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all"
          >
            <Play className="w-4 h-4" />
            Test Run
          </motion.button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - Node Palette */}
        <div className="w-64 bg-gray-800/50 border-r border-gray-700 p-4">
          <h3 className="text-lg font-bold text-white mb-4">Components</h3>
          <div className="space-y-2">
            {nodeTypes.map((nodeType) => (
              <motion.div
                key={nodeType.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-all cursor-pointer border border-gray-600"
              >
                <div className={`p-2 rounded-lg ${nodeType.color}`}>
                  <nodeType.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-sm font-medium">{nodeType.name}</span>
              </motion.div>
            ))}
          </div>

          {/* Properties Panel */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-4">Properties</h3>
            {selectedNode ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Node Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                    placeholder="Enter node name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                    placeholder="Enter description"
                  />
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm">Select a node to edit properties</p>
            )}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative bg-gray-900">
          {/* Toolbar */}
          <div className="absolute top-4 left-4 z-10 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleZoomIn}
              className="p-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all"
            >
              <ZoomIn className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleZoomOut}
              className="p-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-all"
            >
              <ZoomOut className="w-4 h-4" />
            </motion.button>
            <div className="px-3 py-2 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg text-white text-sm">
              {zoomLevel}%
            </div>
          </div>

          {/* Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Canvas Content */}
          <div className="relative w-full h-full overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Connection Lines */}
              {nodes.slice(0, -1).map((node, index) => {
                const nextNode = nodes[index + 1];
                return (
                  <line
                    key={`line-${node.id}-${nextNode.id}`}
                    x1={node.x + 100}
                    y1={node.y + 40}
                    x2={nextNode.x}
                    y2={nextNode.y + 40}
                    stroke="rgba(99, 102, 241, 0.5)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}

              {/* Arrow marker */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="rgba(99, 102, 241, 0.5)"
                  />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
              const nodeType = nodeTypes.find(t => t.id === node.type);
              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`absolute bg-gray-800 border-2 rounded-xl p-4 cursor-pointer shadow-lg min-w-[200px] ${selectedNode === node.id ? 'border-purple-500' : 'border-gray-600'
                    }`}
                  style={{ left: node.x, top: node.y }}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {nodeType && (
                      <div className={`p-2 rounded-lg ${nodeType.color}`}>
                        <nodeType.icon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div>
                      <div className="text-white font-medium">{node.label}</div>
                      <div className="text-slate-400 text-xs">{nodeType?.name}</div>
                    </div>
                  </div>

                  {/* Connection Points */}
                  <div className="absolute -left-2 top-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-y-1/2" />
                  <div className="absolute -right-2 top-1/2 w-4 h-4 bg-purple-500 rounded-full transform -translate-y-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
