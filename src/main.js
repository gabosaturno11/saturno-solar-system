import { createApp, reactive } from 'vue'
import App from './App.vue'
import './styles/main.css'

// Global state management (lightweight alternative to Vuex for MVP)
const globalState = reactive({
  // Load all JSONs at startup
  solarSystem: null,
  frameworks: null,
  powerFreeSkills: null,
  exercises: null,
  currentView: 'dashboard',
  selectedFramework: null,
  selectedPlanet: null,
  selectedExercise: null,

  // Command center
  commandLog: [],
  executedCommands: new Set(),

  // Embedded prompts as commands
  commands: {
    'LOAD_SOLAR_SYSTEM': async () => {
      try {
        const response = await fetch('/data/complete_solar_system_database.json')
        if (!response.ok) throw new Error('Failed to load solar system')
        globalState.solarSystem = await response.json()
        globalState.addLog('✅ Solar System loaded')
      } catch (err) {
        globalState.addLog(`⚠️ Solar System: Using demo data`)
        globalState.solarSystem = generateDemoSolarSystem()
      }
    },
    'LOAD_FRAMEWORKS': async () => {
      try {
        const response = await fetch('/data/10_framework_combinations.json')
        if (!response.ok) throw new Error('Failed to load frameworks')
        globalState.frameworks = await response.json()
        globalState.addLog('✅ Frameworks loaded')
      } catch (err) {
        globalState.addLog(`⚠️ Frameworks: Using demo data`)
        globalState.frameworks = generateDemoFrameworks()
      }
    },
    'LOAD_POWER_FREE': async () => {
      try {
        const response = await fetch('/data/power_free_skills_breakdown.json')
        if (!response.ok) throw new Error('Failed to load power free')
        globalState.powerFreeSkills = await response.json()
        globalState.addLog('✅ Power Free skills loaded')
      } catch (err) {
        globalState.addLog(`⚠️ Power Free: Using demo data`)
        globalState.powerFreeSkills = generateDemoPowerFree()
      }
    },
    'INITIALIZE_SYSTEM': async () => {
      globalState.addLog('🚀 Initializing Saturno Solar System...')
      await globalState.commands['LOAD_SOLAR_SYSTEM']()
      await globalState.commands['LOAD_FRAMEWORKS']()
      await globalState.commands['LOAD_POWER_FREE']()
      globalState.addLog('🌟 System ready!')
    }
  },

  // Helper methods
  addLog(message) {
    this.commandLog.push({
      timestamp: new Date().toISOString(),
      message,
      id: Math.random().toString(36).substr(2, 9)
    })
    // Keep only last 50 logs
    if (this.commandLog.length > 50) {
      this.commandLog = this.commandLog.slice(-50)
    }
  },

  async executeCommand(cmd, params) {
    if (this.commands[cmd]) {
      this.executedCommands.add(cmd)
      try {
        await this.commands[cmd](params)
        return true
      } catch (err) {
        this.addLog(`❌ Error: ${err.message}`)
        return false
      }
    }
    return false
  }
})

// Demo data generators
function generateDemoSolarSystem() {
  return {
    name: "Saturno Movement Universe",
    description: "The complete ecosystem of calisthenics mastery",
    planets: [
      { id: "foundation", name: "Foundation", type: "core", exercises: 45, color: "#3b82f6", description: "Basic movement patterns and body awareness", icon: "🌍" },
      { id: "strength", name: "Strength", type: "core", exercises: 120, color: "#ef4444", description: "Progressive strength development", icon: "💪" },
      { id: "skills", name: "Skills", type: "advanced", exercises: 85, color: "#8b5cf6", description: "Complex movement skills", icon: "🎯" },
      { id: "mobility", name: "Mobility", type: "support", exercises: 60, color: "#22c55e", description: "Joint health and flexibility", icon: "🧘" },
      { id: "power", name: "Power", type: "advanced", exercises: 40, color: "#f59e0b", description: "Explosive movements", icon: "⚡" },
      { id: "endurance", name: "Endurance", type: "support", exercises: 35, color: "#06b6d4", description: "Cardiovascular conditioning", icon: "🔥" }
    ],
    pathways: [
      { from: "foundation", to: "strength", weight: 1 },
      { from: "strength", to: "skills", weight: 0.8 },
      { from: "mobility", to: "strength", weight: 0.6 },
      { from: "power", to: "skills", weight: 0.7 },
      { from: "foundation", to: "mobility", weight: 0.9 },
      { from: "endurance", to: "power", weight: 0.5 }
    ],
    totalExercises: 700
  }
}

function generateDemoFrameworks() {
  return {
    frameworks: [
      {
        id: 1,
        name: "Procrastination as Emotion Regulation",
        category: "Psychology",
        core_claim: "Procrastination is often not a time problem but an emotion problem",
        mechanism: "Anticipated negative affect drives delay; relief reinforces the habit loop",
        evidence: "Lab and diary studies show affect-delay correlation (Pychyl & Sirois, 2016)",
        practical: "Reduce task aversion by shrinking scope with 2-minute gateways",
        book_placement: "Ch1: Why behavior - barriers sidebar",
        color: "#f59e0b"
      },
      {
        id: 2,
        name: "Movement as First Language",
        category: "Movement",
        core_claim: "The body learns like language: repetition with variation wires fluency",
        mechanism: "Contextual interference improves differential learning and transfer",
        evidence: "Cross-study consensus on transfer benefits (Schmidt & Lee, 2019)",
        practical: "Mix 70% core drills with 30% playful variations",
        book_placement: "Introduction: top-tier subsection",
        color: "#3b82f6"
      },
      {
        id: 3,
        name: "Neural Plasticity in Adults",
        category: "Neuroscience",
        core_claim: "Adult brains remain plastic and capable of significant reorganization",
        mechanism: "Myelination and synaptic pruning respond to deliberate practice",
        evidence: "Neuroimaging studies of experts show brain changes (Pascual-Leone)",
        practical: "Consistent practice builds neural pathways even in adulthood",
        book_placement: "Part 1: Brain adaptation to training",
        color: "#8b5cf6"
      },
      {
        id: 4,
        name: "Systems Thinking in Training",
        category: "Philosophy",
        core_claim: "Movement systems are interconnected; optimizing one affects all",
        mechanism: "Transfer effects compound across multiple domains",
        evidence: "Longitudinal studies show system-wide improvements",
        practical: "Design programs that integrate strength, mobility, and skill",
        book_placement: "Part 2: Integrated training approach",
        color: "#22c55e"
      },
      {
        id: 5,
        name: "Deliberate Practice Framework",
        category: "Performance",
        core_claim: "Expertise requires focused, goal-directed practice with feedback",
        mechanism: "Mental representations improve through targeted repetition",
        evidence: "Ericsson's research across multiple domains",
        practical: "Structure sessions with clear objectives and immediate feedback",
        book_placement: "Part 3: Training methodology",
        color: "#ef4444"
      },
      {
        id: 6,
        name: "Flow State Optimization",
        category: "Psychology",
        core_claim: "Optimal performance occurs in the challenge-skill sweet spot",
        mechanism: "Autotelic experience emerges when challenge matches ability",
        evidence: "Csikszentmihalyi's decades of flow research",
        practical: "Progress exercises to maintain 4% challenge above current skill",
        book_placement: "Part 3: Mental models for progress",
        color: "#06b6d4"
      },
      {
        id: 7,
        name: "Embodied Cognition",
        category: "Neuroscience",
        core_claim: "Cognition is shaped by the body's interactions with the environment",
        mechanism: "Sensorimotor experience grounds abstract thinking",
        evidence: "Wilson, 2002; Barsalou, 2008 - embodiment studies",
        practical: "Use physical metaphors to enhance learning complex concepts",
        book_placement: "Introduction: Movement DNA concept",
        color: "#ec4899"
      },
      {
        id: 8,
        name: "Progressive Overload Principle",
        category: "Training",
        core_claim: "Adaptation requires systematic increase in training stress",
        mechanism: "Supercompensation follows stress-recovery cycles",
        evidence: "Foundational strength training research (Selye, 1956)",
        practical: "Increase difficulty by 2-5% when current level feels manageable",
        book_placement: "Part 4: Programming principles",
        color: "#84cc16"
      },
      {
        id: 9,
        name: "Minimum Effective Dose",
        category: "Training",
        core_claim: "Optimal results come from precise, not maximal, stimulus",
        mechanism: "Recovery capacity is limited; excess volume impairs adaptation",
        evidence: "Training frequency studies show diminishing returns",
        practical: "Find the smallest stimulus that produces measurable progress",
        book_placement: "Part 4: Sustainable training",
        color: "#a855f7"
      },
      {
        id: 10,
        name: "Identity-Based Habit Formation",
        category: "Psychology",
        core_claim: "Lasting change comes from identity shifts, not outcome goals",
        mechanism: "Self-concept drives consistent behavior choices",
        evidence: "James Clear's synthesis of habit research",
        practical: "Frame practice as 'what athletes like me do' not 'what I must do'",
        book_placement: "Part 1: Building the practitioner mindset",
        color: "#14b8a6"
      }
    ]
  }
}

function generateDemoPowerFree() {
  return {
    skills: [
      { id: "planche", name: "Planche", difficulty: 9, prerequisites: ["handstand", "planche_lean"], category: "push", description: "Full body horizontal hold with straight arms", icon: "🔥" },
      { id: "front_lever", name: "Front Lever", difficulty: 8, prerequisites: ["pull_up", "dragon_flag"], category: "pull", description: "Horizontal hang with body parallel to ground", icon: "⚡" },
      { id: "handstand", name: "Handstand", difficulty: 6, prerequisites: ["pike_push_up", "wall_handstand"], category: "balance", description: "Inverted balance on hands", icon: "🎯" },
      { id: "muscle_up", name: "Muscle Up", difficulty: 7, prerequisites: ["pull_up", "dip"], category: "transition", description: "Pull-up transitioning to dip position", icon: "💪" },
      { id: "human_flag", name: "Human Flag", difficulty: 8, prerequisites: ["side_plank", "pull_up"], category: "lateral", description: "Lateral hold on vertical pole", icon: "🚩" },
      { id: "back_lever", name: "Back Lever", difficulty: 7, prerequisites: ["skin_the_cat", "german_hang"], category: "pull", description: "Horizontal hang facing down", icon: "🌟" },
      { id: "l_sit", name: "L-Sit", difficulty: 5, prerequisites: ["support_hold", "leg_raises"], category: "push", description: "Sitting position with legs horizontal", icon: "🪑" },
      { id: "pistol_squat", name: "Pistol Squat", difficulty: 6, prerequisites: ["deep_squat", "single_leg_balance"], category: "legs", description: "Single leg full squat", icon: "🦵" }
    ],
    categories: ["push", "pull", "balance", "transition", "lateral", "legs"],
    totalSkills: 8
  }
}

// Make globally available
const app = createApp(App)
app.config.globalProperties.$state = globalState

app.mount('#app')

// Initialize on load
window.addEventListener('load', () => {
  globalState.executeCommand('INITIALIZE_SYSTEM')
})

export { globalState }
