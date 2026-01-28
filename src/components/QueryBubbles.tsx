import { motion } from 'framer-motion';
import { INTENT_QUERIES } from '../data/mockResponses';

interface QueryBubblesProps {
  onSelectQuery: (query: string) => void;
}

export function QueryBubbles({ onSelectQuery }: QueryBubblesProps) {
  // Select queries for display - duplicated for seamless loop
  const displayQueries = [
    INTENT_QUERIES.find(q => q.id === 'trivial-1'), // Local
    INTENT_QUERIES.find(q => q.id === 'low-2'),     // Green - factual
    INTENT_QUERIES.find(q => q.id === 'low-3'),     // Green - writing
    INTENT_QUERIES.find(q => q.id === 'high-1'),    // Standard - complex
    INTENT_QUERIES.find(q => q.id === 'medium-1'),  // Medium
    INTENT_QUERIES.find(q => q.id === 'high-2'),    // Standard - strategy
  ].filter(Boolean);

  // Duplicate for seamless infinite scroll
  const tickerItems = [...displayQueries, ...displayQueries];

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0d0d0d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0d0d0d] to-transparent z-10 pointer-events-none" />

      {/* Ticker container */}
      <motion.div
        className="flex gap-4"
        animate={{
          x: ['0%', '-50%'],
        }}
        transition={{
          x: {
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {tickerItems.map((query, index) => {
          if (!query) return null;
          
          return (
            <motion.button
              key={`${query.id}-${index}`}
              onClick={() => onSelectQuery(query.query)}
              whileHover={{ 
                scale: 1.03,
                y: -4,
              }}
              whileTap={{ scale: 0.98 }}
              className="
                group relative flex flex-col items-start gap-3 p-5 rounded-2xl
                bg-[#1a1a1a] border border-[#2a2a2a]
                hover:border-gray-600 hover:bg-[#1f1f1f]
                transition-colors cursor-pointer
                min-w-[220px] max-w-[220px]
                flex-shrink-0
              "
            >
              {/* Query text */}
              <p className="text-sm text-white font-medium text-left leading-snug line-clamp-2">
                "{query.query}"
              </p>

              {/* Description only - no category tag */}
              <p className="text-xs text-gray-500 text-left">
                {query.description}
              </p>

              {/* Subtle hover indicator */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-600">Click to try →</span>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
