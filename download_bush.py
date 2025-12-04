"""
Download Bush/Shrub 3D Model for Ambush System
Using simple public domain models
"""
import urllib.request
import os
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

ASSETS = r"C:\Users\donku\assets"

print("=" * 60)
print("DOWNLOADING BUSH MODEL")
print("=" * 60)
print()

# Using a simple box as placeholder for bush
# We'll use A-Frame primitives to create bushes
print("Using procedural bush generation with A-Frame primitives")
print("No download needed - bushes will be created with:")
print("  - Green sphere clusters")
print("  - Brown cylinder trunks")
print("  - Random positioning")

print()
print("=" * 60)
print("BUSH SYSTEM READY (Procedural)")
print("=" * 60)
