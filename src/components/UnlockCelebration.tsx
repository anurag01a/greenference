import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Rocket, X } from 'lucide-react';

interface UnlockCelebrationProps {
  isVisible: boolean;
  onClose: () => void;
}

export function UnlockCelebration({ isVisible, onClose }: UnlockCelebrationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-[#1a1a1a] rounded-2xl p-8 mx-4 text-center border border-[#2a2a2a] shadow-2xl max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-500 hover:text-white"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(251, 191, 36, 0.2)',
                  '0 0 40px rgba(251, 191, 36, 0.4)',
                  '0 0 20px rgba(251, 191, 36, 0.2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="text-amber-400" size={40} />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white mb-3"
            >
              Deep Research Unlocked!
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mb-6 max-w-sm mx-auto"
            >
              You've earned 10 green credits! Advanced reasoning and multi-step analysis are now available.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 mb-6"
            >
              {['Multi-step Analysis', 'Deep Reasoning', 'Priority Routing'].map((feature) => (
                <span 
                  key={feature}
                  className="px-3 py-1.5 text-sm rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                >
                  <Sparkles size={12} className="inline mr-1.5" />
                  {feature}
                </span>
              ))}
            </motion.div>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Start Researching
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
