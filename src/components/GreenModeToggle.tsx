import { motion } from 'framer-motion';
import { Leaf, Zap } from 'lucide-react';

interface GreenModeToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export function GreenModeToggle({ enabled, onToggle }: GreenModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-[#2a2a2a] transition-colors"
      aria-label={enabled ? 'Disable Green Mode' : 'Enable Green Mode'}
    >
      <span className="text-xs text-gray-400">
        {enabled ? 'Green' : 'Fast'}
      </span>

      {/* Toggle Track */}
      <motion.div
        className="relative w-10 h-5 rounded-full cursor-pointer"
        animate={{
          backgroundColor: enabled ? 'rgb(16, 185, 129)' : 'rgb(249, 115, 22)',
        }}
        transition={{ duration: 0.2 }}
        style={{
          boxShadow: enabled 
            ? '0 0 10px rgba(16, 185, 129, 0.3)' 
            : '0 0 10px rgba(249, 115, 22, 0.3)',
        }}
      >
        {/* Thumb */}
        <motion.div
          className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
          animate={{
            left: enabled ? 22 : 2,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        >
          <motion.div
            animate={{ rotate: enabled ? 0 : 180 }}
            transition={{ duration: 0.2 }}
          >
            {enabled ? (
              <Leaf size={10} className="text-emerald-600" />
            ) : (
              <Zap size={10} className="text-orange-600" />
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </button>
  );
}
