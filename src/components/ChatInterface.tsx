import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Message } from '../types';
import { ChatMessage } from './ChatMessage';
import { RoutingLoader } from './RoutingLoader';
import { QueryBubbles } from './QueryBubbles';
import { RoutingStep } from '../types';
import { Leaf } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isRouting: boolean;
  routingSteps: RoutingStep[];
  greenMode: boolean;
  isUnlocked: boolean;
  onSendMessage: (query: string) => void;
}

export function ChatInterface({ 
  messages, 
  isRouting, 
  routingSteps, 
  greenMode,
  isUnlocked,
  onSendMessage,
}: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isRouting]);

  const handleBubbleClick = (query: string) => {
    onSendMessage(query);
  };

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-[#0d0d0d]"
    >
      {/* Empty State */}
      {messages.length === 0 && !isRouting && (
        <div className="flex flex-col items-center justify-center h-full text-center px-4">
          {/* Logo */}
          <motion.div 
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
              greenMode ? 'bg-emerald-500/10' : 'bg-orange-500/10'
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Leaf 
              size={32} 
              className={greenMode ? 'text-emerald-400' : 'text-orange-400'} 
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-3xl font-medium text-white mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            What can I help with?
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-sm text-gray-500 mb-8 max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Click a query below to see intelligent routing in action. 
            Watch how Greenference analyzes your intent and picks the optimal path.
          </motion.p>

          {/* Query Bubbles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <QueryBubbles onSelectQuery={handleBubbleClick} />
          </motion.div>

          {/* Credits Progress */}
          {!isUnlocked && greenMode && (
            <motion.div
              className="mt-6 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span>Use green queries to unlock</span>
                <span className="text-emerald-400 font-medium">Deep Research</span>
              </div>
              <div className="w-40 h-1 bg-[#1f1f1f] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                  initial={{ width: '80%' }}
                  animate={{ width: '80%' }}
                />
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Messages */}
      {(messages.length > 0 || isRouting) && (
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={message}
              />
            ))}
          </AnimatePresence>

          {/* Routing Loader */}
          <AnimatePresence>
            {isRouting && routingSteps.length > 0 && (
              <RoutingLoader 
                steps={routingSteps} 
                greenMode={greenMode}
              />
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
}
