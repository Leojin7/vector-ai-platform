'use client';
import { motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';

export default function Topbar() {
  return (
    <motion.header
      className="h-16 flex items-center justify-between px-10 border-b border-card bg-background/80 sticky top-0 z-10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Vector Logo" className="w-6 h-6" />
        <span className="font-bold text-lg text-white">VECTOR</span>
      </div>
      <nav className="hidden md:flex gap-8 text-base font-medium">
        <a href="/dashboard" className="hover:text-accent transition">Dashboard</a>
        <a href="/models" className="hover:text-accent transition">Models</a>
        <a href="/workflows" className="hover:text-accent transition">Workflows</a>
        <a href="/templates" className="hover:text-accent transition">Templates</a>
        <a href="/docs" className="hover:text-accent transition">Docs</a>
        <a href="/community" className="hover:text-accent transition">Community</a>
        <a href="/api-keys" className="hover:text-accent transition">API Keys</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="bg-accent px-4 py-2 rounded-full text-white font-semibold shadow hover:bg-accent2 transition hidden md:block">
          New workflow
        </button>
        <ThemeToggle />
        <img src="/avatar.png" alt="User" className="w-8 h-8 rounded-full border-2 border-accent" />
      </div>
    </motion.header>
  );
}
