export type Complexity = 'trivial' | 'low' | 'medium' | 'high';

export interface IntentQuery {
  id: string;
  query: string;
  response: string;
  complexity: Complexity;
  category: 'local' | 'green' | 'standard';
  description: string;
}

export interface DataNode {
  id: string;
  name: string;
  location: string;
  type: 'hydro' | 'wind' | 'solar' | 'geo' | 'mixed' | 'gas' | 'coal';
  region: string;
  latency: number;
  carbonIntensity: number; // g CO2 per kWh
  isGreen: boolean;
  supportedModels: 'all' | 'slm' | 'frontier'; // Which model types this node supports
}

export interface LocalNode {
  id: string;
  name: string;
  type: 'local';
  latency: number;
  carbonIntensity: number;
}

export interface UserLocation {
  city: string;
  country: string;
  lat: number;
  long: number;
  timezone: string;
}

// Mocked user location
export const MOCK_USER_LOCATION: UserLocation = {
  city: 'New York',
  country: 'USA',
  lat: 40.7128,
  long: -74.0060,
  timezone: 'EST',
};

// Local Device Node (Edge AI) - Zero Carbon
export const LOCAL_NODE: LocalNode = {
  id: 'local-device',
  name: 'Local Device',
  type: 'local',
  latency: 0,
  carbonIntensity: 0,
};

// GREEN Data Centers (Renewable Energy) - Supports ALL models including Frontier
export const GREEN_NODES: DataNode[] = [
  { id: 'sweden-hydro', name: 'Sweden-Hydro', location: 'Stockholm, Sweden', type: 'hydro', region: 'Sweden', latency: 95, carbonIntensity: 8, isGreen: true, supportedModels: 'all' },
  { id: 'quebec-hydro', name: 'Quebec-North', location: 'Montreal, Canada', type: 'hydro', region: 'Canada', latency: 28, carbonIntensity: 12, isGreen: true, supportedModels: 'all' },
  { id: 'iceland-geo', name: 'Iceland-Geo', location: 'Reykjavik, Iceland', type: 'geo', region: 'Iceland', latency: 85, carbonIntensity: 8, isGreen: true, supportedModels: 'all' },
  { id: 'norway-hydro', name: 'Norway-Fjord', location: 'Oslo, Norway', type: 'hydro', region: 'Norway', latency: 92, carbonIntensity: 10, isGreen: true, supportedModels: 'all' },
  { id: 'oregon-wind', name: 'Oregon-Wind', location: 'The Dalles, USA', type: 'wind', region: 'USA', latency: 68, carbonIntensity: 15, isGreen: true, supportedModels: 'all' },
  { id: 'iowa-wind', name: 'Iowa-Wind', location: 'Des Moines, USA', type: 'wind', region: 'USA', latency: 42, carbonIntensity: 18, isGreen: true, supportedModels: 'all' },
];

// STANDARD Data Centers (Mixed/Fossil) - Lowest Latency, Higher Carbon
export const STANDARD_NODES: DataNode[] = [
  { id: 'virginia-east', name: 'Virginia-East', location: 'Ashburn, USA', type: 'coal', region: 'USA', latency: 12, carbonIntensity: 380, isGreen: false, supportedModels: 'all' },
  { id: 'virginia-west', name: 'Virginia-West', location: 'Richmond, USA', type: 'mixed', region: 'USA', latency: 15, carbonIntensity: 340, isGreen: false, supportedModels: 'all' },
  { id: 'frankfurt-eu', name: 'Frankfurt-EU', location: 'Frankfurt, Germany', type: 'gas', region: 'Germany', latency: 78, carbonIntensity: 340, isGreen: false, supportedModels: 'all' },
  { id: 'tokyo-jp', name: 'Tokyo-East', location: 'Tokyo, Japan', type: 'mixed', region: 'Japan', latency: 180, carbonIntensity: 450, isGreen: false, supportedModels: 'all' },
];

// Intent-Mapped Queries (For Demo Bubbles)
export const INTENT_QUERIES: IntentQuery[] = [
  // TRIVIAL -> Local Device (Edge AI)
  {
    id: 'trivial-1',
    query: 'Say hello',
    response: 'Hello! How can I assist you today?',
    complexity: 'trivial',
    category: 'local',
    description: 'Simple greeting - runs on your device',
  },
  {
    id: 'trivial-2',
    query: 'What time is it?',
    response: 'I don\'t have access to real-time data, but you can check your device clock or ask me to help with time zone conversions!',
    complexity: 'trivial',
    category: 'local',
    description: 'Basic query - zero network needed',
  },
  
  // LOW -> Recommended: SLM (but can use Frontier on Green)
  {
    id: 'low-1',
    query: 'Summarize this email for me',
    response: 'I\'d be happy to summarize your email! Please paste the email content and I\'ll provide a concise summary highlighting the key points, action items, and any deadlines mentioned.',
    complexity: 'low',
    category: 'green',
    description: 'Text summarization - efficient SLM task',
  },
  {
    id: 'low-2',
    query: 'What is the capital of France?',
    response: 'The capital of France is Paris. Known as the "City of Light," Paris is famous for the Eiffel Tower, the Louvre Museum, and its rich cultural heritage spanning art, fashion, and cuisine.',
    complexity: 'low',
    category: 'green',
    description: 'Factual lookup - perfect for SLMs',
  },
  {
    id: 'low-3',
    query: 'Write a quick thank you note',
    response: 'Here\'s a warm thank you note:\n\n"Dear [Name],\n\nThank you so much for your thoughtfulness and generosity. Your kindness truly means a lot to me, and I\'m grateful to have you in my life.\n\nWith sincere appreciation,\n[Your name]"',
    complexity: 'low',
    category: 'green',
    description: 'Short-form writing - green and fast',
  },
  
  // MEDIUM -> SLM capable, but Frontier is fine
  {
    id: 'medium-1',
    query: 'Explain how photosynthesis works',
    response: 'Photosynthesis is the process by which plants convert sunlight into energy. It occurs in two main stages:\n\n**Light-dependent reactions** (in thylakoids):\n- Chlorophyll absorbs sunlight\n- Water molecules split, releasing oxygen\n- ATP and NADPH are produced\n\n**Light-independent reactions** (Calvin Cycle):\n- CO2 is fixed into glucose\n- Uses ATP and NADPH from stage 1\n- Produces sugar for plant energy\n\nThe overall equation: 6CO2 + 6H2O + light → C6H12O6 + 6O2',
    complexity: 'medium',
    category: 'green',
    description: 'Educational content - SLM capable',
  },
  
  // HIGH -> Frontier recommended (but can still be Green!)
  {
    id: 'high-1',
    query: 'Analyze this legal contract for risks',
    response: 'I\'ll analyze the contract for potential risks. Key areas I\'ll examine:\n\n**Liability & Indemnification**: Checking for unlimited liability clauses, indemnification scope, and insurance requirements.\n\n**Termination Clauses**: Reviewing notice periods, termination for convenience vs cause, and wind-down obligations.\n\n**Intellectual Property**: Assessing IP ownership, licensing terms, and work-for-hire provisions.\n\n**Payment Terms**: Analyzing payment schedules, late fees, and dispute resolution mechanisms.\n\n**Force Majeure**: Evaluating the scope and notification requirements.\n\nPlease share the contract and I\'ll provide a detailed risk assessment with recommended modifications.',
    complexity: 'high',
    category: 'standard',
    description: 'Complex analysis - requires frontier model',
  },
  {
    id: 'high-2',
    query: 'Write a detailed business strategy',
    response: 'I\'ll help you develop a comprehensive business strategy. Here\'s my framework:\n\n**1. Market Analysis**\n- Industry trends and TAM/SAM/SOM\n- Competitive landscape mapping\n- Customer segmentation\n\n**2. Value Proposition**\n- Unique differentiators\n- Problem-solution fit\n- Pricing strategy\n\n**3. Go-to-Market Strategy**\n- Channel strategy\n- Marketing mix\n- Sales funnel optimization\n\n**4. Operational Plan**\n- Resource allocation\n- Key milestones\n- Risk mitigation\n\n**5. Financial Projections**\n- Revenue model\n- Unit economics\n- Funding requirements\n\nShare your business context and I\'ll customize this framework with specific, actionable recommendations.',
    complexity: 'high',
    category: 'standard',
    description: 'Strategic planning - deep reasoning needed',
  },
];

// SLM Models (Efficient - Recommended for Low/Medium complexity)
export const SLM_MODELS = [
  { id: 'phi-3-mini', name: 'Phi-3 Mini', provider: 'Microsoft' },
  { id: 'gemma-2-9b', name: 'Gemma 2 9B', provider: 'Google' },
  { id: 'llama-3.2-3b', name: 'Llama 3.2 3B', provider: 'Meta' },
  { id: 'qwen-2.5-7b', name: 'Qwen 2.5 7B', provider: 'Alibaba' },
  { id: 'mistral-7b', name: 'Mistral 7B', provider: 'Mistral' },
];

// Frontier Models (Powerful - Can be Green if routed correctly!)
export const FRONTIER_MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI' },
  { id: 'claude-4-opus', name: 'Claude 4 Opus', provider: 'Anthropic' },
  { id: 'gemini-2-ultra', name: 'Gemini 2 Ultra', provider: 'Google' },
  { id: 'grok-3', name: 'Grok 3', provider: 'xAI' },
];

// Local Models (Edge AI - Zero Carbon)
export const LOCAL_MODELS = [
  { id: 'local-phi-3', name: 'Phi-3 (Local)', provider: 'On-Device' },
  { id: 'local-gemma', name: 'Gemma 2B (Local)', provider: 'On-Device' },
];

// Auto Mode - System picks the best model based on intent
export const AUTO_MODEL = { id: 'auto', name: 'Auto', provider: 'Greenference' };

// Helper: Analyze intent from query
export function analyzeIntent(query: string): IntentQuery | null {
  const lowerQuery = query.toLowerCase().trim();
  
  // Check for exact or close matches
  for (const intentQuery of INTENT_QUERIES) {
    if (lowerQuery.includes(intentQuery.query.toLowerCase()) || 
        intentQuery.query.toLowerCase().includes(lowerQuery) ||
        lowerQuery === intentQuery.query.toLowerCase()) {
      return intentQuery;
    }
  }
  
  // Keyword-based fallback
  const trivialKeywords = ['hello', 'hi', 'hey', 'thanks', 'bye', 'ok', 'yes', 'no'];
  const lowKeywords = ['summarize', 'summary', 'capital', 'what is', 'define', 'email', 'note', 'quick'];
  const highKeywords = ['analyze', 'strategy', 'complex', 'legal', 'business', 'detailed', 'comprehensive'];
  
  if (trivialKeywords.some(k => lowerQuery.includes(k)) && lowerQuery.length < 20) {
    return { ...INTENT_QUERIES[0], query, response: 'Hello! How can I help you today?' };
  }
  
  if (highKeywords.some(k => lowerQuery.includes(k))) {
    return { ...INTENT_QUERIES[5], query };
  }
  
  if (lowKeywords.some(k => lowerQuery.includes(k))) {
    return { ...INTENT_QUERIES[2], query };
  }
  
  // Default to medium (green)
  return {
    id: 'fallback',
    query,
    response: 'I\'d be happy to help with that! Let me process your request.',
    complexity: 'medium',
    category: 'green',
    description: 'General query',
  };
}

// Helper: Get the best GREEN node (lowest latency among green options)
export const getNearestGreenNode = (): DataNode => {
  return GREEN_NODES.reduce((prev, curr) => prev.latency < curr.latency ? prev : curr);
};

// Helper: Get the best STANDARD node (lowest latency, regardless of carbon)
export const getNearestStandardNode = (): DataNode => {
  return STANDARD_NODES.reduce((prev, curr) => prev.latency < curr.latency ? prev : curr);
};

// Helper: Check if a model is a Frontier model
export const isFrontierModel = (modelId: string): boolean => {
  return FRONTIER_MODELS.some(m => m.id === modelId);
};

// Helper: Check if a model is an SLM
export const isSLMModel = (modelId: string): boolean => {
  return SLM_MODELS.some(m => m.id === modelId);
};

// Helper: Check if a model is a Local model
export const isLocalModel = (modelId: string): boolean => {
  return LOCAL_MODELS.some(m => m.id === modelId);
};

// Calculate carbon metrics
export const calculateCarbonSaved = (greenNode: DataNode, standardNode: DataNode): number => {
  const kWhPerQuery = 0.01;
  const standardEmission = standardNode.carbonIntensity * kWhPerQuery;
  const greenEmission = greenNode.carbonIntensity * kWhPerQuery;
  return Number((standardEmission - greenEmission).toFixed(1));
};

export const calculateCarbonEmitted = (node: DataNode): number => {
  const kWhPerQuery = 0.01;
  return Number((node.carbonIntensity * kWhPerQuery).toFixed(1));
};
