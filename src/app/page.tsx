'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, Variants } from 'framer-motion';
import {
  Plus, ArrowRight, Sparkles, Zap, Play, TrendingUp, Activity, Shield,
  Brain, Workflow, Users, Star, CheckCircle, Clock, BarChart3, MessageSquare,
  Database, Cpu, Globe, Lock, Headphones, MousePointer, Layers,
  Lightbulb, Target, Rocket, Award, Code, Settings,
  ChevronDown, Eye, Heart, Briefcase, Palette, Smartphone
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
//import T<Topopbar from '../components/layout/Topbar';

// Enhanced interfaces with proper TypeScript definitions
interface StatType {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  gradient: string;
  delay: number;
}

interface ActivityType {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  time: string;
  type: 'success' | 'warning' | 'info';
  user: string;
  progress: number;
}

interface CapabilityType {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  stats: Record<string, string | number>;
}

// Custom hook for cursor tracking with proper typing
const useCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};

// Enhanced floating orb component with proper props interface
interface FloatingOrbProps {
  size: number;
  color: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({ size, color, delay, duration, x, y }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-20 ${color}`}
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
    }}
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -100, 50, 0],
      scale: [1, 1.2, 0.8, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Enhanced particle system component
const ParticleField: React.FC = () => {
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};


export default function HomePage() {
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mousePosition = useCursor();

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Enhanced scroll-based transforms with proper typing
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Enhanced spring physics configuration
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    }, 1000);

    setIsLoaded(true);
    return () => clearInterval(timer);
  }, []);

  // Properly typed animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 1,
      },
    },
  };

  // Fixed floating animation variants
  const floatingVariants: Variants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [-20, 20, -20],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  // Enhanced dashboard statistics with proper typing
  const stats: StatType[] = [
    {
      label: 'Active Workflows',
      value: '2,847',
      change: '+24%',
      icon: Workflow,
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      gradient: 'bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-teal-500/10',
      delay: 0.1
    },
    {
      label: 'AI Agents',
      value: '156',
      change: '+18%',
      icon: Brain,
      color: 'from-purple-500 via-violet-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/10 via-violet-500/5 to-pink-500/10',
      delay: 0.2
    },
    {
      label: 'Documents Processed',
      value: '2.8M',
      change: '+67%',
      icon: BarChart3,
      color: 'from-amber-500 via-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10',
      delay: 0.3
    },
    {
      label: 'System Uptime',
      value: '99.98%',
      change: '+0.3%',
      icon: Shield,
      color: 'from-emerald-500 via-green-500 to-lime-500',
      gradient: 'bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-lime-500/10',
      delay: 0.4
    },
  ];

  // Enhanced recent activities with proper typing
  const activities: ActivityType[] = [
    {
      icon: CheckCircle,
      title: "Advanced Invoice Processing",
      desc: "AI Agent successfully processed 3,247 invoices with 99.9% accuracy",
      time: '2 minutes ago',
      type: 'success',
      user: 'VECTOR AI Pro',
      progress: 100
    },
    {
      icon: Brain,
      title: "Neural Network Training",
      desc: "Document classification model updated with improved accuracy",
      time: '15 minutes ago',
      type: 'info',
      user: 'Deep Learning Engine',
      progress: 85
    },
    {
      icon: Users,
      title: "Team Expansion",
      desc: "5 new enterprise clients onboarded successfully",
      time: '1 hour ago',
      type: 'info',
      user: 'Growth Team',
      progress: 100
    },
    {
      icon: Zap,
      title: "API Integration Complete",
      desc: "Multi-cloud connector deployed across 15 regions",
      time: '2 hours ago',
      type: 'success',
      user: 'Infrastructure AI',
      progress: 100
    },
    {
      icon: Target,
      title: "Performance Optimization",
      desc: "Email automation improved by 89% efficiency gain",
      time: '4 hours ago',
      type: 'success',
      user: 'Optimization Engine',
      progress: 95
    },
  ];

  // Enhanced capabilities with proper typing
  const capabilities: CapabilityType[] = [
    {
      icon: Brain,
      title: "Quantum AI Processing",
      description: "Next-gen neural networks with 99.97% accuracy across all document types",
      features: ["OCR & Handwriting", "Voice Recognition", "3D Image Analysis", "Quantum Computing"],
      gradient: "from-purple-500 via-violet-600 to-indigo-500",
      stats: { accuracy: 99.97, speed: "2.3ms", efficiency: "+340%" }
    },
    {
      icon: Workflow,
      title: "Adaptive Orchestration",
      description: "Self-healing workflows that adapt and optimize in real-time",
      features: ["Drag & Drop", "Real-time Testing", "Auto-scaling", "Smart Routing"],
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      stats: { uptime: "99.99%", throughput: "50K/min", latency: "1.2ms" }
    },
    {
      icon: Database,
      title: "Contextual Memory AI",
      description: "Advanced vector databases with persistent learning capabilities",
      features: ["Vector Storage", "Adaptive Learning", "Smart Predictions", "Context Awareness"],
      gradient: "from-emerald-500 via-green-500 to-lime-500",
      stats: { capacity: "100TB", recall: "99.8%", learning: "Real-time" }
    },
    {
      icon: Shield,
      title: "Quantum Security",
      description: "Military-grade encryption with zero-trust architecture",
      features: ["Quantum Encryption", "GDPR Compliant", "Audit Trails", "Biometric Auth"],
      gradient: "from-orange-500 via-red-500 to-pink-500",
      stats: { encryption: "256-bit", compliance: "100%", threats: "0 breaches" }
    }
  ];

  // Enhanced loading state - Dark theme only
  if (!isLoaded) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center bg-slate-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </motion.div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-slate-900">
      {/* Enhanced Background with Particle System - FIXED: Pure Dark Theme */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        {/* FIXED: Pure Dark Purple Gradient Background - No Light Colors */}
        <div className="absolute inset-0 bg-slate-900" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" />

        {/* Floating Orbs with Organic Movement */}
        <FloatingOrb size={400} color="bg-gradient-to-r from-blue-400/15 to-purple-400/15" delay={0} duration={20} x="10%" y="20%" />
        <FloatingOrb size={300} color="bg-gradient-to-r from-purple-400/10 to-pink-400/10" delay={5} duration={25} x="70%" y="60%" />
        <FloatingOrb size={200} color="bg-gradient-to-r from-cyan-400/8 to-blue-400/8" delay={10} duration={30} x="40%" y="80%" />

        {/* Particle Field */}
        <ParticleField />

        {/* Interactive Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px),
              linear-gradient(180deg, rgba(99,102,241,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: [`0px 0px`, `50px 50px`],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>

      {/* Custom Cursor Effect */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <div className="w-full h-full bg-white rounded-full opacity-80" />
      </motion.div>

      <Sidebar />


      <main className="ml-80 pt-20 relative z-10 bg-transparent">
        {/* Enhanced Hero Section with 3D Effects - FIXED: Dark Theme Only */}
        <motion.section
          className="px-8 py-16 min-h-screen flex items-center bg-transparent"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                {/* Floating Badge */}
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-gray-800/30 border border-gray-700/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-purple-500" />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-200">Introducing VECTOR 3.0 AI</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                </motion.div>

                {/* Hero Title with Enhanced Typography */}
                <motion.div variants={itemVariants} className="space-y-4">
                  <motion.h1
                    className="text-7xl lg:text-8xl font-black leading-tight"
                    style={{ perspective: '1000px' }}
                  >
                    <motion.span
                      className="block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                      whileHover={{ rotateX: 5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Transform
                    </motion.span>
                    <motion.span
                      className="block text-white"
                      whileHover={{ rotateX: -5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      Your Reality
                    </motion.span>
                    <motion.span
                      className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent"
                      whileHover={{ rotateX: 5, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      With AI
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="text-2xl lg:text-3xl text-slate-300 leading-relaxed max-w-2xl"
                    variants={itemVariants}
                  >
                    Experience the future of automation with quantum-powered AI that thinks,
                    learns, and evolves beyond human imagination.
                  </motion.p>
                </motion.div>

                {/* Enhanced CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <motion.button
                    className="group relative px-8 py-4 overflow-hidden rounded-2xl font-semibold text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="relative flex items-center gap-3">
                      <Rocket className="w-5 h-5" />
                      <span>Launch Experience</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>

                  <motion.button
                    className="group flex items-center gap-3 px-8 py-4 backdrop-blur-xl bg-gray-800/30 border border-gray-700/50 text-slate-300 font-semibold rounded-2xl"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Watch Demo</span>
                  </motion.button>
                </motion.div>

                {/* Real-time Stats */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-3 gap-8 pt-8"
                >
                  {[
                    { label: 'AI Operations', value: '2.8M+', icon: Activity },
                    { label: 'Time Saved', value: '50K hrs', icon: Clock },
                    { label: 'Success Rate', value: '99.98%', icon: Award },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                    >
                      <div className="flex items-center justify-center mb-2">
                        <stat.icon className="w-6 h-6 text-purple-500 mr-2" />
                        <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-sm text-slate-400">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Right Content - Interactive 3D Dashboard */}
              <motion.div
                variants={itemVariants}
                className="relative"
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  variants={floatingVariants}
                  initial="initial"
                  animate="animate"
                  className="relative z-10"
                  whileHover={{ rotateY: 5, rotateX: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="backdrop-blur-2xl bg-gray-800/20 border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                    {/* Live Dashboard Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-3 h-3 bg-green-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-sm font-medium text-gray-200">AI System Active</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Real-time</div>
                        <div className="text-xl font-mono font-bold text-purple-400">
                          {currentTime || '--:--:--'}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Progress Bars */}
                    <div className="space-y-6">
                      {[
                        { name: 'Neural Processing', progress: 94, color: 'from-blue-500 to-cyan-500', speed: '2.3ms' },
                        { name: 'Quantum Analysis', progress: 87, color: 'from-purple-500 to-pink-500', speed: '1.8ms' },
                        { name: 'Memory Synthesis', progress: 76, color: 'from-green-500 to-emerald-500', speed: '3.1ms' },
                      ].map((task, index) => (
                        <motion.div
                          key={task.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.5 + index * 0.2 }}
                          className="space-y-3"
                        >
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium text-gray-200">{task.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400">{task.speed}</span>
                              <span className="font-mono text-gray-200">{task.progress}%</span>
                            </div>
                          </div>
                          <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${task.color} relative`}
                              initial={{ width: 0 }}
                              animate={{ width: `${task.progress}%` }}
                              transition={{
                                delay: 2 + index * 0.2,
                                duration: 1.5,
                                ease: "easeOut"
                              }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-white/30"
                                animate={{ x: ['0%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                              />
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Mini Performance Chart */}
                    <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl">
                      <div className="text-sm font-medium mb-3 text-gray-200">Performance Metrics</div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-slate-400">Throughput</div>
                          <div className="text-lg font-bold text-green-500">47.2K/min</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Accuracy</div>
                          <div className="text-lg font-bold text-blue-500">99.97%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced Stats Section with Scroll Animations - FIXED: Dark Theme Only */}
        <motion.section className="px-8 py-20 bg-transparent">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                Real-time
              </span>{' '}
              <span className="text-white">Intelligence</span>
            </motion.h2>
            <motion.p
              className="text-xl text-slate-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Monitor your AI ecosystem with quantum precision and unprecedented clarity
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -12, scale: 1.03, rotateY: 5 }}
                className="group relative cursor-pointer"
                style={{ perspective: '1000px' }}
                transition={{ delay: stat.delay }}
              >
                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 ${stat.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-75 transition-opacity duration-500`}
                  whileHover={{ scale: 1.1 }}
                />

                <div className="relative backdrop-blur-2xl bg-gray-800/20 border border-gray-700/50 hover:border-gray-600/70 rounded-3xl p-8 transition-all duration-500 shadow-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg`}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <stat.icon className="w-7 h-7" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                      className="flex items-center gap-2 text-emerald-500 text-sm font-medium px-3 py-1 bg-emerald-500/10 rounded-full"
                    >
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="text-4xl lg:text-5xl font-black text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300"
                  >
                    {stat.value}
                  </motion.div>

                  <div className="text-slate-400 font-medium text-lg">
                    {stat.label}
                  </div>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-3xl"
                    whileHover={{ scaleX: 1.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Enhanced Main Content Grid with Advanced Animations - FIXED: Dark Theme Only */}
        <section className="px-8 py-20 bg-transparent">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Enhanced Capabilities Showcase */}
            <div className="xl:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="backdrop-blur-2xl bg-gray-800/20 border border-gray-700/50 rounded-3xl p-10 shadow-2xl"
              >
                <div className="flex items-center gap-4 mb-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-8 h-8 text-purple-500" />
                  </motion.div>
                  <h2 className="text-3xl font-bold text-white">
                    Quantum Capabilities
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {capabilities.map((capability, index) => (
                    <motion.div
                      key={capability.title}
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      className="backdrop-blur-xl bg-gray-800/30 border border-gray-700/40 hover:border-gray-600/60 rounded-2xl p-6 transition-all duration-300 group cursor-pointer shadow-xl"
                      style={{ perspective: '1000px' }}
                    >
                      <motion.div
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${capability.gradient} text-white mb-4 shadow-lg`}
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <capability.icon className="w-6 h-6" />
                      </motion.div>

                      <h3 className="text-xl font-semibold text-white mb-3">
                        {capability.title}
                      </h3>
                      <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                        {capability.description}
                      </p>

                      {/* Enhanced Features List */}
                      <div className="space-y-2 mb-4">
                        {capability.features.map((feature, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-3 text-xs text-slate-400"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                          >
                            <motion.div
                              className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              whileHover={{ scale: 1.5 }}
                            />
                            {feature}
                          </motion.div>
                        ))}
                      </div>

                      {/* Performance Stats */}
                      <div className="grid grid-cols-3 gap-2 text-xs border-t border-gray-700/30 pt-4">
                        {Object.entries(capability.stats).map(([key, value], idx) => (
                          <div key={key} className="text-center">
                            <div className="font-bold text-purple-400">{value}</div>
                            <div className="capitalize text-slate-400">{key}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Recent Activity - FIXED: Dark Theme Only */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="backdrop-blur-2xl bg-gray-800/20 border border-gray-700/50 rounded-3xl p-8 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-white">
                    Live Activity
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="text-purple-500 hover:text-purple-400 text-sm font-medium flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View All
                  </motion.button>
                </div>

                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      whileHover={{ x: 6, scale: 1.02 }}
                      className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-800/30 transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-700/40"
                    >
                      <motion.div
                        whileHover={{ scale: 1.3, rotate: 15 }}
                        className={`p-3 rounded-xl flex-shrink-0 ${activity.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' :
                          activity.type === 'warning' ? 'bg-amber-500/20 text-amber-500' :
                            'bg-purple-500/20 text-purple-500'
                          }`}
                      >
                        <activity.icon className="w-5 h-5" />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-purple-400 transition-colors mb-1">
                          {activity.title}
                        </p>
                        <p className="text-xs text-slate-400 mb-2 leading-relaxed">
                          {activity.desc}
                        </p>

                        {/* Progress Bar for Active Tasks */}
                        {activity.progress < 100 && (
                          <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-2">
                            <motion.div
                              className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${activity.progress}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{activity.time}</span>
                          </div>
                          <span className="font-medium">{activity.user}</span>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-2"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced AI Insights Banner with 3D Effects - FIXED: Dark Theme Only */}
        <motion.section
          className="px-8 py-20 bg-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02, rotateX: 2 }}
            className="backdrop-blur-2xl bg-gray-800/20 border border-purple-500/50 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
            style={{ perspective: '1000px' }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage: `
                  radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
                  radial-gradient(circle at 40% 40%, rgba(120, 200, 255, 0.2) 0%, transparent 50%)
                `,
              }}
            />

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div
                  className="p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl text-white shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                      '0 0 40px rgba(168, 85, 247, 0.8)',
                      '0 0 20px rgba(168, 85, 247, 0.5)',
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity },
                    hover: { type: "spring", stiffness: 400 }
                  }}
                >
                  <Brain className="w-10 h-10" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Quantum AI Optimization Engine
                  </h3>
                  <p className="text-slate-300 text-lg max-w-2xl">
                    Our advanced AI has identified 12 critical optimizations that could revolutionize
                    your workflow efficiency by 340% and save 47.2 hours daily across your organization.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <div className="relative flex items-center gap-3">
                  <Lightbulb className="w-5 h-5" />
                  <span>Explore Insights</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        {/* Enhanced Footer with Scroll Progress - FIXED: Dark Theme Only */}
        <motion.footer
          className="px-8 py-16 text-center relative bg-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Scroll Progress Indicator */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
            style={{ scaleX: smoothProgress, transformOrigin: '0%' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-slate-400 text-lg">
              &copy; {new Date().getFullYear()} VECTOR AI. All rights reserved.
            </p>
            <p className="text-sm text-slate-500">
              Built with ❤️ and quantum computing for the future of intelligent automation
            </p>

            {/* Social Links */}
            <motion.div
              className="flex justify-center gap-6 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[Globe, Heart, Briefcase, Code, Palette].map((Icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full backdrop-blur-xl bg-gray-800/30 border border-gray-700/40 text-slate-400 hover:text-purple-400 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.footer>
      </main>
    </div>
  );
}
