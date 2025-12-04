# ✅ Deployment Checklist for Project Namibië

Use this checklist to ensure smooth deployment and testing of your WebXR experience.

---

## 📋 Pre-Deployment Checklist

### ✅ Local Testing
- [ ] Open `ar-scavenger-hunt-premium.html` in Chrome/Edge
- [ ] Check browser console for errors (F12)
- [ ] Verify all text is readable and correctly formatted
- [ ] Test audio by clicking page (should hear sounds)
- [ ] Confirm A-Frame scene loads (transparent background)

### ✅ Git Repository Status
```bash
# Run these commands to verify:
git status                 # Should show "nothing to commit"
git log --oneline          # Should show 4 commits
git branch                 # Should show "master" or "main"
```

- [ ] All files committed
- [ ] No uncommitted changes
- [ ] Repository is clean

---

## 🚀 GitHub Deployment (Option A)

### Step 1: Install GitHub CLI (if needed)
**Windows**:
```bash
winget install GitHub.cli
```

**macOS**:
```bash
brew install gh
```

**Linux**:
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

- [ ] GitHub CLI installed
- [ ] Run `gh --version` to verify

### Step 2: Authenticate
```bash
gh auth login
```

**Follow the prompts**:
1. Choose "GitHub.com"
2. Choose "HTTPS"
3. Choose "Login with a web browser"
4. Copy the one-time code
5. Press Enter and authenticate in browser

- [ ] GitHub CLI authenticated
- [ ] Run `gh auth status` to verify

### Step 3: Create Repository
```bash
gh repo create project-namibia-xr --public --source=. --remote=origin --push
```

- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] Visit https://github.com/YOUR-USERNAME/project-namibia-xr to verify

### Step 4: Enable GitHub Pages
```bash
gh api repos/:owner/project-namibia-xr/pages -X POST \
  -f source[branch]=master -f source[path]=/
```

**If that fails** (repo uses 'main' instead of 'master'):
```bash
gh api repos/:owner/project-namibia-xr/pages -X POST \
  -f source[branch]=main -f source[path]=/
```

- [ ] GitHub Pages enabled
- [ ] Visit https://github.com/YOUR-USERNAME/project-namibia-xr/settings/pages
- [ ] Verify "Your site is live at..." message

### Step 5: Get Your Live URLs
**MVP Version**:
```
https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt.html
```

**Premium Version**:
```
https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html
```

- [ ] Copy both URLs
- [ ] Wait 2-3 minutes for GitHub to deploy
- [ ] Test URLs in desktop browser first

---

## 🌐 Alternative: Netlify Deployment (Option B)

### Quick Drop Method
1. Go to https://app.netlify.com/drop
2. Drag `ar-scavenger-hunt-premium.html` onto page
3. Get instant URL: `https://[random-name].netlify.app`

- [ ] File uploaded
- [ ] URL copied
- [ ] Page loads in desktop browser

### CLI Method (Advanced)
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

- [ ] Netlify CLI installed
- [ ] Site deployed
- [ ] URL saved

---

## 🥽 Quest 3S Testing Checklist

### Before Testing
- [ ] Quest 3S is charged (>50% battery)
- [ ] Hand tracking is enabled in Quest settings
  - Path: Settings → Device → Hands & Controllers → Hand Tracking
- [ ] Browser app is updated
- [ ] Quest is in Passthrough mode (AR mode)

### Testing Steps

#### 1. Load the Experience
- [ ] Open Quest Browser
- [ ] Type or paste your HTTPS URL
- [ ] Page loads with transparent background (see real room)
- [ ] "Allow hand tracking" permission granted

#### 2. Visual Check
- [ ] See 10 floating orbs around the room
- [ ] Orbs have visible text labels (countries)
- [ ] Orbs are glowing and pulsating
- [ ] Hands are visible (golden color)
- [ ] Dust particles floating in air

#### 3. Audio Check
- [ ] Tap screen once to activate audio
- [ ] Hear Geiger counter clicking
- [ ] Clicks get faster when moving toward gold orb
- [ ] Clicks get slower when moving away

#### 4. Interaction Check
- [ ] Reach out and touch a blue orb (decoy)
  - [ ] Hear buzzer sound
  - [ ] See "REEDS ONTDEKT (ARCHIEF)" message
  - [ ] Orb disappears
- [ ] Touch the red orb (trap) if found
  - [ ] Hear glitch sound
  - [ ] Screen shakes
  - [ ] See "WETENSCHAPPELIJK ONMOGELIJK" message
  - [ ] Orb disappears

#### 5. Win Condition Check
- [ ] Follow Geiger clicks to find gold orb (NAMIBIË)
- [ ] Touch the gold orb
  - [ ] Hear discovery fanfare (6 notes)
  - [ ] See massive particle explosion (80+ particles)
  - [ ] 3D book appears and floats
  - [ ] Holographic panel shows: "LOCATIE BEVESTIGD - COÖRDINATEN: DE OVEN"
  - [ ] UI overlay updates to "✓ NAMIBIË GEVONDEN!"

---

## 🐛 Troubleshooting During Testing

| Problem | Check | Solution |
|---------|-------|----------|
| **Black screen** | Is Passthrough enabled? | Enable AR mode in Quest browser |
| **No hands visible** | Hand tracking permission? | Grant permission in browser prompt |
| **No audio** | Audio context activated? | Tap screen once |
| **"Not secure" warning** | Using HTTPS? | Use GitHub Pages or Netlify (not `http://`) |
| **Orbs not spawning** | Console errors? | Check browser console (Quest Developer Hub) |
| **Geiger not clicking** | Wait time? | Wait 2-3 seconds after page loads |
| **Can't touch orbs** | Hand tracking working? | Check Settings → Hands & Controllers |
| **Text too small** | Font size? | Adjust scale in code (line ~380) |
| **Performance issues** | Too many particles? | Reduce `maxParticles` (line ~920) |

---

## 📊 Post-Deployment Verification

### Desktop Browser Test
- [ ] Open URL in Chrome/Edge
- [ ] No console errors (F12)
- [ ] Scene loads (even without VR)
- [ ] Text is readable

### Mobile Test (Optional)
- [ ] Open URL on phone
- [ ] Page loads correctly
- [ ] No JavaScript errors

### Quest Test Results
- [ ] All 10 orbs spawn
- [ ] Geiger counter works
- [ ] Hand collisions work
- [ ] Win condition triggers
- [ ] Final panel displays correctly

---

## 📝 Final Handoff Checklist

### For the User (Oma)
- [ ] Create simple instruction card:
  ```
  1. Put on Quest
  2. Open Browser
  3. Go to: [YOUR-URL]
  4. Follow the clicking sound
  5. Touch the GOLD orb
  ```
- [ ] Write URL on a piece of paper (large font)
- [ ] Test with user present (first time)
- [ ] Have backup plan (MVP version URL)

### Documentation
- [ ] README.md updated with correct URLs
- [ ] DEPLOYMENT_INSTRUCTIONS.md reviewed
- [ ] FEATURE_COMPARISON.md shared with stakeholders

---

## 🎉 Success Criteria

You've successfully deployed when:

✅ URL loads on Quest Browser
✅ Passthrough shows real room
✅ 10 orbs are visible and interactive
✅ Audio provides guidance
✅ Win condition works perfectly
✅ User can read the final clue

---

## 🔄 Maintenance & Updates

### To Update the Experience Later

1. **Edit the HTML file**:
   ```bash
   # Open in editor
   code ar-scavenger-hunt-premium.html
   ```

2. **Test locally**:
   ```bash
   # Open in browser
   start ar-scavenger-hunt-premium.html
   ```

3. **Commit and push**:
   ```bash
   git add ar-scavenger-hunt-premium.html
   git commit -m "Update: [describe changes]"
   git push origin master
   ```

4. **GitHub Pages auto-updates** (wait 1-2 minutes)

5. **Test on Quest** again with the same URL

---

## 📞 Emergency Contacts

**If something goes wrong**:

1. **GitHub Issues**: Check https://www.githubstatus.com/
2. **A-Frame Discord**: https://discord.gg/aframe
3. **Quest Support**: https://www.meta.com/help/quest/

**Quick fixes**:
- **Can't push to GitHub**: Check `gh auth status`
- **Pages not updating**: Clear Quest browser cache
- **Audio not working**: Ensure HTTPS (not HTTP)

---

## ✨ You're Ready!

- [ ] All steps completed
- [ ] URLs saved in safe place
- [ ] Oma's treasure hunt is live! 🎊

**Final URL to share**:
```
https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html
```

---

**Questions?** Review:
- [README.md](README.md) - Overview
- [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md) - Detailed hosting guide
- [FEATURE_COMPARISON.md](FEATURE_COMPARISON.md) - MVP vs Premium

**Good luck, and may Oma find Namibië!** 🌍✨
