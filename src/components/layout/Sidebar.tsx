'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BarChart3, Workflow, Bot, Users, FileText, Link2,
  Database, Cpu, ShoppingBag, Shield, Key, Settings, BookOpen, UserCheck,
  Lock, FileCog, Star, ChevronRight, Search, Bell, HelpCircle, LogOut,
  Sparkles, Zap, Activity, Brain, TrendingUp, Eye, Palette, Code, Target
} from 'lucide-react';
import { AuthButton } from '../../components/auth/AuthButton';
interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  badge?: string;
  category: string;
  isNew?: boolean;
  description?: string;
}

const menuItems: MenuItem[] = [
  // Core Platform
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    category: 'core',
    description: 'Main control center and overview'
  },
  {
    label: 'Overview & Analytics',
    icon: BarChart3,
    href: '/analytics',
    category: 'core',
    badge: '12',
    description: 'Comprehensive platform analytics'
  },

  // Automation
  {
    label: 'Workflows',
    icon: Workflow,
    href: '/workflows',
    category: 'automation',
    description: 'Automated process management'
  },
  {
    label: 'Visual Automation Builder',
    icon: Bot,
    href: '/builder',
    category: 'automation',
    isNew: true,
    description: 'Drag-and-drop workflow designer'
  },

  // AI & Intelligence
  {
    label: 'AI Agents',
    icon: Brain,
    href: '/ai-agents',
    category: 'ai',
    description: 'Intelligent automation agents'
  },
  {
    label: 'Multi-Agent Orchestration',
    icon: Users,
    href: '/multi-agent',
    category: 'ai',
    description: 'Coordinate multiple AI agents'
  },

  // Data & Documents
  {
    label: 'Documents',
    icon: FileText,
    href: '/documents',
    category: 'data',
    description: 'Document management system'
  },
  {
    label: 'Document Processing',
    icon: FileCog,
    href: '/doc-processing',
    category: 'data',
    description: 'AI-powered document analysis'
  },

  // Integrations
  {
    label: 'Integrations',
    icon: Link2,
    href: '/integrations',
    category: 'integration',
    description: 'Third-party system connections'
  },
  {
    label: 'Connect External Systems',
    icon: Database,
    href: '/connections',
    category: 'integration',
    description: 'External system configuration'
  },

  // Analytics & Insights
  {
    label: 'Performance Analytics',
    icon: TrendingUp,
    href: '/performance',
    category: 'analytics',
    description: 'System performance metrics'
  },
  {
    label: 'Performance Insights',
    icon: Eye,
    href: '/insights',
    category: 'analytics',
    description: 'AI-driven performance insights'
  },

  // Data Management
  {
    label: 'Data Sources',
    icon: Database,
    href: '/data-sources',
    category: 'data-mgmt',
    description: 'Data source management'
  },
  {
    label: 'Manage Connections',
    icon: Link2,
    href: '/manage-connections',
    category: 'data-mgmt',
    description: 'Connection lifecycle management'
  },

  // AI Models
  {
    label: 'AI Models',
    icon: Cpu,
    href: '/models',
    category: 'models',
    description: 'Machine learning model catalog'
  },
  {
    label: 'Model Management',
    icon: Settings,
    href: '/model-management',
    category: 'models',
    description: 'ML model deployment and monitoring'
  },

  // Marketplace
  {
    label: 'Marketplace',
    icon: ShoppingBag,
    href: '/marketplace',
    category: 'marketplace',
    description: 'AI solutions marketplace'
  },
  {
    label: 'Templates & Extensions',
    icon: BookOpen,
    href: '/templates',
    category: 'marketplace',
    description: 'Pre-built templates and plugins'
  },

  // Team & Users
  {
    label: 'Team',
    icon: Users,
    href: '/team',
    category: 'team',
    description: 'Team collaboration tools'
  },
  {
    label: 'User Management',
    icon: UserCheck,
    href: '/user-management',
    category: 'team',
    description: 'User access and permissions'
  },

  // Security & Compliance
  {
    label: 'Security',
    icon: Shield,
    href: '/security',
    category: 'security',
    description: 'Security monitoring and controls'
  },
  {
    label: 'Compliance & Audit',
    icon: Lock,
    href: '/compliance',
    category: 'security',
    description: 'Compliance tracking and audits'
  }
];

const categoryLabels = {
  core: 'Core Platform',
  automation: 'Automation',
  ai: 'AI & Intelligence',
  data: 'Data & Documents',
  integration: 'Integrations',
  analytics: 'Analytics & Insights',
  'data-mgmt': 'Data Management',
  models: 'AI Models',
  marketplace: 'Marketplace',
  team: 'Team & Users',
  security: 'Security & Compliance'
};

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [recentItems, setRecentItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== '/') {
      setRecentItems(prev => {
        const updated = [pathname, ...prev.filter(item => item !== pathname)].slice(0, 5);
        return updated;
      });
    }
  }, [pathname]);

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 left-0 h-full bg-gradient-to-b from-slate-950 via-purple-900 to-indigo-950 backdrop-blur-xl border-r border-purple-500/20 shadow-2xl z-40 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-500/20">
          <motion.div
            className="flex items-center gap-3"
            animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <div className="font-black text-2xl text-white tracking-tight">VECTOR</div>
                  <div className="text-xs font-bold text-purple-400 mt-1">AI Automation Platform</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-b border-purple-500/20"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-4 scrollbar-thin scrollbar-thumb-purple-500/30">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveCategory(activeCategory === category ? null : category)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-300 uppercase tracking-wider transition-colors"
                  >
                    {categoryLabels[category as keyof typeof categoryLabels]}
                    <ChevronRight
                      className={`w-3 h-3 transition-transform ${activeCategory === category ? 'rotate-90' : ''
                        }`}
                    />
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {(isCollapsed || activeCategory === category || activeCategory === null) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1"
                  >
                    {items.map((item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onHoverStart={() => setHoveredItem(item.href)}
                        onHoverEnd={() => setHoveredItem(null)}
                      >
                        <Link href={item.href}>
                          <motion.div
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 relative ${pathname === item.href
                              ? 'bg-purple-700/40 text-white shadow-lg border border-purple-500/30'
                              : 'text-slate-300 hover:bg-purple-800/30 hover:text-white'
                              }`}
                          >
                            {/* Active Indicator */}
                            {pathname === item.href && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400 rounded-r-full"
                              />
                            )}

                            <item.icon className="w-5 h-5 flex-shrink-0" />

                            <AnimatePresence>
                              {!isCollapsed && (
                                <motion.div
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: 'auto' }}
                                  exit={{ opacity: 0, width: 0 }}
                                  className="flex-1 overflow-hidden flex items-center justify-between"
                                >
                                  <span className="truncate">{item.label}</span>
                                  <div className="flex items-center gap-2">
                                    {item.isNew && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold"
                                      >
                                        NEW
                                      </motion.span>
                                    )}
                                    {item.badge && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="px-2 py-1 text-xs bg-red-500 text-white rounded-full font-bold"
                                      >
                                        {item.badge}
                                      </motion.span>
                                    )}
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-purple-500/20 space-y-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-purple-800/30 rounded-xl transition-all"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm font-medium"
                >
                  Collapse
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>

      {/* Tooltip for collapsed state */}
      <AnimatePresence>
        {isCollapsed && hoveredItem && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="fixed left-20 z-50 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm whitespace-nowrap"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            {menuItems.find(item => item.href === hoveredItem)?.label}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
