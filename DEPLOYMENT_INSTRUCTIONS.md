# 🚀 GitHub Deployment Instructions for Project Namibia XR

## Option A: Using GitHub CLI (Recommended)

### 1. Install GitHub CLI
Download from: https://cli.github.com/

### 2. Authenticate
```bash
gh auth login
```

### 3. Create Repository and Push
```bash
# Create public repository
gh repo create project-namibia-xr --public --source=. --remote=origin --push

# Enable GitHub Pages
gh api repos/:owner/project-namibia-xr/pages -X POST -f source[branch]=master -f source[path]=/
```

### 4. Get Your Live URL
```bash
gh browse --repo project-namibia-xr --settings
```
Then navigate to "Pages" section. Your URL will be:
**https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt.html**

---

## Option B: Manual GitHub Setup (No CLI Required)

### 1. Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `project-namibia-xr`
3. Set to **Public**
4. Do NOT initialize with README
5. Click "Create repository"

### 2. Push Your Code
Copy these commands and run in your terminal (replace YOUR-USERNAME):

```bash
# Add remote origin
git remote add origin https://github.com/YOUR-USERNAME/project-namibia-xr.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to: https://github.com/YOUR-USERNAME/project-namibia-xr/settings/pages
2. Under "Source", select: **Deploy from a branch**
3. Select branch: **main** (or master)
4. Select folder: **/ (root)**
5. Click **Save**

### 4. Wait 1-2 Minutes
GitHub will build and deploy your site.

### 5. Access Your Live Site
Your URL will be:
```
https://YOUR-USERNAME.github.io/project-namibia-xr/ar-scavenger-hunt.html
```

---

## Option C: Quick Deploy with Netlify (Fastest Alternative)

If GitHub Pages isn't working:

1. Go to https://app.netlify.com/drop
2. Drag and drop `ar-scavenger-hunt.html`
3. Instant deployment - get your `https://` URL immediately
4. Share with Quest 3S user

---

## 🧪 Testing on Meta Quest 3S

1. Put on Quest headset
2. Open **Browser** app
3. Navigate to your `https://` URL
4. Allow **hand tracking** permissions
5. Enable **AR mode** when prompted

---

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| `gh: command not found` | Install GitHub CLI from https://cli.github.com/ |
| `remote origin already exists` | Run `git remote remove origin` first |
| Pages shows 404 | Wait 2-3 minutes for deployment |
| Quest shows security warning | Ensure URL starts with `https://` |

---

## 📝 Current Git Status

✅ Repository initialized
✅ Files committed: `ar-scavenger-hunt.html`, `.gitignore`
✅ Ready to push to GitHub

**Next Step**: Choose Option A or B above and execute the commands.
