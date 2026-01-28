# Greenference OS 🌿
> **Intent-Based Routing for the AI Era.**

![Greenference Banner](/public/leaf.svg)

## The Problem: The "Ferrari for a Grocery Run"
We use massive, energy-hungry "Frontier Models" (like GPT-4 or Claude 3.5) for trivial tasks (e.g., "Hi," "What is 2+2?"). This inefficiency results in massive, unnecessary carbon emissions.

## The Solution: Intelligent Middleware
**Greenference** acts as an intelligent middleware layer between the user and model providers. It analyzes the intent of the user's query and automatically routes it to the most energy-efficient compute path:
1.  **Edge AI (Local)**: Zero carbon, immediate response.
2.  **Green SLM (Small Language Models)**: High efficiency, green energy nodes.
3.  **Frontier Models**: Only when necessary, and routed to sustainable data centers.

---

## 🚀 Key Features

### 🧠 Intent-Based Routing
The system analyzes query complexity in real-time (Trivial, Low, Medium, High) and dynamically selects the compute node. A visual "Cinematic Routing" animation demonstrates this negotiation process.

### 🌍 Strategic "Green Mode"
-   **Data Center Awareness**: Even Frontier models can be routed to "Green Nodes" (e.g., Mumbai-Hydro).
-   **Edge First**: Local/On-Device inference is treated as the gold standard (0g emissions).
-   **The Nudge**: We don't force users; we nudge them. Simple queries in high-energy modes trigger efficiency tips.

### 💎 The "Save into Spend" Economy
-   **Credits**: Earned by saving carbon on simple tasks.
-   **Deep Research**: Spend credits to unlock high-compute capabilities for complex problems.
-   **Streaks**: Daily metrics to encourage consistent sustainable behavior.

### 📊 Impact Dashboard
Track your net carbon impact with tangible metaphors (e.g., "Equivalent to 12 trees planted") and view detailed carbon receipts for every interaction.

---

## 🛠️ Technical Implementation

**Greenference** is a high-fidelity prototype built with a modern frontend stack:

-   **Framework**: React (Vite)
-   **Styling**: Tailwind CSS, PostCSS
-   **Animation**: Framer Motion (Complex state orchestration)
-   **Icons**: Lucide React
-   **Language**: TypeScript

### Architecture Highlights
-   **Frontend-Only Simulation**: All latency, routing logic, and AI responses are simulated with high-fidelity mock data.
-   **State Machine (`useChat.ts`)**: Manages the 5-step routing flow, credit calculations, and auto-switching logic.
-   **Mock Infrastructure**: Simulates routing between "Green Nodes" (Iceland-Geo) and "Standard Nodes" (Virginia-Coal).

---

## 🧪 Demo Flow ("The Golden Path")

1.  **Auto Mode**: Start with the "✨" icon selected.
2.  **Trivial Query**: Ask "What is the capital of France?"
    -   *Result*: Routes to **Local Node**. Zero Carbon receipt.
3.  **Complex Query**: Ask "Simulate a quantum field topology."
    -   *Result*: Routes to **Iceland-Geo** (Green Frontier Node).
4.  **Unlock**: Reach 10 credits to see the "Deep Research Unlocked" celebration.

---

## 📦 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/anurag01a/greenference.git
    cd greenference
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📄 License
MIT
