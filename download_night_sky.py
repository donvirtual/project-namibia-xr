"""
Download Starry Night Sky Texture for Night Mode
"""
import urllib.request
import os
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

ASSETS = r"C:\Users\donku\assets"

print("=" * 60)
print("DOWNLOADING NIGHT SKY TEXTURE")
print("=" * 60)
print()

# Starry night sky panorama
print("Downloading sky_night.jpg...")
try:
    # Milky Way panorama from Unsplash
    url = "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=2048&q=80"
    urllib.request.urlretrieve(url, os.path.join(ASSETS, "sky_night.jpg"))

    size = os.path.getsize(os.path.join(ASSETS, "sky_night.jpg")) / (1024 * 1024)
    print(f"  ✓ sky_night.jpg downloaded ({size:.1f} MB)")
except Exception as e:
    print(f"  ✗ Error: {e}")

print()
print("=" * 60)
print("NIGHT SKY READY!")
print("=" * 60)
