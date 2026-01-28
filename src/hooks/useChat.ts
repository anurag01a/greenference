import { useState, useCallback, useRef } from 'react';
import { Message, RoutingStep } from '../types';
import { 
  analyzeIntent,
  getNearestGreenNode, 
  getNearestStandardNode,
  calculateCarbonSaved,
  calculateCarbonEmitted,
  MOCK_USER_LOCATION,
  LOCAL_NODE,
  isFrontierModel,
  isLocalModel,
  IntentQuery,
  DataNode,
  SLM_MODELS,
  FRONTIER_MODELS,
  LOCAL_MODELS,
} from '../data/mockResponses';
import confetti from 'canvas-confetti';

// 5-Step Cinematic Routing Sequence
const createRoutingSteps = (
  intent: IntentQuery,
  routeName: string,
  greenMode: boolean,
  isLocal: boolean,
  isFrontier: boolean,
  showEfficiencyNudge: boolean,
  isAutoMode: boolean,
  autoSwitchedTo: 'green' | 'standard' | null
): Omit<RoutingStep, 'status'>[] => {
  const location = MOCK_USER_LOCATION;
  const complexityLabel = intent.complexity.toUpperCase();
  
  const steps: Omit<RoutingStep, 'status'>[] = [
    // Step 1: Location Detection
    { 
      id: 1, 
      icon: 'location', 
      text: `DETECTING ORIGIN: ${location.city.toUpperCase()}`,
      subtext: `[LAT: ${location.lat.toFixed(2)}, LONG: ${location.long.toFixed(2)}]`,
      duration: 1100 
    },
    // Step 2: Intent Analysis
    { 
      id: 2, 
      icon: 'brain', 
      text: `ANALYZING INTENT...`,
      subtext: `COMPLEXITY: ${complexityLabel}`,
      duration: 1400 
    },
  ];

  // Step 3: Mode decision
  if (isAutoMode && autoSwitchedTo === 'green') {
    steps.push({
      id: 3,
      icon: 'toggle',
      text: 'AUTO: SWITCHING TO GREEN MODE',
      subtext: `${complexityLabel} complexity - SLM sufficient`,
      duration: 1200,
      highlight: 'green',
    });
  } else if (isAutoMode && autoSwitchedTo === 'standard') {
    steps.push({
      id: 3,
      icon: 'toggle',
      text: 'AUTO: SWITCHING TO PERFORMANCE MODE',
      subtext: `${complexityLabel} complexity - Frontier required`,
      duration: 1200,
      highlight: 'amber',
    });
  } else if (showEfficiencyNudge) {
    steps.push({
      id: 3,
      icon: 'toggle',
      text: 'EFFICIENCY TIP',
      subtext: `${complexityLabel} query - SLM could save 90% compute`,
      duration: 1200,
      highlight: 'amber',
    });
  } else if (isLocal) {
    steps.push({
      id: 3,
      icon: 'toggle',
      text: 'EDGE AI SELECTED',
      subtext: 'Running locally - Zero network carbon',
      duration: 1000,
      highlight: 'green',
    });
  } else if (greenMode) {
    steps.push({
      id: 3,
      icon: 'toggle',
      text: 'GREEN MODE ACTIVE',
      subtext: isFrontier ? 'Routing Frontier to sustainable grid' : 'Routing to sustainable data center',
      duration: 1000,
      highlight: 'green',
    });
  } else {
    steps.push({
      id: 3,
      icon: 'toggle',
      text: 'PERFORMANCE MODE',
      subtext: 'Optimizing for lowest latency',
      duration: 800,
      highlight: 'amber',
    });
  }

  // Step 4: Grid Negotiation
  if (isLocal) {
    steps.push({
      id: 4,
      icon: 'grid',
      text: 'ROUTING TO LOCAL DEVICE',
      subtext: 'Edge AI - Zero network latency',
      duration: 900,
      highlight: 'green',
    });
  } else if (greenMode) {
    steps.push({
      id: 4,
      icon: 'grid',
      text: isFrontier ? 'SCANNING GREEN FRONTIER GRIDS...' : 'SCANNING GREEN GRIDS...',
      subtext: `VIRGINIA (COAL): REJECTED → ${routeName.toUpperCase()}: SELECTED`,
      duration: 1600,
      highlight: 'green',
    });
  } else {
    steps.push({
      id: 4,
      icon: 'grid',
      text: 'OPTIMIZING FOR LATENCY...',
      subtext: `SWEDEN (95ms) → VIRGINIA (12ms): SELECTED`,
      duration: 1200,
      highlight: 'amber',
    });
  }

  // Step 5: Final Routing
  steps.push({
    id: 5,
    icon: 'server',
    text: `ROUTING TO: ${routeName.toUpperCase()}`,
    subtext: isLocal 
      ? 'EDGE AI • ZERO CARBON • INSTANT'
      : greenMode 
        ? `${isFrontier ? 'GREEN FRONTIER' : 'GREEN SLM'} • LOW CARBON • RENEWABLE`
        : 'HIGH PERFORMANCE • LOW LATENCY',
    duration: 900,
  });

  return steps;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRouting, setIsRouting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [greenMode, setGreenMode] = useState(true);
  const [credits, setCredits] = useState(8);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [totalCarbonSaved, setTotalCarbonSaved] = useState(24.6);
  const [totalCarbonEmitted, setTotalCarbonEmitted] = useState(0);
  const [routingSteps, setRoutingSteps] = useState<RoutingStep[]>([]);
  const [selectedModel, setSelectedModel] = useState('auto'); // Default to Auto
  const [streak] = useState(4); // Mocked streak value (days) - constant for demo
  const [displayModel, setDisplayModel] = useState('auto'); // What model is displayed (for Auto mode)
  
  const walletRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = useCallback(() => {
    const rect = walletRef.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.2;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#10b981', '#34d399', '#fbbf24', '#f59e0b', '#ffffff'],
      startVelocity: 30,
      gravity: 0.8,
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 100,
        origin: { x, y },
        colors: ['#10b981', '#6ee7b7', '#fcd34d'],
        startVelocity: 25,
        gravity: 1,
      });
    }, 150);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isRouting) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsRouting(true);
    setCurrentStep(0);

    // Analyze intent
    const intent = analyzeIntent(content);
    if (!intent) return;

    // Check if we're in AUTO mode
    const isAutoMode = selectedModel === 'auto';
    
    let actualModel = selectedModel;
    let actualGreenMode = greenMode;
    let autoSwitchedTo: 'green' | 'standard' | null = null;

    if (isAutoMode) {
      // AUTO MODE: System decides based on intent
      const shouldBeGreen = intent.category === 'green' || intent.category === 'local';
      const shouldBeStandard = intent.category === 'standard';
      
      if (shouldBeGreen && !greenMode) {
        autoSwitchedTo = 'green';
        actualGreenMode = true;
      } else if (shouldBeStandard && greenMode) {
        autoSwitchedTo = 'standard';
        actualGreenMode = false;
      }

      // Auto-select model based on complexity
      if (intent.complexity === 'trivial') {
        actualModel = LOCAL_MODELS[Math.floor(Math.random() * LOCAL_MODELS.length)].id;
      } else if (intent.complexity === 'high' || intent.category === 'standard') {
        actualModel = FRONTIER_MODELS[Math.floor(Math.random() * FRONTIER_MODELS.length)].id;
      } else {
        actualModel = SLM_MODELS[Math.floor(Math.random() * SLM_MODELS.length)].id;
      }
    }

    // Check model type for the actual model being used
    const isFrontier = isFrontierModel(actualModel);
    const isLocal = isLocalModel(actualModel);
    
    // Check if we should show efficiency nudge (only in manual mode)
    const showEfficiencyNudge = !isAutoMode && isFrontier && (intent.complexity === 'trivial' || intent.complexity === 'low');

    // Determine routing destination
    const greenNode = getNearestGreenNode();
    const standardNode = getNearestStandardNode();
    
    let selectedNode: DataNode | typeof LOCAL_NODE;
    let finalIsGreen: boolean;

    if (isLocal) {
      selectedNode = LOCAL_NODE;
      finalIsGreen = true;
    } else if (actualGreenMode) {
      selectedNode = greenNode;
      finalIsGreen = true;
    } else {
      selectedNode = standardNode;
      finalIsGreen = false;
    }

    const routeName = selectedNode.name;

    // Create routing steps
    const steps = createRoutingSteps(
      intent, routeName, actualGreenMode, isLocal, isFrontier, 
      showEfficiencyNudge, isAutoMode, autoSwitchedTo
    );
    setRoutingSteps(steps.map(step => ({ ...step, status: 'pending' as const })));

    // Animate through routing steps
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i + 1);
      setRoutingSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index < i ? 'complete' : index === i ? 'active' : 'pending',
      })));

      // In AUTO mode, flip the toggle during step 3
      if (isAutoMode && i === 2 && autoSwitchedTo) {
        setGreenMode(autoSwitchedTo === 'green');
        setDisplayModel(actualModel);
      }

      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    // Mark all complete
    setRoutingSteps(prev => prev.map(step => ({ ...step, status: 'complete' as const })));
    await new Promise(resolve => setTimeout(resolve, 400));

    // Calculate carbon metrics
    let carbonSaved = 0;
    let carbonEmitted = 0;
    let carbonUsed = 0;

    if (isLocal) {
      carbonSaved = calculateCarbonSaved(greenNode, standardNode) + 0.5;
      carbonUsed = 0;
    } else if (finalIsGreen) {
      carbonSaved = calculateCarbonSaved(greenNode, standardNode);
      carbonUsed = Number((greenNode.carbonIntensity * 0.01).toFixed(1));
    } else {
      carbonEmitted = calculateCarbonEmitted(standardNode);
    }

    // Update NET carbon ledger
    if (finalIsGreen) {
      setTotalCarbonSaved(prev => Number((prev + carbonSaved).toFixed(1)));
    } else {
      setTotalCarbonEmitted(prev => Number((prev + carbonEmitted).toFixed(1)));
    }

    // Calculate credits
    const creditIncrement = finalIsGreen ? 1 : -0.5;
    const newCredits = Math.max(0, credits + creditIncrement);
    
    if (newCredits >= 10 && !isUnlocked) {
      setIsUnlocked(true);
      setTimeout(() => {
        triggerConfetti();
      }, 300);
    }

    setCredits(newCredits);

    // Add AI message with receipt
    const aiMessage: Message = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      content: intent.response,
      timestamp: new Date(),
      receipt: {
        route: selectedNode.name,
        routeType: selectedNode.type as any,
        region: 'region' in selectedNode ? selectedNode.region : 'Your Device',
        latency: selectedNode.latency,
        isGreen: finalIsGreen,
        isLocal,
        complexity: intent.complexity,
        ...(finalIsGreen ? { carbonSaved, carbonUsed } : { carbonEmitted }),
      },
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsRouting(false);
    setCurrentStep(0);
    
    // Reset display model to auto after message
    if (isAutoMode) {
      setDisplayModel('auto');
    }
  }, [isRouting, greenMode, selectedModel, credits, isUnlocked, triggerConfetti]);

  // Toggle green mode
  const toggleGreenMode = useCallback(() => {
    setGreenMode(prev => !prev);
  }, []);

  // Select model
  const handleSelectModel = useCallback((modelId: string) => {
    setSelectedModel(modelId);
    setDisplayModel(modelId);
  }, []);

  // Reset chat
  const resetChat = useCallback(() => {
    setMessages([]);
    setRoutingSteps([]);
    setCurrentStep(0);
    setIsRouting(false);
  }, []);

  // Calculate net impact
  const netCarbonImpact = totalCarbonSaved - totalCarbonEmitted;

  return {
    messages,
    isRouting,
    routingSteps,
    currentStep,
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
    setSelectedModel: handleSelectModel,
    resetChat,
  };
}
