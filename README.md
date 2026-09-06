# TOTO public distribution

This repository contains only public distribution metadata and release assets
for TOTO. The scientific source remains in the private development
repositories. Download the Windows bootstrap installer from the latest
pre-release; it downloads pinned components, verifies SHA-256, and installs
TOTO without requiring Python.

The bootstrap selects a complete CPU or CUDA profile automatically. Use the
optional public model component when you want the example model preinstalled;
the full model catalog and user-provided model workflow remain supported.

- Product: TOTO — Toolkit for Open Tracking and Observation
- License: MIT for TOTO source; bundled third-party runtimes retain their own
  licenses and notices.
- Public demo: see the TOTO demo site linked from the release page.
- Web demo: https://toto-toolkit.github.io/TOTO-demo/
- Release: https://github.com/TOTO-Toolkit/TOTO-public/releases/tag/v0.2.0-public-beta.2

The release `COMPONENT_MANIFEST.json` is the single source of truth for
component versions, URLs, sizes, hashes, dependencies, hardware policy and
install layout.
