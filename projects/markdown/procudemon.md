---
title: Procudemon
date: '2016-09-01'
contributors: Simon Karman
description: A procedurally generated 3D world that moves along with the position of the player.
tags:
  - pcg
  - csharp
  - unity
image: https://images.ctfassets.net/r26fkm24j6bh/30bGvPSaEK9djdbIpc5w2W/8a9c98d71ec14abb8596e2108d06a954/procudemon.png
download: https://downloads.ctfassets.net/r26fkm24j6bh/3PT8hBosxVBYKZBu664wWJ/6001282f6300ff657d380e9f6b4fb69e/Procedumon.zip
---

Procedumon is a technical demo in Unity of a 3D environment that is procedurally generated around the player as the player moves around. The environment that is generated is a forest with rivers and height differences.

You can move around with the WASD keys.

![Procudemon Distance](//images.ctfassets.net/r26fkm24j6bh/4CWA1mHd7ySytxCaN6kySk/087524f48eeb3a8f1db39d38d713b374/procudemon_distance.png)

The above image shows the generated part of the world from a distance. If the player moves out of the red rectangle that is slightly visible in the center of the image, a new part of the world is generated. When that happens, parts that are too far from the player are deleted because they are no longer needed.
