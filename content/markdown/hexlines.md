---
title: Hexlines
date: '2023-07-31'
contributors: Simon Karman and Jorn Theunissen
description: A multiplayer board game implemented using Krmx.
tags:
  - krmx
  - typescript
  - websockets
  - game
image: https://images.ctfassets.net/r26fkm24j6bh/4Qrc4HkZT3eozwg4vvEUdB/75f09c7a2ab868c70a0814e2e7866bd2/ancient-hexlines.jpeg
repository: https://github.com/simonkarman/ancient/
---

Hexlines is an online multiplayer game build with [Krmx](https://simonkarman.github.io/krmx). It is part of the [Ancient](https://github.com/simonkarman/ancient/) multiplayer game collection that served as the initial project for developing Krmx.

## Gameplay
In hexlines the players take turn in placing down hexagon tiles. These hexagon tiles have lines on them that connected two side of the hexagon. A players always has position where their line is flowing. They have to place their next tile in front of their position. After placing the tile, the flow of all players continues flowing throught the tiles until one of three things happen:

- An edge of a tile is reached -- The flow of that player pauses at the edge until a new tile is placed in front of it.
- The flow of a player ends at a dead end -- The flow of that player is now finished.
- The flow of two players meet -- The flow of both the players are now finished.

As soon as the flow of all players has finished, the game ends. Each player scores a point for the amount of tiles that their flow has flowed over. The player with the most points wins the game.

## Implementation
The rendering logic in React can be found in the [client/src/hexlines/main.ts](https://github.com/simonkarman/ancient/blob/main/client/src/hexlines/main.tsx) file. The server logic can. be found in the [server/src/hexlines/hexlines.ts](https://github.com/simonkarman/ancient/blob/main/server/src/hexlines/hexlines.ts) file.