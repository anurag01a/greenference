import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useChat } from './hooks/useChat';
import { Sidebar } from './components/Sidebar';
import { ChatHeader } from './components/ChatHeader';
import { ChatInterface } from './components/ChatInterface';
import { MessageInput } from './components/MessageInput';
import { UnlockCelebration } from './components/UnlockCelebration';

function App() {
  const {
    messages,
    isRouting,
    routingSteps,
    greenMode,
    credits,
    isUnlocked,
    walletRef,
    totalCarbonSaved,
    totalCarbonEmitted,
    netCarbonImpact,
    selectedModel,
    displayModel,
    streak,
    sendMessage,
    toggleGreenMode,
    setSelectedModel,
    resetChat,
  } = useChat();

  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Show celebration modal when unlocked (only once)
  if (isUnlocked && !hasShownCelebration && !showCelebration) {
    setTimeout(() => {
      setShowCelebration(true);
      setHasShownCelebration(true);
    }, 500);
  }

  return (
    <div className="flex h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <Sidebar 
            onClose={() => setSidebarOpen(false)}
            greenMode={greenMode}
            totalCarbonSaved={totalCarbonSaved}
            totalCarbonEmitted={totalCarbonEmitted}
            netCarbonImpact={netCarbonImpact}
            streak={streak}
            onNewChat={resetChat}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <ChatHeader
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          greenMode={greenMode}
          credits={credits}
          isUnlocked={isUnlocked}
          walletRef={walletRef}
          onToggleGreenMode={toggleGreenMode}
          selectedModel={selectedModel}
          displayModel={displayModel}
          onSelectModel={setSelectedModel}
        />

        {/* Chat Area */}
        <ChatInterface
          messages={messages}
          isRouting={isRouting}
          routingSteps={routingSteps}
          greenMode={greenMode}
          isUnlocked={isUnlocked}
          onSendMessage={sendMessage}
        />

        {/* Input Area */}
        <MessageInput
          onSend={sendMessage}
          disabled={isRouting}
          greenMode={greenMode}
          isUnlocked={isUnlocked}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
        />
      </div>

      {/* Unlock Celebration Modal */}
      <UnlockCelebration
        isVisible={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </div>
  );
}

export default App;
