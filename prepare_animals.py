"""
Prepare animated animals from the Ultimate Animated Animals pack
Copy GLTF files with their textures to assets folder
"""
import os
import shutil
import sys
import re

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

ANIMALS_SOURCE = r"C:\Users\donku\assets\Ultimate Animated Animals - July 2021-20251204T122644Z-3-001\Ultimate Animated Animals - July 2021\glTF"
ASSETS_TARGET = r"C:\Users\donku\assets"

print("=" * 60)
print("PREPARING ANIMATED ANIMALS")
print("=" * 60)
print()

# Animals we want to use for grazing
animals_to_copy = ['Deer', 'Stag', 'Bull', 'Horse', 'Fox']

for animal in animals_to_copy:
    # The GLTF files are directly in the glTF folder, not in subfolders
    gltf_file = os.path.join(ANIMALS_SOURCE, f"{animal}.gltf")

    if not os.path.exists(gltf_file):
        print(f"  X {animal}.gltf not found")
        continue

    # Copy GLTF file to assets
    target_gltf = os.path.join(ASSETS_TARGET, f"{animal.lower()}.gltf")
    shutil.copy2(gltf_file, target_gltf)
    print(f"  OK {animal}.gltf copied ({os.path.getsize(target_gltf) / 1024:.1f} KB)")

    # Now copy associated .bin files (they have the animal name in them)
    # Find all files in the source folder that contain the animal name
    for file in os.listdir(ANIMALS_SOURCE):
        if animal.lower() in file.lower() and file.endswith(('.bin', '.png', '.jpg', '.jpeg')):
            src = os.path.join(ANIMALS_SOURCE, file)
            # Keep the same filename for .bin files (referenced by GLTF)
            dst = os.path.join(ASSETS_TARGET, file)
            shutil.copy2(src, dst)
            size = os.path.getsize(dst) / 1024
            print(f"     + {file} ({size:.1f} KB)")

print()
print("=" * 60)
print("ANIMALS READY!")
print("=" * 60)
print()
print("Checking assets folder:")
for file in ['deer.gltf', 'stag.gltf', 'bull.gltf', 'horse.gltf', 'fox.gltf']:
    path = os.path.join(ASSETS_TARGET, file)
    if os.path.exists(path):
        size = os.path.getsize(path) / 1024
        print(f"  ✓ {file} ({size:.1f} KB)")
    else:
        print(f"  -- {file} (missing)")
