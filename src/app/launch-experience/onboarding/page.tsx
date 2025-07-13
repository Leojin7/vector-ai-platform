'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  ArrowRight, ArrowLeft, CheckCircle, Sparkles, Brain, Zap,
  Target, Users, Shield, Rocket, Database, Cpu, Globe,
  BarChart3, Settings, Play, Star, Award, Clock, Home, Pause, X
} from 'lucide-react';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: string[];
  autoAdvanceDelay: number;
}

export default function LaunchOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isAutoMode, setIsAutoMode] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 0,
      title: "Welcome to the Future",
      description: "Experience AI automation that thinks, learns, and evolves with your business needs.",
      icon: Rocket,
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      features: ["Quantum-powered processing", "Real-time learning", "Zero-configuration setup"],
      autoAdvanceDelay: 3000
    },
    {
      id: 1,
      title: "Choose Your AI Superpowers",
      description: "We've pre-selected the most popular capabilities for you. You can customize these later.",
      icon: Brain,
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      features: ["Document Intelligence", "Process Automation", "Predictive Analytics", "Multi-Agent Workflows"],
      autoAdvanceDelay: 4000
    },
    {
      id: 2,
      title: "Personalize Your Experience",
      description: "Your workspace is being configured with intelligent defaults based on industry best practices.",
      icon: Target,
      gradient: "from-green-500 via-teal-500 to-cyan-500",
      features: ["Smart Dashboards", "Adaptive Interface", "Intelligent Notifications", "Predictive Workflows"],
      autoAdvanceDelay: 3500
    },
    {
      id: 3,
      title: "Ready for Launch",
      description: "Your AI-powered workspace is configured and ready to transform your productivity.",
      icon: Star,
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      features: ["Instant deployment", "24/7 AI assistance", "Enterprise security", "Continuous optimization"],
      autoAdvanceDelay: 2500
    }
  ];

  // Check if we're in auto mode from URL params
  useEffect(() => {
    const autoParam = searchParams.get('auto');
    if (autoParam === 'true') {
      setIsAutoMode(true);
      // Auto-select all features for smooth experience
      setSelectedFeatures(onboardingSteps[1].features);
    }
  }, [searchParams]);

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoMode || isPaused || isCompleting) return;

    const currentStepData = onboardingSteps[currentStep];
    let timeLeft = currentStepData.autoAdvanceDelay / 1000;
    setCountdown(timeLeft);

    const countdownInterval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
    }, 1000);

    const advanceTimer = setTimeout(() => {
      if (currentStep < onboardingSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleComplete();
      }
    }, currentStepData.autoAdvanceDelay);

    return () => {
      clearTimeout(advanceTimer);
      clearInterval(countdownInterval);
    };
  }, [currentStep, isAutoMode, isPaused, isCompleting]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);

    // Show completion animation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Navigate to dashboard
    router.push('/launch-experience/dashboard');
  };

  const toggleFeature = (feature: string) => {
    if (!isAutoMode) {
      setSelectedFeatures(prev =>
        prev.includes(feature)
          ? prev.filter(f => f !== feature)
          : [...prev, feature]
      );
    }
  };

  // Fixed: Extract current step data properly
  const getCurrentStep = () => onboardingSteps[currentStep];
  const currentStepData = getCurrentStep();
  const CurrentStepIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Navigation Header */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 right-0 z-20 p-6"
      >
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </motion.button>

          {isAutoMode && (
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                {isPaused ? 'Resume' : 'Pause'}
              </motion.button>

              <div className="text-white text-sm">
                Auto-advancing in {countdown}s
              </div>
            </div>
          )}

          <div className="text-white text-sm">
            VECTOR AI Launch Experience
          </div>
        </div>
      </motion.nav>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8 pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl w-full"
        >
          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">
                {isAutoMode ? 'Automated Setup' : 'Launch Experience'}
              </h1>
              <span className="text-slate-400">
                Step {currentStep + 1} of {onboardingSteps.length}
              </span>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full relative"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {isAutoMode && !isPaused && (
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    animate={{ x: ['0%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
            </div>

            {/* Step Dots */}
            <div className="flex justify-between mt-4">
              {onboardingSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index <= currentStep
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                    : 'bg-slate-600'
                    }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Auto-advance countdown */}
            {isAutoMode && !isPaused && !isCompleting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 text-sm">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                  Automatically advancing in {countdown} seconds
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: -15 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${currentStepData.gradient} flex items-center justify-center shadow-2xl`}
                >
                  {/* Fixed: Use extracted component variable */}
                  <CurrentStepIcon className="w-12 h-12 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
                >
                  {currentStepData.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
                >
                  {currentStepData.description}
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                {currentStepData.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 150
                    }}
                    onClick={() => toggleFeature(feature)}
                    className={`group p-6 rounded-2xl border transition-all duration-300 ${isAutoMode
                      ? 'border-purple-500/50 bg-purple-500/10'
                      : currentStep === 1
                        ? `cursor-pointer transform hover:scale-105 ${selectedFeatures.includes(feature)
                          ? 'border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20'
                          : 'border-white/20 hover:border-purple-500/50 hover:bg-white/5'}`
                        : 'border-white/20 hover:bg-white/5'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        animate={{
                          scale: (isAutoMode || selectedFeatures.includes(feature)) ? 1 : 0,
                          rotate: (isAutoMode || selectedFeatures.includes(feature)) ? 0 : 180
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="w-6 h-6 text-purple-400" />
                      </motion.div>
                      <div className="flex-1">
                        <span className="text-white font-medium text-lg group-hover:text-purple-200 transition-colors">
                          {feature}
                        </span>
                        {isAutoMode && (
                          <div className="text-purple-300 text-sm mt-1">
                            ✓ Auto-configured
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Selection Counter for Step 1 */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center mb-6"
                >
                  <div className="text-slate-300 text-sm">
                    {selectedFeatures.length > 0
                      ? `${selectedFeatures.length} feature${selectedFeatures.length !== 1 ? 's' : ''} selected`
                      : 'Select features that interest you (optional)'
                    }
                  </div>
                </motion.div>
              )}

              {/* Navigation */}
              {!isAutoMode && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex items-center justify-between"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    disabled={isCompleting}
                    className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 shadow-lg"
                  >
                    {isCompleting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Launching...</span>
                      </>
                    ) : currentStep === onboardingSteps.length - 1 ? (
                      <>
                        <span>Enter Dashboard</span>
                        <Rocket className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        <span>Next</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Completion Modal */}
      <AnimatePresence>
        {isCompleting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full mx-4 text-center"
            >
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-4">Setup Complete!</h3>
              <p className="text-slate-300 mb-6">Redirecting to your AI dashboard...</p>

              <motion.div
                className="w-full bg-slate-700 rounded-full h-2"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
