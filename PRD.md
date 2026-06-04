# Product Requirements Document: Task Note

## 1. Project Overview
Task Note is a premium, high-performance productivity platform designed for users who demand the structured workflow of enterprise tools (ClickUp, Linear) with the minimalist, markdown-focused aesthetics of note-taking powerhouses (Obsidian, Notion).

**Tagline:** Precision Workspace for High-Performance Teams.

## 2. Target Audience
- Developers and Technical Product Managers.
- Power users of productivity software.
- Teams requiring deep integration between task execution and technical documentation.

## 3. Core Features
### 3.1. Advanced Task Management
- **Task Identity:** Unique identification and metadata for every task.
- **Priority Tracking:** Categorization into Urgent, Important, and Normal with visual urgency indicators.
- **Status Management:** Workflow stages including Pending, In Progress, and Completed.
- **Due Date Countdowns:** Real-time visual timers for critical deadlines.

### 3.2. Integrated Note-Taking
- **Hierarchical Notes:** Linking tasks directly to long-form documentation.
- **Obsidian-inspired Editor:** Focus on typography, backlinking, and structured conditions of termination.
- **Metadata Pane:** Quick-access sidebar for task properties within the note view.

### 3.3. Productivity Analytics
- **Execution Metrics:** Tracking success rate, average time to completion, and total throughput.
- **Heatmaps:** GitHub-style execution frequency charts.
- **Priority Mapping:** Visual breakdown of effort vs. urgency.

### 3.4. Navigation & Search
- **Precision Search:** Global search across tasks, notes, and stats.
- **Global Sidebar:** Rapid switching between Projects, Tasks, Notes, and Analytics.

## 4. Design System (Obsidian Crimson)
### 4.1. Visual Language
- **Theme:** Dark Mode (Obsidian-inspired).
- **Primary Palette:** 
  - Background: Dark Graphite (#131313)
  - Accent: Neon Crimson (#FF3131) for high-urgency signals.
  - Surface: Glassmorphic containers with subtle translucency and borders.
- **Typography:** Geist (Modern, technical sans-serif).
- **Elevation:** Flat design with depth created through border-strokes and subtle glassmorphism rather than heavy shadows.

### 4.2. UI Components
- **SideNavBar:** Persistent left-aligned navigation.
- **Status Badges:** Color-coded indicators for priority and state.
- **Countdown Timers:** High-contrast, mono-spaced font for readability.

## 5. Technical Requirements
- **Device Support:** Initial release optimized for Desktop (1440px+).
- **Interactivity:** Real-time state updates, glassmorphism CSS effects, and responsive grid layouts.

## 6. User Journey
1. **Landing/Dashboard:** Overview of critical tasks and active countdowns.
2. **Execution:** Selecting a task to view its detailed requirements and attached notes.
3. **Documentation:** Refining the "Conditions of Termination" in the integrated editor.
4. **Analysis:** Reviewing weekly performance in the Analytics Terminal to optimize workflow.
