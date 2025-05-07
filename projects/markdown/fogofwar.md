---
title: Fog of War
date: '2013-09-23'
contributors: Simon Karman
description: An Unity utility to show an Age of Empires II alike fog of war in your game.
tags:
  - unity
  - c#
image: https://images.ctfassets.net/r26fkm24j6bh/Gbt3Ga5zMq68KWciWwgam/6eb4116f9766064f3f7f58374f9900d3/unity_fogofwar.png
download: https://assets.ctfassets.net/r26fkm24j6bh/1JwJgZB5x60ummwemkSEkc/321edc43325c2953e93fad95a09b0323/unity_fogofwar.zip
---

I created a Fog of War Utility to easily create and manage an 'Age of Empires II'-like FogOfWar in your game.

As seen in the picture above with only 2 scripts and 1 material you can create a really great looking Fog of War for in your own game.

Simply create a new GameObject in your scene and add the FogOfWar component to it. In this component you can change the appearance of the FogOfWar. You can change the densitiy, the curve that determines the fall off strength of the FogDissolvers and you can specify the material that should be used to render the FogOfWar.

The material that you use for the fog of war should use the shader provided in zip in the graphics folder. As an example texture for this shader you could use the cloud.png provided.

Now you have setup the FogOfWar you can start creating your FogOfWar dissolvers. These dissolvers will dissolve the FogOfWar around them. You can specify the intensity and radius of each FogOfWarDissolver.

Have fun and bring my code to good use! :) Please give me some credits in your game.