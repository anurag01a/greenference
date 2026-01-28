import { motion } from 'framer-motion';
import { User, Leaf, Copy, ThumbsUp, ThumbsDown, RotateCcw, Zap } from 'lucide-react';
import { Message } from '../types';
import { MessageReceipt } from './MessageReceipt';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {/* AI Avatar */}
        {!isUser && (
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.receipt?.isGreen !== false
              ? 'bg-emerald-500/15' 
              : 'bg-orange-500/15'
          }`}>
            {message.receipt?.isGreen !== false ? (
              <Leaf size={16} className="text-emerald-400" />
            ) : (
              <Zap size={16} className="text-orange-400" />
            )}
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%]`}>
          {/* Sender Label */}
          <span className={`text-xs font-medium mb-1 ${
            isUser 
              ? 'text-gray-400' 
              : message.receipt?.isGreen !== false 
                ? 'text-emerald-400' 
                : 'text-orange-400'
          }`}>
            {isUser ? 'You' : 'Greenference'}
          </span>

          {/* Message Bubble */}
          <div className={`rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-[#2a2a2a] text-white' 
              : 'bg-transparent text-gray-100'
          }`}>
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>

          {/* AI Message Actions */}
          {!isUser && (
            <div className="flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-500 hover:text-gray-300">
                <Copy size={14} />
              </button>
              <button className="p-1.5 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-500 hover:text-gray-300">
                <ThumbsUp size={14} />
              </button>
              <button className="p-1.5 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-500 hover:text-gray-300">
                <ThumbsDown size={14} />
              </button>
              <button className="p-1.5 hover:bg-[#2a2a2a] rounded-lg transition-colors text-gray-500 hover:text-gray-300">
                <RotateCcw size={14} />
              </button>
            </div>
          )}

          {/* Receipt */}
          {!isUser && message.receipt && (
            <MessageReceipt receipt={message.receipt} />
          )}
        </div>

        {/* User Avatar */}
        {isUser && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
