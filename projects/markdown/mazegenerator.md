---
title: Maze Generator
date: '2014-02-02'
contributors: Simon Karman
description: A step-wise Maze Generator that can generate unique mazes using a breadth-first or greedy algorithm.
tags:
  - pcg
  - unity
  - c#
image: https://images.ctfassets.net/r26fkm24j6bh/IVNSXzVdamUUOYEkm6cSE/463eaa1838e601758a9cadcb9951754b/maze.png
download: https://assets.ctfassets.net/r26fkm24j6bh/1mLORpowwMY4wqc2mQ8Mg2/ec6e2c609cb3f33b424a5e877b26e3d8/MazeGenerator.zip
---

This project is a step-wise Maze Generator that can generate unique mazes using a breadth-first or greedy algorithm.

When you start the program you can edit the generation settings, which gives you control over the following properties:
- __width__ The number of columns in the outputted maze,
- __height__ The number of rows in the outputted maze,
- __stepwise__ Whether to build up the maze stepwise (true) or to create it in one frame (false),
- __shaked__ Whether to apply a random grid offset (true) or to keep the grid right-angeled (false),
- __generation type__ The type of generation used to generate the maze. Can be either breadth-first or greedy.