import { motion } from 'framer-motion';
import { Leaf, Zap, Gem, AlertTriangle, Gauge, Cpu } from 'lucide-react';
import { MessageReceipt as ReceiptType } from '../types';

interface MessageReceiptProps {
  receipt: ReceiptType;
}

export function MessageReceipt({ receipt }: MessageReceiptProps) {
  // Local/Edge AI Receipt
  if (receipt.isLocal) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.25 }}
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-cyan-400/80 mt-2"
      >
        <div className="flex items-center gap-1">
          <Cpu size={10} className="text-cyan-400" />
          <span className="font-medium">Edge AI</span>
        </div>

        <span className="text-gray-700">|</span>

        <span className="text-gray-500">Your Device</span>

        <span className="text-gray-700">|</span>

        <div className="flex items-center gap-1">
          <Gauge size={9} />
          <span>0ms</span>
        </div>

        <span className="text-gray-700">|</span>

        <div className="flex items-center gap-1 text-cyan-400">
          <Leaf size={10} />
          <span className="font-semibold">Zero Carbon</span>
        </div>

        <span className="text-gray-700">|</span>

        <div className="flex items-center gap-1 text-amber-400/80">
          <Gem size={9} />
          <span>+1</span>
        </div>
      </motion.div>
    );
  }

  // Green Mode Receipt
  if (receipt.isGreen) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.25 }}
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-emerald-400/80 mt-2"
      >
        <div className="flex items-center gap-1">
          <Leaf size={10} className="text-emerald-400" />
          <span className="font-medium">{receipt.route}</span>
          <span className="text-gray-600">({receipt.routeType})</span>
        </div>

        <span className="text-gray-700">|</span>

        <span className="text-gray-500">{receipt.region}</span>

        <span className="text-gray-700">|</span>

        <div className="flex items-center gap-1">
          <Gauge size={9} />
          <span>{receipt.latency}ms</span>
        </div>

        <span className="text-gray-700">|</span>

        <div className="flex items-center gap-1 text-emerald-400">
          <Zap size={10} />
          <span className="font-semibold">Saved {receipt.carbonSaved}g CO₂</span>
        </div>

        {receipt.carbonUsed !== undefined && (
          <>
            <span className="text-gray-700">|</span>
            <span className="text-gray-500">Used {receipt.carbonUsed}g</span>
          </>
        )}

        <span className="text-gray-700">|</span>

        <div className="flex items-center gap-1 text-amber-400/80">
          <Gem size={9} />
          <span>+1</span>
        </div>
      </motion.div>
    );
  }

  // Standard Mode Receipt (High Energy Warning)
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.25 }}
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] text-orange-400/80 mt-2"
    >
      <div className="flex items-center gap-1">
        <Zap size={10} className="text-orange-400" />
        <span className="font-medium">{receipt.route}</span>
        <span className="text-gray-600">({receipt.routeType})</span>
      </div>

      <span className="text-gray-700">|</span>

      <span className="text-gray-500">{receipt.region}</span>

      <span className="text-gray-700">|</span>

      <div className="flex items-center gap-1">
        <Gauge size={9} />
        <span>{receipt.latency}ms</span>
      </div>

      <span className="text-gray-700">|</span>

      <div className="flex items-center gap-1 text-orange-400">
        <AlertTriangle size={10} />
        <span className="font-semibold">Emitted {receipt.carbonEmitted}g CO₂</span>
      </div>

      <span className="text-gray-700">|</span>

      <span className="text-red-400/70">High Carbon</span>
    </motion.div>
  );
}
