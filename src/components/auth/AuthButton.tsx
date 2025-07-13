'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Crown } from 'lucide-react';
import { useAuth } from './AuthProvider';

export const AuthButton: React.FC = () => {
  const { user, logout, setShowAuthModal, setAuthMode } = useAuth();

  if (user) {
    return (
      <div className="relative group">
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-slate-300 flex items-center gap-1">
              {user.role === 'premium' && <Crown className="w-3 h-3 text-yellow-400" />}
              {user.role}
            </div>
          </div>
        </motion.button>

        {/* Dropdown Menu */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          whileHover={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute right-0 top-full mt-2 w-56 bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-2xl p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-50"
        >
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <Settings className="w-4 h-4" />
            Settings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, x: 4 }}
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setAuthMode('login');
          setShowAuthModal(true);
        }}
        className="px-6 py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all duration-300"
      >
        Login
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setAuthMode('signup');
          setShowAuthModal(true);
        }}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
      >
        Get Started
      </motion.button>
    </div>
  );
};
