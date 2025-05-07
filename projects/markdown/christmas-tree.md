---
title: Christmas Tree
date: '2023-12-26'
contributors: Simon Karman and Lisa Pruijn
description: A Christmas themed game build with Krmx.
tags:
  - krmx
  - game
  - typescript
  - react
  - websockets
image: https://images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png
repository: https://github.com/simonkarman/christmas-tree
---

Christmas Tree is a Christmas themed game that I build with [Krmx](https://simonkarman.github.io/krmx) to play during Christmas 2023 with my family.

![An image of the Christmas Tree game in the dark theme](//images.ctfassets.net/r26fkm24j6bh/6HyMzsG8xJqCasVDez9nxB/31b49bb3b9f9d2bfef853f16bba75c27/game-dark.png)

## Game Design
In Christmas Tree the players unwrap all presents in a Christmas tree. They do this by taking turns in picking the next block of the tree to unwrap. Unwrapping a green box with a number scores the player that much point. Unwrapping a present score a player 3 points, adds 1 point to all surrounding boxes and gives the player an additional turn. The players continue until the whole tree has been unwrapped. At that point, the player with the most points wins the game.

## Light and dark themes
Based on the browser or device setting the dark or light theme is used.

![An image of the Christmas Tree game in the light theme](//images.ctfassets.net/r26fkm24j6bh/1oGjcZCpJzqO2XsYHKl0GU/eff4a64a6acd69a4ce4835ff7dfaaf12/game.png)

You can find more images in the `docs/` directory of the git repository.