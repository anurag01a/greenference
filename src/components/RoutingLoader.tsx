import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Brain, ToggleRight, Zap, Server, Check, Loader2, Leaf, Lightbulb } from 'lucide-react';
import { RoutingStep } from '../types';

interface RoutingLoaderProps {
  steps: RoutingStep[];
  greenMode: boolean;
}

const iconMap = {
  location: MapPin,
  brain: Brain,
  toggle: ToggleRight,
  grid: Zap,
  server: Server,
};

export function RoutingLoader({ steps, greenMode }: RoutingLoaderProps) {
  // Check if any step has an efficiency nudge
  const hasEfficiencyNudge = steps.some(s => s.text.includes('EFFICIENCY'));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4"
    >
      {/* AI Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        greenMode ? 'bg-emerald-500/15' : 'bg-orange-500/15'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={16} className={greenMode ? 'text-emerald-400' : 'text-orange-400'} />
        </motion.div>
      </div>

      {/* Loader Content */}
      <div className="flex-1 max-w-lg">
        <span className={`text-xs font-medium mb-2 block ${greenMode ? 'text-emerald-400' : 'text-orange-400'}`}>
          Greenference
        </span>

        <div className={`rounded-xl p-4 border backdrop-blur-sm ${
          greenMode 
            ? 'bg-emerald-950/30 border-emerald-500/20' 
            : 'bg-orange-950/30 border-orange-500/20'
        }`}>
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-white/10">
            <Leaf size={14} className={greenMode ? 'text-emerald-400' : 'text-orange-400'} />
            <span className={`font-mono text-xs font-semibold tracking-wider ${greenMode ? 'text-emerald-400' : 'text-orange-400'}`}>
              {greenMode ? 'GREEN ROUTING PROTOCOL' : 'PERFORMANCE ROUTING'}
            </span>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {steps.map((step, index) => {
                const Icon = step.text.includes('EFFICIENCY') ? Lightbulb : iconMap[step.icon];
                const isActive = step.status === 'active';
                const isComplete = step.status === 'complete';
                const isPending = step.status === 'pending';

                // Determine color based on highlight
                const getHighlightColor = () => {
                  if (step.highlight === 'green') return 'emerald';
                  if (step.highlight === 'amber') return 'orange';
                  return greenMode ? 'emerald' : 'orange';
                };
                const highlightColor = getHighlightColor();

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                    className="space-y-1"
                  >
                    <div className="flex items-center gap-3">
                      {/* Step Icon */}
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                        isActive 
                          ? `bg-${highlightColor}-500/25` 
                          : isComplete 
                            ? 'bg-white/10' 
                            : 'bg-white/5'
                      }`}
                      style={isActive ? {
                        boxShadow: step.highlight === 'green' 
                          ? '0 0 15px rgba(16, 185, 129, 0.4)'
                          : step.highlight === 'amber'
                            ? '0 0 15px rgba(249, 115, 22, 0.4)'
                            : greenMode 
                              ? '0 0 15px rgba(16, 185, 129, 0.4)'
                              : '0 0 15px rgba(249, 115, 22, 0.4)'
                      } : {}}
                      >
                        {isComplete ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <Check size={14} className={
                              step.highlight === 'green' ? 'text-emerald-400' :
                              step.highlight === 'amber' ? 'text-orange-400' :
                              greenMode ? 'text-emerald-400' : 'text-orange-400'
                            } />
                          </motion.div>
                        ) : isActive ? (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >
                            <Icon size={14} className={
                              step.highlight === 'green' ? 'text-emerald-400' :
                              step.highlight === 'amber' ? 'text-orange-400' :
                              greenMode ? 'text-emerald-400' : 'text-orange-400'
                            } />
                          </motion.div>
                        ) : (
                          <Icon size={14} className="text-gray-600" />
                        )}
                      </div>

                      {/* Step Text */}
                      <div className="flex-1">
                        <span className={`font-mono text-xs font-medium block ${
                          isActive 
                            ? step.highlight === 'green' ? 'text-emerald-300' :
                              step.highlight === 'amber' ? 'text-orange-300' :
                              greenMode ? 'text-emerald-300' : 'text-orange-300'
                            : isComplete 
                              ? 'text-gray-300' 
                              : 'text-gray-600'
                        }`}>
                          {step.text}
                        </span>
                        {step.subtext && (isActive || isComplete) && (
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`font-mono text-[10px] block mt-0.5 ${
                              isActive 
                                ? step.highlight === 'green' ? 'text-emerald-400/70' :
                                  step.highlight === 'amber' ? 'text-orange-400/70' :
                                  greenMode ? 'text-emerald-400/70' : 'text-orange-400/70'
                                : 'text-gray-500'
                            }`}
                          >
                            {step.subtext}
                          </motion.span>
                        )}
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <div className="flex gap-0.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                step.highlight === 'green' ? 'bg-emerald-400' :
                                step.highlight === 'amber' ? 'bg-orange-400' :
                                greenMode ? 'bg-emerald-400' : 'bg-orange-400'
                              }`}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={greenMode ? 'bg-emerald-500' : 'bg-orange-500'}
              style={{ height: '100%' }}
              initial={{ width: '0%' }}
              animate={{ 
                width: `${((steps.filter(s => s.status === 'complete').length + 
                  (steps.some(s => s.status === 'active') ? 0.5 : 0)) / steps.length) * 100}%` 
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Mode Badge */}
          <div className={`mt-3 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[10px] font-medium ${
            greenMode 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
              : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
          }`}>
            {greenMode ? (
              <>
                <Leaf size={11} />
                <span>SUSTAINABLE ROUTING • RENEWABLE ENERGY</span>
              </>
            ) : (
              <>
                <Zap size={11} />
                <span>PERFORMANCE ROUTING • LOW LATENCY</span>
              </>
            )}
          </div>

          {/* Efficiency Nudge Banner */}
          {hasEfficiencyNudge && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-2 flex items-center gap-2 py-2 px-3 rounded-lg text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20"
            >
              <Lightbulb size={11} />
              <span>TIP: Switch to an SLM for simple queries to save 90% compute energy</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
