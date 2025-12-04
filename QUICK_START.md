# ⚡ QUICK START - Get Live in 5 Minutes

**Goal**: Deploy Premium WebXR Experience and test on Quest 3S

---

## 🎯 The Fastest Path (Choose One)

### 🅰️ Option A: GitHub Pages (Best for long-term hosting)
**Time**: ~5 minutes | **Cost**: Free | **Difficulty**: Easy

### 🅱️ Option B: Netlify Drop (Instant deployment)
**Time**: ~2 minutes | **Cost**: Free | **Difficulty**: Very Easy

---

## 🚀 Option A: GitHub Pages (Step-by-Step)

### Step 1: Install GitHub CLI (One-time setup)
**Windows**:
```bash
winget install GitHub.cli
```

**macOS**:
```bash
brew install gh
```

**Verify installation**:
```bash
gh --version
# Should show: gh version 2.x.x
```

---

### Step 2: Authenticate (One-time setup)
```bash
gh auth login
```

**Follow the prompts**:
1. `? What account do you want to log into?` → **GitHub.com**
2. `? What is your preferred protocol for Git operations?` → **HTTPS**
3. `? How would you like to authenticate GitHub CLI?` → **Login with a web browser**
4. Copy the 8-character code shown
5. Press **Enter**
6. Browser opens → Paste code → Authorize

---

### Step 3: Create Repository & Push
```bash
gh repo create project-namibia-xr --public --source=. --remote=origin --push
```

**What this does**:
- Creates `project-namibia-xr` on your GitHub account
- Marks it as public
- Adds GitHub as remote origin
- Pushes all 6 commits

**Expected output**:
```
✓ Created repository YOUR-USERNAME/project-namibia-xr on GitHub
✓ Added remote https://github.com/YOUR-USERNAME/project-namibia-xr.git
✓ Pushed commits to https://github.com/YOUR-USERNAME/project-namibia-xr.git
```

---

### Step 4: Enable GitHub Pages
```bash
gh api repos/:owner/project-namibia-xr/pages -X POST -f source[branch]=master -f source[path]=/
```

**If you get an error about "main" vs "master"**:
```bash
# Check your branch name
git branch

# If it says "main", use this instead:
gh api repos/:owner/project-namibia-xr/pages -X POST -f source[branch]=main -f source[path]=/
```

---

### Step 5: Get Your Live URL

**Your Premium Experience is now live at**:
```
https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html
```

**Replace `YOUR-USERNAME` with your GitHub username.**

Example: If your username is `scientist-jane`, the URL is:
```
https://scientist-jane.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html
```

---

### Step 6: Wait & Test

1. **Wait 2-3 minutes** for GitHub to build the site
2. **Open URL in desktop browser** (Chrome/Edge) to verify it loads
3. **Copy URL** to phone or write it down
4. **Put on Quest 3S** and open Browser
5. **Navigate to URL** on Quest
6. **Start playing!** 🎉

---

## 🌐 Option B: Netlify Drop (Fastest)

### Step 1: Open Netlify Drop
Go to: **https://app.netlify.com/drop**

---

### Step 2: Drag & Drop
1. Find `ar-scavenger-hunt-premium.html` in your file explorer
2. Drag it onto the Netlify Drop page
3. Wait 10 seconds for upload

---

### Step 3: Get Your URL
Netlify shows:
```
Your site is live at:
https://random-name-12345.netlify.app
```

**Copy this URL!**

---

### Step 4: Test on Quest
1. Put on Quest 3S
2. Open Browser
3. Type or paste the Netlify URL
4. Start playing! 🎉

---

## 📱 Testing on Quest 3S

### Before You Start
✅ Quest is charged (>50% battery)
✅ Hand tracking enabled: Settings → Device → Hands & Controllers → Hand Tracking
✅ Browser app is updated

### Loading the Experience
1. **Put on Quest 3S**
2. **Press Oculus button** (right controller/hand)
3. **Select "Browser"** from menu
4. **Click address bar** (top of screen)
5. **Type or paste your URL**:
   - GitHub: `https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html`
   - Netlify: `https://random-name.netlify.app`
6. **Press Enter**

### First-Time Permissions
When page loads, Quest will ask:
- ✅ **"Allow hand tracking?"** → YES
- ✅ **"Enter AR mode?"** → YES

### What You Should See
✅ Your real room (Passthrough)
✅ 10 glowing orbs floating around you
✅ Text labels on each orb (country names)
✅ Your hands (golden color)
✅ UI overlay in top-left corner

### What You Should Hear
✅ Clicking sound (Geiger counter)
✅ Clicks get faster when you move toward the gold orb

---

## 🎮 How to Play

### Goal
Find the **GOLD orb** labeled **"NAMIBIË"**

### Controls
👋 **Hands only** (no controllers)

### Instructions
1. **Listen to the Geiger counter** (clicking sound)
2. **Walk around your room** looking at orbs
3. **Notice the clicking speed up** = you're getting closer!
4. **Reach out and touch orbs** with your hands
5. **Find the GOLD orb** (NAMIBIË)
6. **Touch it to win!**

### What Happens When You Touch Orbs?
- **Blue orb** (Peru, Japan, etc.) → "Already visited" message + disappears
- **Red orb** (FLAT EARTH THEORY) → Screen shakes + error sound
- **Gold orb** (NAMIBIË) → 🎊 YOU WIN! 🎊

---

## 🐛 Troubleshooting

### "Page Not Found" or 404 Error
**GitHub Pages**: Wait 3 more minutes, then refresh

**Netlify**: Check if you dragged the correct file

---

### Black Screen
**Problem**: Quest isn't in AR mode

**Solution**: Enable Passthrough in Quest settings

---

### No Hands Visible
**Problem**: Hand tracking not enabled

**Solution**:
1. Take off Quest
2. Go to Settings → Device → Hands & Controllers
3. Enable "Hand Tracking"
4. Put Quest back on

---

### No Sound
**Problem**: Audio context not activated

**Solution**: Tap screen once with your finger

---

### "Not Secure" Warning
**Problem**: URL is `http://` instead of `https://`

**Solution**: Use GitHub Pages or Netlify (both use HTTPS automatically)

---

### Orbs Not Spawning
**Problem**: JavaScript error

**Solution**:
1. On desktop browser, open URL
2. Press F12 to open console
3. Look for red error messages
4. Share error in issue tracker

---

## 📞 Quick Help

### Need Help Deploying?
Read: [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)

### Want to Compare Versions?
Read: [FEATURE_COMPARISON.md](FEATURE_COMPARISON.md)

### Need Step-by-Step Checklist?
Read: [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)

### Want Full Documentation?
Read: [README.md](README.md)

---

## ✅ Success Checklist

You're done when:
- [ ] URL loads on desktop browser
- [ ] URL loads on Quest Browser
- [ ] See 10 orbs in AR
- [ ] Hear Geiger clicking
- [ ] Hands can touch orbs
- [ ] Gold orb triggers win condition
- [ ] Oma can read the final clue

---

## 🎉 You're Live!

**Congratulations!** Your WebXR experience is now deployed.

### Share Your URL
**GitHub Pages**:
```
https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt-premium.html
```

**Netlify**:
```
https://random-name.netlify.app
```

### Next Steps
1. ✅ Write URL on paper (large font)
2. ✅ Give to Oma
3. ✅ Help her on first playthrough
4. ✅ Watch her solve the treasure hunt!
5. ✅ Celebrate! 🎊

---

## ⏱️ Total Time Breakdown

| Task | Time |
|------|------|
| Install GitHub CLI | 2 min |
| Authenticate | 1 min |
| Create repo & push | 1 min |
| Enable Pages | 30 sec |
| Wait for deployment | 2 min |
| Test on Quest | 2 min |
| **TOTAL** | **~9 minutes** |

---

## 💡 Pro Tips

### Tip 1: Bookmark the URL
On Quest Browser, bookmark your URL so Oma doesn't need to type it every time.

### Tip 2: Create a QR Code
Use https://qr-code-generator.com/ to create a QR code for your URL. Print it out!

### Tip 3: Test First
Always test on your own Quest before showing Oma. Check:
- Orbs spawn correctly
- Audio works
- Win condition triggers
- Text is readable

### Tip 4: Have a Backup
Keep both URLs handy:
- Premium (primary)
- MVP (backup if Premium has issues)

---

## 🚨 Emergency Fallback

**If everything breaks:**

1. Use the **MVP version** instead:
   ```
   https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt.html
   ```

2. Or use **Netlify Drop** with the MVP file:
   - Go to https://app.netlify.com/drop
   - Drag `ar-scavenger-hunt.html`
   - Get instant URL

---

**Ready? Let's go!** 🚀

**Choose your deployment method above and start now!**

---

**Questions?** Check the detailed guides in the repo:
- [README.md](README.md) - Overview
- [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md) - Detailed hosting
- [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md) - Step-by-step checklist
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Complete summary

**Good luck!** 🌍✨
