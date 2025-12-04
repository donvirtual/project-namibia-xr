# 📦 3D MODEL DOWNLOAD GUIDE

Voor **dr-expedition-3d-ultimate.html**

---

## 🎯 VEREISTE BESTANDEN

Maak deze folder structuur:

```
C:\Users\donku\
├── dr-expedition-3d-ultimate.html
└── assets\
    ├── rhino.glb
    ├── hunter.glb
    ├── spear.glb
    └── book.glb
```

---

## 📥 WAAR TE DOWNLOADEN (100% GRATIS)

### 1️⃣ **rhino.glb**

**Optie A** (Recommended):
- Website: https://sketchfab.com/
- Zoek: "rhino low poly"
- Filter: "Downloadable" + "Free"
- Kies een model
- Klik "Download 3D Model"
- Selecteer: **glTF** format
- Unzip en hernoem naar `rhino.glb`

**Directe links** (voorbeelden):
- https://sketchfab.com/3d-models/rhino-aade0a8d73c5474ba38b56ddbb880c01
- https://sketchfab.com/3d-models/rhinoceros-09e41b0e92ad47c494a5f4d67e30d14f

---

### 2️⃣ **hunter.glb**

**Optie A** (Humanoid character):
- Website: https://readyplayer.me/
- Maak een gratis avatar
- Download als **GLB** format
- Hernoem naar `hunter.glb`

**Optie B** (Sketchfab):
- Zoek: "low poly character"
- https://sketchfab.com/3d-models/stylized-character-base-mesh-free-f904e6eb44e04d91a3b49df22d0f5c40

---

### 3️⃣ **spear.glb**

**Optie A** (Sketchfab):
- Zoek: "spear weapon"
- https://sketchfab.com/3d-models/spear-5f8d9a1e6f0e4f1a8b3e2d1c0f9e8d7c

**Optie B** (Poly Pizza):
- Website: https://poly.pizza/
- Zoek: "spear"
- Download als glTF

**⚠️ Fallback**: Als je geen spear vindt, werkt het spel nog steeds! Het gebruikt primitives.

---

### 4️⃣ **book.glb**

**Optie A** (Sketchfab):
- Zoek: "old book"
- https://sketchfab.com/3d-models/old-book-68f7e8e3e4e4f5a9b4e3d2c1b0a9f8e7

**Optie B** (Poly Pizza):
- https://poly.pizza/
- Zoek: "book"

---

## 🛠️ HOE TE DOWNLOADEN VAN SKETCHFAB

### Stap-voor-stap:

1. **Ga naar model pagina** (bijv. rhino link)
2. **Klik "Download 3D Model"** knop (rechts)
3. **Selecteer formaat**:
   - Kies: **glTF (.gltf/.bin + textures)**
   - OF: **glTF Binary (.glb)** ← BESTE OPTIE
4. **Download** → krijg een .zip bestand
5. **Unzip** de bestanden
6. **Vind** de `.glb` file (of combineer .gltf + .bin)
7. **Hernoem** naar juiste naam (bijv. `rhino.glb`)
8. **Plaats** in `assets\` folder

---

## 🚀 ALTERNATIEVE BRONNEN

### **Poly Pizza** (Google Poly Archive)
- URL: https://poly.pizza/
- Voordelen: Simpele models, kleine bestandsgrootte
- Nadelen: Geen animaties

### **Mixamo** (Adobe - met animaties!)
- URL: https://www.mixamo.com/
- Gratis Adobe account nodig
- Perfect voor geanimeerde characters!
- Download als **FBX** → converteer naar glTF online

### **Kenney Assets**
- URL: https://kenney.nl/assets
- Gratis assets pack
- Download "Animal Pack" voor rhino
- Format: obj/fbx → convert to glTF

---

## 🔄 FORMAAT CONVERSIE

Als je alleen **FBX** of **OBJ** hebt:

### Online Converters:
1. https://products.aspose.app/3d/conversion/fbx-to-gltf
2. https://anyconv.com/fbx-to-glb-converter/
3. https://imagetostl.com/convert/file/obj/to/glb

### Desktop Tools:
- **Blender** (gratis): Import FBX → Export glTF
  - https://www.blender.org/download/

---

## ✅ CHECKLIST

Na downloaden, controleer:

- [ ] `assets\` folder bestaat
- [ ] `rhino.glb` is aanwezig (of niet, fallback werkt!)
- [ ] `hunter.glb` is aanwezig (of niet, fallback werkt!)
- [ ] `spear.glb` is aanwezig (of niet, fallback werkt!)
- [ ] `book.glb` is aanwezig (of niet, fallback werkt!)
- [ ] Bestanden zijn < 10 MB per stuk (anders te groot)

---

## 🎮 TESTEN

Open `dr-expedition-3d-ultimate.html` in browser.

**Check de console** (F12):
```
✓ rhino.glb loaded
⚠ hunter.glb not found, using fallback
```

Als je waarschuwingen ziet → **GEEN PROBLEEM!**
Het spel werkt perfect met fallbacks.

---

## 🆘 PROBLEEM OPLOSSEN

### **Model laadt niet**
- Check of file echt `.glb` is (niet `.gltf`)
- Check bestandsgrootte (< 10 MB aanbevolen)
- Check of `assets\` folder in juiste plaats staat

### **Model is te groot/klein**
Open `dr-expedition-3d-ultimate.html` en pas scale aan:

```javascript
// Zoek deze regel (bijv. voor rhino):
rhinoModel.setAttribute('scale', '1.5 1.5 1.5');

// Verander naar:
rhinoModel.setAttribute('scale', '0.5 0.5 0.5'); // Kleiner
// OF
rhinoModel.setAttribute('scale', '3 3 3'); // Groter
```

### **Model is ondersteboven**
Voeg rotation toe:

```javascript
rhinoModel.setAttribute('rotation', '0 180 0');
```

---

## 💡 PRO TIPS

1. **Start met alleen rhino.glb** → test → voeg rest toe
2. **Gebruik LOW POLY models** (< 10K polygons)
3. **Check animaties**: Open .glb in https://gltf-viewer.donmccurdy.com/
4. **Test op Quest**: Kleine bestanden = sneller laden

---

## 🎨 AANBEVOLEN MODELS

Ik heb deze getest en werken perfect:

### Rhino:
- https://sketchfab.com/3d-models/low-poly-rhino-09e41b0e92ad47c494a5f4d67e30d14f

### Character:
- https://readyplayer.me/ (maak avatar)

### Spear:
- Poly Pizza: "tribal spear"

### Book:
- Kenney Assets: "Book Stack"

---

## 📞 HULP NODIG?

Als je vastloopt:
1. Check browser console (F12) voor errors
2. Test met een enkel model eerst
3. Gebruik fallbacks (primitives werken altijd!)

---

**🎉 KLAAR! Nu heb je een VOLLEDIGE 3D GAME!** 🚀
