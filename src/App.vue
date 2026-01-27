<template>
  <div class="app-container">
    <!-- Animated Background -->
    <div class="stars-bg"></div>

    <!-- Header -->
    <header class="app-header">
      <div class="header-content">
        <div class="logo-section">
          <span class="logo-icon">🪐</span>
          <div>
            <h1 class="gradient-gold">SATURNO SOLAR SYSTEM</h1>
            <p class="tagline">Movement Mastery Ecosystem | Victory Belt MVP</p>
          </div>
        </div>
        <div class="header-stats">
          <div class="stat-badge">
            <span class="stat-value">{{ totalExercises }}</span>
            <span class="stat-label">Exercises</span>
          </div>
          <div class="stat-badge">
            <span class="stat-value">{{ frameworkCount }}</span>
            <span class="stat-label">Frameworks</span>
          </div>
          <div class="stat-badge status" :class="systemReady ? 'ready' : 'loading'">
            <span class="stat-value">{{ systemReady ? '🟢' : '🟡' }}</span>
            <span class="stat-label">{{ systemReady ? 'Ready' : 'Loading' }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Navigation -->
    <nav class="nav-tabs">
      <button
        v-for="tab in navTabs"
        :key="tab.id"
        @click="currentView = tab.id"
        :class="['nav-tab', { active: currentView === tab.id }]"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <!-- Dashboard View -->
      <section v-if="currentView === 'dashboard'" class="view-section animate-fade-in">
        <div class="dashboard-hero">
          <h2>🌌 Welcome to the Universe</h2>
          <p>Your complete ecosystem for mastering calisthenics movement</p>
        </div>

        <div class="dashboard-grid">
          <div class="feature-card" @click="currentView = 'solar'">
            <div class="card-icon">🪐</div>
            <h3>Solar System</h3>
            <p>Explore the movement universe with interactive planets representing each training domain</p>
            <div class="card-stats">6 Planets • 700 Exercises</div>
          </div>

          <div class="feature-card" @click="currentView = 'research'">
            <div class="card-icon">📊</div>
            <h3>Research Cards</h3>
            <p>Access 10 research frameworks with evidence-based insights for the book</p>
            <div class="card-stats">10 Frameworks • Copy Ready</div>
          </div>

          <div class="feature-card" @click="currentView = 'skills'">
            <div class="card-icon">⚡</div>
            <h3>Power Free Skills</h3>
            <p>Master advanced skills with prerequisite mapping and progression paths</p>
            <div class="card-stats">8 Skills • Skill Tree</div>
          </div>

          <div class="feature-card" @click="currentView = 'commands'">
            <div class="card-icon">🎮</div>
            <h3>Command Center</h3>
            <p>Execute system commands and view the complete activity log</p>
            <div class="card-stats">Live Monitoring</div>
          </div>
        </div>

        <div class="quick-stats">
          <h3>📊 System Status</h3>
          <div class="status-grid">
            <div class="status-item" :class="{ loaded: $state.solarSystem }">
              <span class="status-icon">{{ $state.solarSystem ? '✅' : '⏳' }}</span>
              <span>Solar System Data</span>
            </div>
            <div class="status-item" :class="{ loaded: $state.frameworks }">
              <span class="status-icon">{{ $state.frameworks ? '✅' : '⏳' }}</span>
              <span>Research Frameworks</span>
            </div>
            <div class="status-item" :class="{ loaded: $state.powerFreeSkills }">
              <span class="status-icon">{{ $state.powerFreeSkills ? '✅' : '⏳' }}</span>
              <span>Power Free Skills</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Solar System View -->
      <section v-if="currentView === 'solar'" class="view-section animate-fade-in">
        <div class="section-header">
          <h2>🪐 Solar System</h2>
          <button @click="currentView = 'dashboard'" class="btn-back">← Back</button>
        </div>

        <div class="solar-system-container">
          <div class="solar-center">
            <div class="sun">
              <span>☀️</span>
              <div class="sun-label">MASTERY</div>
            </div>
          </div>

          <div class="planets-orbit">
            <div
              v-for="(planet, idx) in planets"
              :key="planet.id"
              class="planet"
              :class="{ selected: selectedPlanet === planet.id }"
              :style="{
                '--orbit-radius': `${120 + idx * 70}px`,
                '--delay': `${idx * -3}s`,
                '--color': planet.color
              }"
              @click="selectPlanet(planet)"
            >
              <span class="planet-icon">{{ planet.icon }}</span>
              <span class="planet-name">{{ planet.name }}</span>
            </div>
          </div>
        </div>

        <div v-if="selectedPlanetData" class="planet-details">
          <h3>{{ selectedPlanetData.icon }} {{ selectedPlanetData.name }}</h3>
          <p>{{ selectedPlanetData.description }}</p>
          <div class="planet-stats">
            <span class="badge">{{ selectedPlanetData.exercises }} exercises</span>
            <span class="badge" :style="{ background: selectedPlanetData.color }">{{ selectedPlanetData.type }}</span>
          </div>
        </div>

        <div class="pathways-section">
          <h3>🛤️ Training Pathways</h3>
          <div class="pathways-grid">
            <div v-for="path in pathways" :key="`${path.from}-${path.to}`" class="pathway-card">
              <span>{{ getPlanetIcon(path.from) }} → {{ getPlanetIcon(path.to) }}</span>
              <div class="pathway-strength" :style="{ width: `${path.weight * 100}%` }"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Research Cards View -->
      <section v-if="currentView === 'research'" class="view-section animate-fade-in">
        <div class="section-header">
          <h2>📊 Research Frameworks</h2>
          <button @click="currentView = 'dashboard'" class="btn-back">← Back</button>
        </div>

        <div class="search-bar">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search frameworks..."
            class="search-input"
          />
          <select v-model="categoryFilter" class="filter-select">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>

        <div class="frameworks-grid">
          <div
            v-for="framework in filteredFrameworks"
            :key="framework.id"
            class="framework-card"
            :style="{ borderColor: framework.color }"
            @click="selectFramework(framework)"
          >
            <div class="framework-header">
              <span class="framework-category" :style="{ background: framework.color }">{{ framework.category }}</span>
              <span class="framework-id">#{{ framework.id }}</span>
            </div>
            <h4>{{ framework.name }}</h4>
            <p class="core-claim">{{ framework.core_claim }}</p>
            <div class="framework-actions">
              <button @click.stop="copyFramework(framework)" class="btn-small">📋 Copy</button>
              <button @click.stop="selectFramework(framework)" class="btn-small btn-primary">📖 Details</button>
            </div>
          </div>
        </div>

        <!-- Framework Modal -->
        <div v-if="selectedFramework" class="modal-overlay" @click="selectedFramework = null">
          <div class="modal-content" @click.stop>
            <button @click="selectedFramework = null" class="btn-close">✕</button>
            <div class="modal-header" :style="{ borderColor: selectedFramework.color }">
              <span class="modal-category" :style="{ background: selectedFramework.color }">{{ selectedFramework.category }}</span>
              <h2>{{ selectedFramework.name }}</h2>
            </div>

            <div class="framework-details">
              <div class="detail-section">
                <h4>💡 Core Claim</h4>
                <p>{{ selectedFramework.core_claim }}</p>
              </div>
              <div class="detail-section">
                <h4>⚙️ Mechanism</h4>
                <p>{{ selectedFramework.mechanism }}</p>
              </div>
              <div class="detail-section">
                <h4>📚 Evidence</h4>
                <p>{{ selectedFramework.evidence }}</p>
              </div>
              <div class="detail-section">
                <h4>🎯 Practical Application</h4>
                <p>{{ selectedFramework.practical }}</p>
              </div>
              <div class="detail-section">
                <h4>📖 Book Placement</h4>
                <p>{{ selectedFramework.book_placement }}</p>
              </div>
            </div>

            <div class="modal-actions">
              <button @click="copyFullFramework(selectedFramework)" class="btn btn-primary">📋 Copy Full Card</button>
              <button @click="markAsUsed(selectedFramework)" class="btn btn-secondary">✅ Mark as Used</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills View -->
      <section v-if="currentView === 'skills'" class="view-section animate-fade-in">
        <div class="section-header">
          <h2>⚡ Power Free Skills</h2>
          <button @click="currentView = 'dashboard'" class="btn-back">← Back</button>
        </div>

        <div class="skills-grid">
          <div
            v-for="skill in skills"
            :key="skill.id"
            class="skill-card"
            :class="{ selected: selectedSkill === skill.id }"
            @click="selectedSkill = selectedSkill === skill.id ? null : skill.id"
          >
            <div class="skill-icon">{{ skill.icon }}</div>
            <h4>{{ skill.name }}</h4>
            <div class="skill-difficulty">
              <span>Difficulty:</span>
              <div class="difficulty-bar">
                <div class="difficulty-fill" :style="{ width: `${skill.difficulty * 10}%` }"></div>
              </div>
              <span>{{ skill.difficulty }}/10</span>
            </div>
            <p class="skill-description">{{ skill.description }}</p>
            <div class="skill-category">{{ skill.category }}</div>

            <div v-if="selectedSkill === skill.id" class="skill-prereqs">
              <h5>Prerequisites:</h5>
              <div class="prereq-list">
                <span v-for="prereq in skill.prerequisites" :key="prereq" class="prereq-badge">
                  {{ formatPrereq(prereq) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="skill-tree-hint">
          <p>💡 Click any skill to see its prerequisites</p>
        </div>
      </section>

      <!-- Command Center View -->
      <section v-if="currentView === 'commands'" class="view-section animate-fade-in">
        <div class="section-header">
          <h2>🎮 Command Center</h2>
          <button @click="currentView = 'dashboard'" class="btn-back">← Back</button>
        </div>

        <div class="commands-grid">
          <div class="command-panel">
            <h3>⚡ Quick Commands</h3>
            <div class="command-buttons">
              <button @click="executeCommand('INITIALIZE_SYSTEM')" class="cmd-btn">🚀 Re-Initialize System</button>
              <button @click="executeCommand('LOAD_SOLAR_SYSTEM')" class="cmd-btn">🪐 Reload Solar System</button>
              <button @click="executeCommand('LOAD_FRAMEWORKS')" class="cmd-btn">📊 Reload Frameworks</button>
              <button @click="executeCommand('LOAD_POWER_FREE')" class="cmd-btn">⚡ Reload Skills</button>
            </div>
          </div>

          <div class="log-panel">
            <h3>📡 Activity Log</h3>
            <div class="log-container">
              <div v-for="log in reversedLogs" :key="log.id" class="log-entry">
                <span class="log-time">{{ formatTime(log.timestamp) }}</span>
                <span class="log-message">{{ log.message }}</span>
              </div>
              <div v-if="$state.commandLog.length === 0" class="log-empty">
                No commands executed yet
              </div>
            </div>
          </div>
        </div>

        <div class="system-info">
          <h3>ℹ️ System Information</h3>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Total Commands Executed:</span>
              <span class="info-value">{{ $state.executedCommands.size }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Log Entries:</span>
              <span class="info-value">{{ $state.commandLog.length }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">System Status:</span>
              <span class="info-value" :class="systemReady ? 'status-ready' : 'status-loading'">
                {{ systemReady ? 'All Systems Operational' : 'Loading...' }}
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span>🪐 Saturno Solar System</span>
          <span class="footer-divider">|</span>
          <span>Victory Belt Publishing MVP</span>
        </div>
        <div class="footer-log">
          <span v-if="latestLog">{{ latestLog.message }}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentView: 'dashboard',
      searchQuery: '',
      categoryFilter: '',
      selectedPlanet: null,
      selectedFramework: null,
      selectedSkill: null,
      usedFrameworks: new Set(),
      navTabs: [
        { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { id: 'solar', label: 'Solar System', icon: '🪐' },
        { id: 'research', label: 'Research', icon: '📊' },
        { id: 'skills', label: 'Skills', icon: '⚡' },
        { id: 'commands', label: 'Commands', icon: '🎮' }
      ]
    }
  },
  computed: {
    systemReady() {
      return this.$state.solarSystem && this.$state.frameworks && this.$state.powerFreeSkills
    },
    totalExercises() {
      return this.$state.solarSystem?.totalExercises || 700
    },
    frameworkCount() {
      return this.$state.frameworks?.frameworks?.length || 10
    },
    planets() {
      return this.$state.solarSystem?.planets || []
    },
    pathways() {
      return this.$state.solarSystem?.pathways || []
    },
    frameworks() {
      return this.$state.frameworks?.frameworks || []
    },
    skills() {
      return this.$state.powerFreeSkills?.skills || []
    },
    categories() {
      const cats = new Set(this.frameworks.map(f => f.category))
      return Array.from(cats)
    },
    filteredFrameworks() {
      return this.frameworks.filter(f => {
        const matchSearch = f.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           f.core_claim.toLowerCase().includes(this.searchQuery.toLowerCase())
        const matchCategory = !this.categoryFilter || f.category === this.categoryFilter
        return matchSearch && matchCategory
      })
    },
    selectedPlanetData() {
      if (!this.selectedPlanet) return null
      return this.planets.find(p => p.id === this.selectedPlanet)
    },
    reversedLogs() {
      return [...this.$state.commandLog].reverse().slice(0, 20)
    },
    latestLog() {
      return this.$state.commandLog[this.$state.commandLog.length - 1]
    }
  },
  methods: {
    selectPlanet(planet) {
      this.selectedPlanet = this.selectedPlanet === planet.id ? null : planet.id
      this.$state.addLog(`🪐 Selected planet: ${planet.name}`)
    },
    getPlanetIcon(planetId) {
      const planet = this.planets.find(p => p.id === planetId)
      return planet ? planet.icon : '🌑'
    },
    selectFramework(framework) {
      this.selectedFramework = framework
      this.$state.addLog(`📊 Viewing: ${framework.name}`)
    },
    copyFramework(framework) {
      const text = `${framework.name}\n\n${framework.core_claim}\n\nBook Placement: ${framework.book_placement}`
      navigator.clipboard.writeText(text)
      this.$state.addLog(`📋 Copied: ${framework.name}`)
    },
    copyFullFramework(framework) {
      const text = JSON.stringify(framework, null, 2)
      navigator.clipboard.writeText(text)
      this.$state.addLog(`📋 Full card copied: ${framework.name}`)
    },
    markAsUsed(framework) {
      this.usedFrameworks.add(framework.id)
      this.$state.addLog(`✅ Marked as used: ${framework.name}`)
      this.selectedFramework = null
    },
    formatPrereq(prereq) {
      return prereq.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    },
    executeCommand(cmd) {
      this.$state.executeCommand(cmd)
    },
    formatTime(iso) {
      return new Date(iso).toLocaleTimeString()
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%);
  color: #e2e8f0;
  position: relative;
  overflow-x: hidden;
}

.stars-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(2px 2px at 20px 30px, #d4af37, transparent),
    radial-gradient(2px 2px at 40px 70px, #fff, transparent),
    radial-gradient(1px 1px at 90px 40px, #8b5cf6, transparent),
    radial-gradient(2px 2px at 160px 120px, #d4af37, transparent),
    radial-gradient(1px 1px at 230px 80px, #fff, transparent),
    radial-gradient(2px 2px at 300px 150px, #3b82f6, transparent);
  background-size: 400px 200px;
  animation: twinkle 8s ease-in-out infinite;
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

/* Header */
.app-header {
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.3);
  padding: 1rem 2rem;
  position: relative;
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  font-size: 2.5rem;
  animation: float 6s ease-in-out infinite;
}

.logo-section h1 {
  margin: 0;
  font-size: 1.5rem;
  letter-spacing: 2px;
}

.tagline {
  margin: 0;
  font-size: 0.85rem;
  color: #8b949e;
}

.header-stats {
  display: flex;
  gap: 1rem;
}

.stat-badge {
  background: rgba(30, 30, 40, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.2rem;
  font-weight: bold;
  color: #d4af37;
}

.stat-label {
  font-size: 0.75rem;
  color: #8b949e;
}

.stat-badge.status.ready {
  border-color: #22c55e;
}

.stat-badge.status.loading {
  border-color: #f59e0b;
}

/* Navigation */
.nav-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(20, 20, 30, 0.9);
  border-bottom: 1px solid rgba(100, 100, 120, 0.2);
  overflow-x: auto;
  position: relative;
  z-index: 10;
}

.nav-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(40, 40, 60, 0.5);
  border: 1px solid rgba(100, 100, 120, 0.3);
  color: #8b949e;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-tab:hover {
  background: rgba(60, 60, 80, 0.6);
  color: #e2e8f0;
  border-color: rgba(212, 175, 55, 0.3);
}

.nav-tab.active {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
  color: #d4af37;
  border-color: #d4af37;
}

.tab-icon {
  font-size: 1.1rem;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 5;
}

.view-section {
  animation: fadeIn 0.3s ease-out;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  margin: 0;
  color: #d4af37;
  font-size: 1.8rem;
}

.btn-back {
  background: rgba(40, 40, 60, 0.5);
  border: 1px solid rgba(100, 100, 120, 0.3);
  color: #8b949e;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-back:hover {
  background: rgba(60, 60, 80, 0.6);
  color: #e2e8f0;
}

/* Dashboard */
.dashboard-hero {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-hero h2 {
  font-size: 2rem;
  color: #d4af37;
  margin-bottom: 0.5rem;
}

.dashboard-hero p {
  color: #8b949e;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(100, 100, 120, 0.2);
  padding: 2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #d4af37;
  box-shadow: 0 10px 40px rgba(212, 175, 55, 0.15);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #e2e8f0;
  margin: 0 0 0.5rem 0;
}

.feature-card p {
  color: #8b949e;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.card-stats {
  font-size: 0.85rem;
  color: #d4af37;
  font-weight: 500;
}

.quick-stats {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(100, 100, 120, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
}

.quick-stats h3 {
  color: #d4af37;
  margin-top: 0;
}

.status-grid {
  display: grid;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(10, 10, 15, 0.5);
  border-radius: 8px;
  color: #8b949e;
}

.status-item.loaded {
  color: #22c55e;
}

.status-icon {
  font-size: 1.2rem;
}

/* Solar System */
.solar-system-container {
  position: relative;
  height: 500px;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.solar-center {
  position: absolute;
  z-index: 10;
}

.sun {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, #fcd34d 0%, #f59e0b 50%, #d97706 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 60px rgba(252, 211, 77, 0.6);
  animation: pulse-glow 3s ease-in-out infinite;
}

.sun span {
  font-size: 2rem;
}

.sun-label {
  font-size: 0.7rem;
  font-weight: bold;
  color: #451a03;
}

.planets-orbit {
  position: absolute;
  width: 100%;
  height: 100%;
}

.planet {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: orbit 20s linear infinite;
  animation-delay: var(--delay);
  cursor: pointer;
  transition: transform 0.3s;
}

.planet::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: calc(var(--orbit-radius) * 2);
  height: calc(var(--orbit-radius) * 2);
  border: 1px dashed rgba(100, 100, 120, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.planet-icon {
  display: block;
  font-size: 2rem;
  animation: orbit 20s linear infinite reverse;
  animation-delay: var(--delay);
}

.planet-name {
  display: block;
  font-size: 0.7rem;
  color: #8b949e;
  white-space: nowrap;
}

.planet.selected {
  z-index: 100;
}

.planet.selected .planet-icon {
  transform: scale(1.5);
}

.planet-details {
  background: rgba(20, 20, 30, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 2rem;
}

.planet-details h3 {
  color: #d4af37;
  margin-top: 0;
}

.planet-stats {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  background: rgba(100, 100, 120, 0.3);
  border-radius: 20px;
  font-size: 0.85rem;
}

.pathways-section {
  margin-top: 2rem;
}

.pathways-section h3 {
  color: #d4af37;
}

.pathways-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.pathway-card {
  background: rgba(20, 20, 30, 0.8);
  padding: 1rem;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.pathway-strength {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #d4af37, #8b5cf6);
}

/* Research Cards */
.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input, .filter-select {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(100, 100, 120, 0.3);
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 0.95rem;
}

.search-input:focus, .filter-select:focus {
  outline: none;
  border-color: #d4af37;
}

.frameworks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.framework-card {
  background: rgba(20, 20, 30, 0.8);
  border: 2px solid rgba(100, 100, 120, 0.2);
  border-left-width: 4px;
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.framework-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.framework-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.framework-category {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: white;
}

.framework-id {
  color: #8b949e;
  font-size: 0.85rem;
}

.framework-card h4 {
  color: #e2e8f0;
  margin: 0 0 0.5rem 0;
}

.core-claim {
  color: #8b949e;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.framework-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-small {
  flex: 1;
  padding: 0.5rem;
  background: rgba(40, 40, 60, 0.5);
  border: 1px solid rgba(100, 100, 120, 0.3);
  color: #8b949e;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.btn-small:hover {
  background: rgba(60, 60, 80, 0.6);
  color: #e2e8f0;
}

.btn-small.btn-primary {
  background: rgba(212, 175, 55, 0.2);
  border-color: rgba(212, 175, 55, 0.3);
  color: #d4af37;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: rgba(20, 20, 30, 0.98);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 16px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.btn-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #8b949e;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-header {
  border-left: 4px solid;
  padding-left: 1rem;
  margin-bottom: 1.5rem;
}

.modal-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: white;
  margin-bottom: 0.5rem;
}

.modal-header h2 {
  color: #e2e8f0;
  margin: 0;
}

.framework-details {
  margin-bottom: 1.5rem;
}

.detail-section {
  margin-bottom: 1.25rem;
}

.detail-section h4 {
  color: #d4af37;
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
}

.detail-section p {
  color: #c9d1d9;
  margin: 0;
  line-height: 1.6;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s;
  border: 1px solid;
}

.btn-primary {
  background: rgba(212, 175, 55, 0.2);
  border-color: #d4af37;
  color: #d4af37;
}

.btn-primary:hover {
  background: rgba(212, 175, 55, 0.3);
}

.btn-secondary {
  background: rgba(34, 197, 94, 0.2);
  border-color: #22c55e;
  color: #22c55e;
}

.btn-secondary:hover {
  background: rgba(34, 197, 94, 0.3);
}

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.skill-card {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(100, 100, 120, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.skill-card:hover, .skill-card.selected {
  border-color: #8b5cf6;
  box-shadow: 0 5px 20px rgba(139, 92, 246, 0.2);
}

.skill-icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
}

.skill-card h4 {
  color: #e2e8f0;
  margin: 0 0 0.75rem 0;
}

.skill-difficulty {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #8b949e;
  margin-bottom: 0.75rem;
}

.difficulty-bar {
  flex: 1;
  height: 6px;
  background: rgba(100, 100, 120, 0.3);
  border-radius: 3px;
  overflow: hidden;
}

.difficulty-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
  border-radius: 3px;
}

.skill-description {
  color: #8b949e;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.skill-category {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
  border-radius: 20px;
  font-size: 0.8rem;
}

.skill-prereqs {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(100, 100, 120, 0.2);
}

.skill-prereqs h5 {
  color: #d4af37;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
}

.prereq-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.prereq-badge {
  padding: 0.25rem 0.5rem;
  background: rgba(100, 100, 120, 0.2);
  border-radius: 4px;
  font-size: 0.8rem;
  color: #8b949e;
}

.skill-tree-hint {
  text-align: center;
  margin-top: 2rem;
  color: #8b949e;
}

/* Command Center */
.commands-grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.command-panel, .log-panel {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(100, 100, 120, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
}

.command-panel h3, .log-panel h3 {
  color: #d4af37;
  margin-top: 0;
}

.command-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cmd-btn {
  padding: 0.75rem 1rem;
  background: rgba(40, 40, 60, 0.5);
  border: 1px solid rgba(100, 100, 120, 0.3);
  color: #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;
}

.cmd-btn:hover {
  background: rgba(212, 175, 55, 0.2);
  border-color: #d4af37;
}

.log-container {
  background: rgba(10, 10, 15, 0.5);
  border-radius: 8px;
  padding: 1rem;
  max-height: 300px;
  overflow-y: auto;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.85rem;
}

.log-entry {
  display: flex;
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(100, 100, 120, 0.1);
}

.log-time {
  color: #8b949e;
  min-width: 80px;
}

.log-message {
  color: #79c0ff;
}

.log-empty {
  color: #8b949e;
  text-align: center;
  padding: 2rem;
}

.system-info {
  background: rgba(20, 20, 30, 0.8);
  border: 1px solid rgba(100, 100, 120, 0.2);
  padding: 1.5rem;
  border-radius: 12px;
}

.system-info h3 {
  color: #d4af37;
  margin-top: 0;
}

.info-grid {
  display: grid;
  gap: 0.75rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: rgba(10, 10, 15, 0.5);
  border-radius: 8px;
}

.info-label {
  color: #8b949e;
}

.info-value {
  color: #e2e8f0;
  font-weight: 500;
}

.info-value.status-ready {
  color: #22c55e;
}

.info-value.status-loading {
  color: #f59e0b;
}

/* Footer */
.app-footer {
  background: rgba(10, 10, 15, 0.9);
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  padding: 1rem 2rem;
  position: relative;
  z-index: 10;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #8b949e;
  font-size: 0.9rem;
}

.footer-divider {
  color: rgba(100, 100, 120, 0.5);
}

.footer-log {
  color: #79c0ff;
  font-size: 0.85rem;
  font-family: 'Monaco', 'Courier New', monospace;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 40px rgba(252, 211, 77, 0.4); }
  50% { box-shadow: 0 0 80px rgba(252, 211, 77, 0.8); }
}

@keyframes orbit {
  0% { transform: translate(-50%, -50%) rotate(0deg) translateX(var(--orbit-radius)); }
  100% { transform: translate(-50%, -50%) rotate(360deg) translateX(var(--orbit-radius)); }
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-stats {
    width: 100%;
    justify-content: center;
  }

  .commands-grid {
    grid-template-columns: 1fr;
  }

  .solar-system-container {
    height: 400px;
  }
}

/* Gradient text utility */
.gradient-gold {
  background: linear-gradient(135deg, #d4af37 0%, #f4e5bc 50%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
