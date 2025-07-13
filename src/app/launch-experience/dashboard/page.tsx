'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  ArrowRight, ArrowLeft, CheckCircle, Sparkles, Brain, Zap,
  Target, Users, Shield, Rocket, Database, Cpu, Globe,
  BarChart3, Settings, Play, Star, Award, Clock
} from 'lucide-react';
import { useAuth } from '../../../components/auth/AuthProvider';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  features: string[];
}

export default function LaunchOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { user, setShowAuthModal, setAuthMode } = useAuth();
  const router = useRouter();

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 0,
      title: "Welcome to the Future",
      description: "Experience AI automation that thinks, learns, and evolves with your business needs.",
      icon: Rocket,
      gradient: "from-blue-500 via-purple-500 to-pink-500",
      features: ["Quantum-powered processing", "Real-time learning", "Zero-configuration setup"]
    },
    {
      id: 1,
      title: "Choose Your AI Superpowers",
      description: "Select the capabilities that matter most to your workflow transformation.",
      icon: Brain,
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      features: ["Document Intelligence", "Process Automation", "Predictive Analytics", "Multi-Agent Workflows"]
    },
    {
      id: 2,
      title: "Personalize Your Experience",
      description: "Tailor VECTOR AI to match your unique business requirements and preferences.",
      icon: Target,
      gradient: "from-green-500 via-teal-500 to-cyan-500",
      features: ["Custom Dashboards", "Role-based Access", "Integration Preferences", "Notification Settings"]
    },
    {
      id: 3,
      title: "Ready for Launch",
      description: "Your AI-powered workspace is configured and ready to transform your productivity.",
      icon: Star,
      gradient: "from-yellow-500 via-orange-500 to-red-500",
      features: ["Instant deployment", "24/7 AI assistance", "Enterprise security", "Continuous optimization"]
    }
  ];

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
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }

    setIsCompleting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push('/launch-experience/dashboard');
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
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
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
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
              <h1 className="text-2xl font-bold text-white">Launch Experience</h1>
              <span className="text-slate-400">
                {currentStep + 1} of {onboardingSteps.length}
              </span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-r ${onboardingSteps[currentStep].gradient} flex items-center justify-center`}
                >
                  {React.createElement(onboardingSteps[currentStep].icon, {
                    className: "w-10 h-10 text-white"
                  })}

                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4"
                >
                  {onboardingSteps[currentStep].title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-slate-300 max-w-2xl mx-auto"
                >
                  {onboardingSteps[currentStep].description}
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                {onboardingSteps[currentStep].features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    onClick={() => currentStep === 1 && toggleFeature(feature)}
                    className={`p-4 rounded-2xl border transition-all duration-300 ${currentStep === 1
                      ? `cursor-pointer ${selectedFeatures.includes(feature)
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-white/20 hover:border-purple-500/50'}`
                      : 'border-white/20'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      {currentStep === 1 && selectedFeatures.includes(feature) && (
                        <CheckCircle className="w-5 h-5 text-purple-400" />
                      )}
                      <span className="text-white font-medium">{feature}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-2xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  disabled={isCompleting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50"
                >
                  {isCompleting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Launching...
                    </>
                  ) : currentStep === onboardingSteps.length - 1 ? (
                    <>
                      {user ? 'Enter Dashboard' : 'Sign Up to Continue'}
                      <Rocket className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
