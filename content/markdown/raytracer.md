---
title: Raytracer
date: '2015-01-07'
contributors: Simon Karman and Kevin Kessels
description: Raytracer we created for the Advanced Graphics course during my master
tags:
  - cplusplus
  - anti-aliasing
image: https://images.ctfassets.net/r26fkm24j6bh/1NfW43sd04gsoUqAwKs0AO/96cce14377b5824b15df0a1c9fdcf896/raytracer.png
download: https://assets.ctfassets.net/r26fkm24j6bh/4qxspDcQGIE4ueC8IQSIG0/bdadfeb24822d895c27785455d36a4f4/raytracer.zip
documentation: https://assets.ctfassets.net/r26fkm24j6bh/yetm9q9FAG8Mq2MyAUkeQ/29208a0ac94c5117230db559c0b0306f/raytracer.pdf
---

For the Advanced Graphics course on the Utrecht University we implemented a ray tracer. This ray tracer can render an imported scene (.obj file).

A ray tracer works by shooting view rays through the imported scene to generate images under perspective projection. Read [this wikipedia article](https://en.wikipedia.org/wiki/Ray_tracing_%28graphics%29) for more information.

We included anti-aliassing in our ray tracer. We used to following three anti-aliassing techniques:
- Box Filter
- Gaussion Weighting
- Jittered Grid

Results of these techniques are described in the provided documentation link below.

The download link provides you with an executable file in which all the test can be redone. This download also includes the test scene we used in our experiments (scene.obj).
