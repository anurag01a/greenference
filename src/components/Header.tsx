import { Leaf, Gem, Menu, Share, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GreenModeToggle } from './GreenModeToggle';

interface HeaderProps {
  greenMode: boolean;
  credits: number;
  isUnlocked: boolean;
  walletRef: React.RefObject<HTMLDivElement>;
  onToggleGreenMode: () => void;
}

export function Header({ 
  greenMode, 
  credits, 
  isUnlocked, 
  walletRef, 
  onToggleGreenMode 
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-3 py-2.5 border-b border-slate-800/60">
      {/* Left Side - Menu & Logo */}
      <div className="flex items-center gap-2">
        {/* Hamburger Menu (ChatGPT style) */}
        <button className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors">
          <Menu size={18} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <motion.div
            className={`w-7 h-7 rounded-lg flex items-center justify-center ${
              greenMode ? 'bg-emerald-500/15' : 'bg-orange-500/15'
            }`}
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            <Leaf 
              size={16} 
              className={greenMode ? 'text-emerald-400' : 'text-orange-400'} 
            />
          </motion.div>
          <span className="font-semibold text-slate-100 text-sm">
            Greenference
          </span>
        </div>
      </div>

      {/* Center - Wallet Badge */}
      <motion.div
        ref={walletRef as React.RefObject<HTMLDivElement>}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
          isUnlocked 
            ? 'bg-gradient-to-r from-amber-500/15 to-emerald-500/15 border border-amber-400/25' 
            : 'bg-slate-800/60 border border-slate-700/40'
        }`}
        animate={isUnlocked ? {
          boxShadow: [
            '0 0 0px rgba(251, 191, 36, 0)',
            '0 0 15px rgba(251, 191, 36, 0.3)',
            '0 0 0px rgba(251, 191, 36, 0)',
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Gem size={12} className={isUnlocked ? 'text-amber-400' : 'text-slate-500'} />
        <AnimatePresence mode="wait">
          <motion.span
            key={credits}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={isUnlocked ? 'text-amber-300' : 'text-slate-400'}
          >
            {credits}/10
          </motion.span>
        </AnimatePresence>
        {isUnlocked && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px]"
          >
            🔓
          </motion.span>
        )}
      </motion.div>

      {/* Right Side - Toggle & Actions */}
      <div className="flex items-center gap-1">
        {/* Green Mode Toggle */}
        <GreenModeToggle 
          enabled={greenMode} 
          onToggle={onToggleGreenMode} 
        />

        {/* Share Button (ChatGPT style) */}
        <button className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors">
          <Share size={16} />
        </button>

        {/* More Options */}
        <button className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </header>
  );
}
