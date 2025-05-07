---
title: Elemental Arena (next)
date: '2022-03-11'
contributors: Simon Karman
description: A proof of concept on using React and SVG to create a board game in your browser.
tags:
  - game
  - react
  - next
  - svg
image: https://images.ctfassets.net/r26fkm24j6bh/7fQvzHkj5regKfbcIbrkHX/04b90b06af67b625d7ecd177b9f5fd09/elemental-arena-next-dark.png
repository: https://github.com/simonkarman/elemental-arena-next/
---

Elemental Arena is the working title of a board game I'm working on together with Rik Dolfing. This project is a proof of concept on using React and SVG to create a board game in your browser.

In Elemental Arena (working title) you and your opponent both control creatures on a hexagon tiled board. Each turn you can spawn creatures, activate abilities of creatures, and move the creatures around. The creature you start with is your King, your king has some special and unique abilities that determine the strategy for the creatures and sorceries in the rest of you deck. Your goal is to kill all the king creatures of your opponents, once you do, you win the game.

The proof of concept shows how you can use React to generate a dynamic SVG canvas which can be interacted with. In the [interactive demo](https://karman.dev/elemental-arena-next/) there are three modes: selection, tile, and creature. 

- __selection__ mode: In this mode you can select creatures you placed to view more details about them. This shows of that you can interaction from within the SVG image can effect the React page.
- __tile__ mode: In this mode you can add and remove tiles to the board. This shows that you can add interaction based on a click anywhere in the canvas.
- __creature__ mode: In this mode you can add and remove creatures from tiles. The creature you place is randomly generated and is assigned to one of the players (orange or blue). You can view its power, health, energy, and abilities.

There is also a theme switcher which allows switching between a default-theme and a dark-theme.

Please, take a look at the [interactive demo](https://karman.dev/elemental-arena-next/). 

![Element Arena Next (default theme)](//images.ctfassets.net/r26fkm24j6bh/6JGB6Bp83ffQOIPIzAL7tB/d75066a5289b62a724141dee43fdad2a/elemental-arena-next.png)