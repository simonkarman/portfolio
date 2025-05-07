---
title: Infinite Voronoi
date: '2018-07-20'
contributors: Simon Karman
description: Technical demonstration of a seemingly infinite Voronoi diagram.
tags:
  - pcg
  - c#
  - unity
image: >-
  https://images.ctfassets.net/r26fkm24j6bh/7JyVjxxdGpW2ZykrE9pmi0/4d729c414bc972760edcd92a4e5e74fd/infinitevoronoi.png
repository: >-
  https://bitbucket.org/simonkarman/simsourcer/src/default/Assets/Libraries/InfiniteVoronoiConstructor/
---

As a hobby project I worked on a technical demonstration of a seemingly infinite Voronoi diagram. The voronoi cells are loaded within a region around a target point on the plane. The voronoi cells are loaded per chunk and connect seamless to the chunks around it.

The resulting Voronoi subdivision could be used for world generation in games

![Infinite Voronoi Biomes](//images.ctfassets.net/r26fkm24j6bh/1mhTiSei3MG0Lz8RvgZPbV/978701d5d4ee2334fbceaf093a00afff/infinitevoronoi_biomes.png)

The above image shows how multiple layers of the Voronoi diagram can be nested. In a game world this could be used to define nations, biomes, or landmasses.

The source code is available on [BitBucket](https://bitbucket.org/simonkarman/simsourcer/src/default/Assets/Libraries/InfiniteVoronoiConstructor/) as part of the simsourcer project. The Infinite Voronoi Construction library can be found in the /Assets/Libraries/InfiniteVoronoiConstructor/ directory.