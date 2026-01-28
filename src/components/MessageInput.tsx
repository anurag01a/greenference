import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Plus, 
  Mic,
  Image,
  Globe,
  Lightbulb,
  Sparkles,
  Code,
  MoreHorizontal,
  X
} from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  greenMode: boolean;
  isUnlocked: boolean;
  selectedModel: string;
  onSelectModel: (model: string) => void;
}

export function MessageInput({ onSend, disabled, greenMode, isUnlocked }: MessageInputProps) {
  const [input, setInput] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const plusMenuRef = useRef<HTMLDivElement>(null);

  // Auto-focus input
  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (plusMenuRef.current && !plusMenuRef.current.contains(e.target as Node)) {
        setShowPlusMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const plusMenuItems = [
    { icon: Image, label: 'Add photos & files', shortcut: null },
    { icon: Sparkles, label: 'Create image', shortcut: null },
    { divider: true },
    { icon: Lightbulb, label: 'Thinking', shortcut: null, badge: 'Beta' },
    { icon: Globe, label: 'Deep research', shortcut: null, badge: isUnlocked ? null : 'Locked' },
    { icon: Code, label: 'Canvas', shortcut: null },
    { divider: true },
    { icon: MoreHorizontal, label: 'More', hasArrow: true },
  ];

  return (
    <div className="px-4 pb-4 pt-2 bg-[#0d0d0d]">
      <div className="max-w-3xl mx-auto">
        {/* Main Input Container - ChatGPT style */}
        <div className={`relative bg-[#1a1a1a] rounded-2xl border transition-all duration-200 ${
          disabled 
            ? 'border-[#2a2a2a]' 
            : 'border-[#2a2a2a] hover:border-[#3a3a3a] focus-within:border-[#4a4a4a]'
        }`}>
          
          {/* Textarea */}
          <div className="px-4 py-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder={disabled ? "Routing your query..." : "Ask anything"}
              rows={1}
              className="w-full bg-transparent text-white text-base placeholder-gray-500 resize-none outline-none min-h-[24px] max-h-[200px]"
            />
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between px-3 pb-3">
            {/* Left Side - Plus Menu */}
            <div className="flex items-center gap-1" ref={plusMenuRef}>
              <div className="relative">
                <button
                  onClick={() => setShowPlusMenu(!showPlusMenu)}
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    showPlusMenu 
                      ? 'bg-[#2a2a2a] text-white' 
                      : 'hover:bg-[#2a2a2a] text-gray-400 hover:text-white'
                  }`}
                >
                  {showPlusMenu ? <X size={20} /> : <Plus size={20} />}
                </button>

                {/* Plus Menu Dropdown - ChatGPT style */}
                <AnimatePresence>
                  {showPlusMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full left-0 mb-2 w-56 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-1.5">
                        {plusMenuItems.map((item, index) => {
                          if ('divider' in item && item.divider) {
                            return <div key={`divider-${index}`} className="my-1 border-t border-[#2a2a2a]" />;
                          }
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.label}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left"
                            >
                              {Icon && <Icon size={18} className="text-gray-400" />}
                              <span className="flex-1 text-sm text-gray-200">{item.label}</span>
                              {item.badge && (
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  item.badge === 'Locked' 
                                    ? 'bg-gray-700 text-gray-400' 
                                    : 'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                              {item.hasArrow && (
                                <span className="text-gray-500">›</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1">
              {/* Voice Button */}
              <button className="w-9 h-9 rounded-lg hover:bg-[#2a2a2a] flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Mic size={20} />
              </button>

              {/* Send Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={disabled || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  disabled || !input.trim()
                    ? 'bg-[#2a2a2a] text-gray-600 cursor-not-allowed'
                    : greenMode
                      ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                      : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <p className="text-center text-xs text-gray-600 mt-3">
          Greenference can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}
