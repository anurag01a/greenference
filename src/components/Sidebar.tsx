import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  MessageSquare, 
  Search, 
  Sparkles,
  Settings,
  Leaf,
  ChevronLeft,
  TrendingUp,
  TrendingDown,
  Smartphone,
  TreeDeciduous,
  Flame,
  Scale,
  Zap
} from 'lucide-react';

interface SidebarProps {
  onClose: () => void;
  greenMode: boolean;
  totalCarbonSaved: number;
  totalCarbonEmitted: number;
  netCarbonImpact: number;
  streak: number;
  onNewChat: () => void;
}

export function Sidebar({ 
  onClose, 
  greenMode, 
  totalCarbonSaved, 
  totalCarbonEmitted,
  netCarbonImpact,
  streak,
  onNewChat
}: SidebarProps) {
  const recentChats = [
    { id: 1, title: "Carbon footprint analysis", time: "2h ago" },
    { id: 2, title: "Green routing explanation", time: "Yesterday" },
    { id: 3, title: "Sustainable AI practices", time: "3 days ago" },
  ];

  // Calculate tangible metaphors
  const phonesCharged = Math.floor(Math.max(0, netCarbonImpact) / 8);
  const treeDays = (Math.max(0, netCarbonImpact) / 22).toFixed(1);
  const isPositiveImpact = netCarbonImpact >= 0;

  // Streak milestones
  const getStreakMessage = (days: number) => {
    if (days >= 7) return 'Pro Search Unlocked!';
    if (days >= 5) return '2 more days for Pro Search!';
    if (days >= 3) return 'Building momentum!';
    if (days >= 1) return 'Keep it going!';
    return 'Start your streak today';
  };

  const handleNewChat = () => {
    onNewChat();
  };

  return (
    <motion.aside
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 280, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-full bg-[#171717] border-r border-[#2a2a2a] flex flex-col overflow-hidden"
    >
      <div className="flex flex-col min-w-[280px] h-full">
        {/* Header */}
        <div className="p-3 flex items-center justify-between flex-shrink-0">
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <ChevronLeft size={20} />
          </button>
          <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-white">
            <Search size={20} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 mb-2 flex-shrink-0">
          <button 
            onClick={handleNewChat}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg border transition-all ${
              greenMode 
                ? 'border-emerald-500/30 hover:bg-emerald-500/10 text-emerald-400' 
                : 'border-[#2a2a2a] hover:bg-[#2a2a2a] text-gray-300'
            }`}
          >
            <Plus size={18} />
            <span className="font-medium">New chat</span>
          </button>
        </div>

        {/* Scrollable Middle Section */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Recent Chats */}
          <div className="px-2">
            <div className="px-2 py-2 text-xs text-gray-500 font-medium">Recent</div>
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2a2a2a] transition-colors text-left group"
              >
                <MessageSquare size={16} className="text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-300 truncate">{chat.title}</p>
                  <p className="text-xs text-gray-600">{chat.time}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Impact Dashboard - Scrollable */}
          <div className="p-3 space-y-2 mt-2">
            {/* Streak Card */}
            <motion.div 
              className={`rounded-xl p-3 ${
                streak > 0 
                  ? 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20' 
                  : 'bg-[#1f1f1f] border border-[#2a2a2a]'
              }`}
              animate={streak >= 7 ? { 
                boxShadow: ['0 0 0px rgba(251, 146, 60, 0)', '0 0 15px rgba(251, 146, 60, 0.3)', '0 0 0px rgba(251, 146, 60, 0)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{streak > 0 ? '🔥' : '❄️'}</span>
                  <div>
                    <p className={`text-sm font-bold ${streak > 0 ? 'text-orange-300' : 'text-gray-400'}`}>
                      {streak} Day Streak
                    </p>
                    <p className="text-[10px] text-gray-500">
                      {getStreakMessage(streak)}
                    </p>
                  </div>
                </div>
                {streak >= 7 && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-medium">
                    <Zap size={10} />
                    <span>PRO</span>
                  </div>
                )}
              </div>
              
              {/* Streak Progress */}
              {streak < 7 && streak > 0 && (
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                    <span>Progress to Pro Search</span>
                    <span>{streak}/7 days</span>
                  </div>
                  <div className="h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${(streak / 7) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Net Impact Card */}
            <div className={`rounded-xl p-3 ${
              isPositiveImpact ? 'bg-emerald-500/10' : 'bg-red-500/10'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <Scale size={12} className={isPositiveImpact ? 'text-emerald-400' : 'text-red-400'} />
                <span className={`text-[10px] font-medium ${isPositiveImpact ? 'text-emerald-400' : 'text-red-400'}`}>
                  Net Carbon Impact
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-auto"
                >
                  {isPositiveImpact ? (
                    <TrendingUp size={10} className="text-emerald-400" />
                  ) : (
                    <TrendingDown size={10} className="text-red-400" />
                  )}
                </motion.div>
              </div>

              {/* Main Stat */}
              <div className="mb-2">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={netCarbonImpact}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className={`text-xl font-bold ${isPositiveImpact ? 'text-emerald-300' : 'text-red-300'}`}
                  >
                    {isPositiveImpact ? '+' : ''}{netCarbonImpact.toFixed(1)}g
                  </motion.p>
                </AnimatePresence>
                <p className={`text-[10px] ${isPositiveImpact ? 'text-emerald-400/70' : 'text-red-400/70'}`}>
                  {isPositiveImpact ? 'CO₂ Saved (Net)' : 'CO₂ Deficit'}
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5 text-emerald-400/70">
                    <Leaf size={10} />
                    <span>Saved</span>
                  </div>
                  <span className="text-emerald-400">+{totalCarbonSaved.toFixed(1)}g</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5 text-orange-400/70">
                    <Flame size={10} />
                    <span>Emitted</span>
                  </div>
                  <span className="text-orange-400">-{totalCarbonEmitted.toFixed(1)}g</span>
                </div>
              </div>

              {/* Tangible Metaphors (only if positive) */}
              {isPositiveImpact && netCarbonImpact > 0 && (
                <div className="space-y-1 pt-2 mt-2 border-t border-white/10">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <Smartphone size={10} className="text-emerald-400/70" />
                    <span>= <span className="text-emerald-400 font-medium">{phonesCharged}</span> phones</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <TreeDeciduous size={10} className="text-emerald-400/70" />
                    <span>= <span className="text-emerald-400 font-medium">{treeDays}</span> tree-days</span>
                  </div>
                </div>
              )}

              {/* Warning if negative */}
              {!isPositiveImpact && (
                <p className="text-[10px] text-red-400/70 pt-2 mt-2 border-t border-white/10">
                  Use Green Mode to offset
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Always visible */}
        <div className="p-3 border-t border-[#2a2a2a] flex-shrink-0 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors">
            <Sparkles size={14} className="text-gray-500" />
            <span className="text-sm text-gray-400">Upgrade plan</span>
          </button>
          
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors">
            <Settings size={14} className="text-gray-500" />
            <span className="text-sm text-gray-400">Settings</span>
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
