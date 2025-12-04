# 🌍 Project Namibië - Premium WebXR Experience

> A Mixed Reality Scavenger Hunt designed for Meta Quest 3S with Hand Tracking

![Status](https://img.shields.io/badge/status-production-brightgreen)
![Platform](https://img.shields.io/badge/platform-Meta%20Quest%203S-blue)
![Framework](https://img.shields.io/badge/framework-A--Frame%201.6.0-orange)

---

## 📖 Project Overview

**Project Namibië** is a narrative-driven Mixed Reality game created for an 85-year-old scientist grandmother. Using Passthrough AR on the Meta Quest 3S, players search their real living room for virtual "Memory Orbs" containing clues to her past travels. The goal: find the orb labeled "NAMIBIË" to reveal a hidden treasure location.

### 🎮 Two Versions Available

| Version | File | Description |
|---------|------|-------------|
| **MVP** | `ar-scavenger-hunt.html` | Simple geode-finding game with Geiger counter audio |
| **Premium** | `ar-scavenger-hunt-premium.html` | Narrative gameplay with Memory Orbs, particle effects, and Easter eggs |

---

## ✨ Premium Features

### 1. **Memory Orbs System**
- 🔵 **8 Decoy Orbs**: Countries already visited (Peru, Japan, Norway, etc.)
- 🔴 **1 Trap Orb**: "FLAT EARTH THEORY" - triggers error glitch
- 🟡 **1 Target Orb**: "NAMIBIË" - reveals the treasure location

### 2. **Visual Enhancements**
- **Glass Bubble Aesthetic**: Semi-transparent orbs with pulsating glow
- **Billboard Text**: Labels always face the player (look-at component)
- **Desert Atmosphere**: 50 floating dust particles for immersion
- **Vortex Explosion**: 80-particle gold/orange spiral on success

### 3. **Audio Design** (100% Procedural)
- **Geiger Counter**: Clicks faster near the target orb
- **Archive Buzzer**: Low-frequency sound for visited countries
- **Error Glitch**: Chaotic beeps for the Flat Earth trap
- **Discovery Fanfare**: 6-note ascending melody (C-D-E-G-A-C)

### 4. **Interaction Mechanics**
- **Hand Tracking Only**: No controllers required
- **Camera Shake**: Screen trembles when touching the trap
- **Screen Flash**: Red overlay for dramatic effect
- **3D Book Reveal**: Floating book model appears with final clue

---

## 🚀 Quick Start

### Prerequisites
- **Meta Quest 3S** headset
- **HTTPS hosting** (WebXR requirement)
- **Hand tracking** enabled in Quest settings

### Option A: Deploy to GitHub Pages

1. **Install GitHub CLI** (if not already installed):
   ```bash
   # Windows (via winget)
   winget install GitHub.cli

   # macOS
   brew install gh
   ```

2. **Authenticate and create repository**:
   ```bash
   gh auth login
   gh repo create project-namibia-xr --public --source=. --remote=origin --push
   ```

3. **Enable GitHub Pages**:
   ```bash
   gh api repos/:owner/project-namibia-xr/pages -X POST \
     -f source[branch]=master -f source[path]=/
   ```

4. **Access your live site**:
   ```
   https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html
   ```

### Option B: Quick Deploy with Netlify

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag `ar-scavenger-hunt-premium.html` onto the page
3. Get instant HTTPS URL
4. Open on Quest Browser

---

## 🎯 How to Play

1. **Put on Quest 3S** and enable Passthrough mode
2. **Open Browser** and navigate to your hosted URL
3. **Allow hand tracking** when prompted
4. **Listen for the Geiger counter** - it clicks faster near the target
5. **Touch orbs with your hands**:
   - **Blue orbs** (visited countries) → Grey + archive buzzer
   - **Red orb** (Flat Earth) → Error glitch + screen shake
   - **Gold orb** (Namibië) → Vortex explosion + treasure reveal
6. **Read the final clue**: "COÖRDINATEN: DE OVEN"

---

## 🛠️ Technical Architecture

### Stack
- **Framework**: A-Frame 1.6.0 (WebXR wrapper for Three.js)
- **Audio**: Web Audio API (AudioContext synthesizer)
- **Input**: WebXR Hand Tracking API
- **Rendering**: Three.js (via A-Frame)
- **Deployment**: Static HTML (no build process)

### Key Components

| Component | Purpose |
|-----------|---------|
| `game-controller` | Spawns orbs, manages game state |
| `geiger-counter` | Proximity-based audio feedback |
| `hand-collider` | Sphere-to-sphere collision detection |
| `camera-shake` | Screen shake effect for trap orb |
| `desert-atmosphere` | Floating particle system |
| `orb-shader` | Pulsating glow + billboard text |

### Performance Optimizations
- **No external assets**: Zero HTTP requests (except A-Frame CDN)
- **Lightweight physics**: Math-based collision (no Cannon.js)
- **Minimal DOM operations**: Component-based architecture
- **Efficient particles**: Simple sphere primitives with animations

---

## 📂 Project Structure

```
project-namibia-xr/
├── ar-scavenger-hunt.html           # MVP version
├── ar-scavenger-hunt-premium.html   # Full experience
├── DEPLOYMENT_INSTRUCTIONS.md        # Hosting guide
├── README.md                         # This file
└── .gitignore                        # Git exclusions
```

---

## 🎨 Customization Guide

### Change the Clue Message
Edit line **~520** in `ar-scavenger-hunt-premium.html`:
```javascript
coords.setAttribute('value', 'COÖRDINATEN:\nDE OVEN');
```
Replace `"DE OVEN"` with your hiding spot!

### Adjust Difficulty
- **More orbs**: Change line **~150** → `const totalOrbs = 15;`
- **Faster Geiger**: Change line **~698** → reduce interval values
- **Larger collision**: Line **~760** → increase `this.collisionRadius`

### Add Your Own Countries
Edit line **~124** in `ar-scavenger-hunt-premium.html`:
```javascript
visitedCountries: ['Peru', 'Japan', 'Your Country', ...]
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Black screen** | Ensure you're using Quest Browser in Passthrough mode |
| **No hands visible** | Enable hand tracking in Quest settings |
| **No audio** | Tap screen once to activate AudioContext |
| **"Not secure" warning** | Must use HTTPS (use Netlify or GitHub Pages) |
| **Orbs not spawning** | Check browser console (F12) for errors |

---

## 📊 Browser Compatibility

| Browser | Support |
|---------|---------|
| Meta Quest Browser | ✅ Full support |
| Chrome (Desktop) | ⚠️ No hand tracking |
| Safari | ❌ Limited WebXR support |
| Firefox | ⚠️ Requires `dom.vr.enabled` flag |

---

## 🔒 Security & Privacy

- **No data collection**: Zero telemetry or analytics
- **Fully client-side**: No backend servers
- **No external assets**: All code inline (except A-Frame CDN)
- **Open source**: Inspect/modify any code freely

---

## 📜 License

MIT License - Feel free to fork, modify, and share!

---

## 🙏 Credits

- **Framework**: [A-Frame](https://aframe.io/) by Mozilla
- **Audio**: Web Audio API synthesizer (custom implementation)
- **Concept**: Designed for an 85-year-old scientist's treasure hunt

---

## 📞 Support

For questions or issues:
1. Check [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)
2. Review browser console logs (F12)
3. Open an issue on GitHub

---

## 🚧 Roadmap

### Potential Future Enhancements
- [ ] Multiplayer mode (shared orb locations)
- [ ] Spatial audio (3D sound positioning)
- [ ] Voice commands (Web Speech API)
- [ ] Achievements system
- [ ] Custom orb models (GLTF/GLB)
- [ ] Haptic feedback (controller vibration)

---

**Made with ❤️ for Oma - May your adventures never end!**

