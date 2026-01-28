import { motion, AnimatePresence } from 'framer-motion';
import { 
  PanelLeftClose, 
  PanelLeft,
  Share, 
  Gem,
  ChevronDown,
  Check,
  Leaf,
  Search,
  Zap,
  Cpu,
  Sparkles
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { GreenModeToggle } from './GreenModeToggle';

interface ChatHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  greenMode: boolean;
  credits: number;
  isUnlocked: boolean;
  walletRef: React.RefObject<HTMLDivElement>;
  onToggleGreenMode: () => void;
  selectedModel: string;
  displayModel: string;
  onSelectModel: (model: string) => void;
}

const AI_MODELS = [
  { divider: true, label: 'Intelligent Routing' },
  { id: 'auto', name: 'Auto', provider: 'Greenference', icon: '✨', tier: 'auto', description: 'Smart model & route selection' },
  { divider: true, label: 'Edge AI (Local Device)' },
  { id: 'local-phi-3', name: 'Phi-3 (Local)', provider: 'On-Device', icon: '💻', tier: 'local' },
  { id: 'local-gemma', name: 'Gemma 2B (Local)', provider: 'On-Device', icon: '🖥️', tier: 'local' },
  { divider: true, label: 'Small Language Models (Efficient)' },
  { id: 'phi-3-mini', name: 'Phi-3 Mini', provider: 'Microsoft', icon: '🌱', tier: 'slm' },
  { id: 'gemma-2-9b', name: 'Gemma 2 9B', provider: 'Google', icon: '🌿', tier: 'slm' },
  { id: 'llama-3.2-3b', name: 'Llama 3.2 3B', provider: 'Meta', icon: '🦙', tier: 'slm' },
  { id: 'qwen-2.5-7b', name: 'Qwen 2.5 7B', provider: 'Alibaba', icon: '🌲', tier: 'slm' },
  { id: 'mistral-7b', name: 'Mistral 7B', provider: 'Mistral', icon: '🌊', tier: 'slm' },
  { divider: true, label: 'Frontier Models (Powerful)' },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', icon: '✨', tier: 'frontier' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', icon: '🔹', tier: 'frontier' },
  { id: 'o1-preview', name: 'o1-preview', provider: 'OpenAI', icon: '🧠', tier: 'frontier' },
  { id: 'claude-4-opus', name: 'Claude 4 Opus', provider: 'Anthropic', icon: '🎭', tier: 'frontier' },
  { id: 'claude-4-sonnet', name: 'Claude 4 Sonnet', provider: 'Anthropic', icon: '📝', tier: 'frontier' },
  { id: 'gemini-2-ultra', name: 'Gemini 2 Ultra', provider: 'Google', icon: '💎', tier: 'frontier' },
  { id: 'grok-3', name: 'Grok 3', provider: 'xAI', icon: '🚀', tier: 'frontier' },
];

export function ChatHeader({ 
  sidebarOpen,
  onToggleSidebar,
  greenMode, 
  credits, 
  isUnlocked, 
  walletRef, 
  onToggleGreenMode,
  selectedModel,
  displayModel,
  onSelectModel
}: ChatHeaderProps) {
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Use displayModel for showing (which updates during auto-routing)
  const selectedModelData = AI_MODELS.find(m => 'id' in m && m.id === displayModel);
  const isAutoMode = selectedModel === 'auto';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowModelDropdown(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredModels = AI_MODELS.filter(model => {
    if ('divider' in model && model.divider) return true;
    if ('name' in model && 'provider' in model && model.name && model.provider) {
      return model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             model.provider.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  // Badge now shows tier
  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'auto':
        return <span className="px-1.5 py-0.5 text-[9px] bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 rounded font-medium">AUTO</span>;
      case 'local':
        return <span className="px-1.5 py-0.5 text-[9px] bg-cyan-500/20 text-cyan-400 rounded font-medium">EDGE</span>;
      case 'slm':
        return <span className="px-1.5 py-0.5 text-[9px] bg-emerald-500/20 text-emerald-400 rounded font-medium">SLM</span>;
      case 'frontier':
        return <span className="px-1.5 py-0.5 text-[9px] bg-purple-500/20 text-purple-400 rounded font-medium">PRO</span>;
      default:
        return null;
    }
  };

  return (
    <header className="flex items-center justify-between px-3 py-2 border-b border-[#2a2a2a] bg-[#0d0d0d]">
      {/* Left Side */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-white"
        >
          {sidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
        </button>

        {/* Model Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowModelDropdown(!showModelDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <span className="text-lg">{selectedModelData && 'icon' in selectedModelData ? selectedModelData.icon : '🤖'}</span>
            <span className="font-medium text-white">
              {isAutoMode && displayModel === 'auto' 
                ? 'Auto' 
                : selectedModelData && 'name' in selectedModelData 
                  ? selectedModelData.name 
                  : 'Select Model'
              }
            </span>
            {selectedModelData && 'tier' in selectedModelData && selectedModelData.tier && getTierBadge(selectedModelData.tier)}
            <ChevronDown size={16} className={`text-gray-500 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showModelDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-1 w-80 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-2 border-b border-[#2a2a2a]">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search models..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Routing Mode Notice */}
                <div className={`mx-2 mt-2 p-2.5 rounded-lg border ${
                  greenMode 
                    ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20' 
                    : 'bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-orange-500/20'
                }`}>
                  <div className={`flex items-center gap-2 text-xs ${greenMode ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {greenMode ? <Leaf size={12} /> : <Zap size={12} />}
                    <span className="font-medium">{greenMode ? 'Green Routing Active' : 'Performance Routing'}</span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {isAutoMode 
                      ? 'Auto mode: System picks best model & route for each query'
                      : greenMode 
                        ? 'Selected model routed to renewable energy data centers' 
                        : 'Routing to lowest latency data centers'
                    }
                  </p>
                </div>

                <div className="max-h-[320px] overflow-y-auto p-1 mt-1">
                  {filteredModels.map((model, index) => {
                    if ('divider' in model && model.divider) {
                      return (
                        <div key={`divider-${index}`} className="px-3 py-2 text-xs text-gray-500 font-medium mt-1 flex items-center gap-2">
                          {model.label?.includes('Intelligent') && <Sparkles size={11} />}
                          {model.label?.includes('Edge') && <Cpu size={11} />}
                          {model.label?.includes('Small') && <Leaf size={11} />}
                          {model.label?.includes('Frontier') && <Zap size={11} />}
                          {model.label}
                        </div>
                      );
                    }
                    
                    if (!('id' in model) || !model.id) return null;
                    
                    const modelId = model.id;
                    const modelTier = 'tier' in model ? model.tier : undefined;
                    const isSelected = modelId === selectedModel;
                    const isAuto = modelId === 'auto';
                    
                    return (
                      <button
                        key={modelId}
                        onClick={() => {
                          onSelectModel(modelId);
                          setShowModelDropdown(false);
                          setSearchQuery('');
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          isSelected 
                            ? isAuto 
                              ? 'bg-gradient-to-r from-emerald-500/10 to-cyan-500/10' 
                              : 'bg-[#2a2a2a]' 
                            : 'hover:bg-[#252525]'
                        }`}
                      >
                        <span className="text-base">{model.icon}</span>
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                              {model.name}
                            </span>
                            {modelTier && getTierBadge(modelTier)}
                          </div>
                          <span className="text-xs text-gray-500">
                            {'description' in model ? model.description : model.provider}
                          </span>
                        </div>
                        {isSelected && (
                          <Check size={16} className={isAuto ? 'text-emerald-400' : greenMode ? 'text-emerald-400' : 'text-orange-400'} />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="p-2 border-t border-[#2a2a2a]">
                  <div className="flex items-center gap-2 px-3 py-2 text-xs text-gray-500">
                    <Sparkles size={12} className="text-emerald-400" />
                    <span>Auto mode intelligently picks model + route per query</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <motion.div
          ref={walletRef as React.RefObject<HTMLDivElement>}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            isUnlocked 
              ? 'bg-gradient-to-r from-amber-500/20 to-emerald-500/20 border border-amber-400/30' 
              : 'bg-[#1f1f1f] border border-[#2a2a2a]'
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
          <Gem size={12} className={isUnlocked ? 'text-amber-400' : 'text-gray-500'} />
          <AnimatePresence mode="wait">
            <motion.span
              key={credits}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className={isUnlocked ? 'text-amber-300' : 'text-gray-400'}
            >
              {credits.toFixed(1)}/10
            </motion.span>
          </AnimatePresence>
          {isUnlocked && <span className="text-[10px]">🔓</span>}
        </motion.div>

        <GreenModeToggle 
          enabled={greenMode} 
          onToggle={onToggleGreenMode} 
        />

        <button className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-400 hover:text-white">
          <Share size={18} />
        </button>
      </div>
    </header>
  );
}
