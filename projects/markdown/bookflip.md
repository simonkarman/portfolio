---
title: The Magic Adventures of Luna
date: '2016-06-23'
contributors: Suus Looijen, Mangle Moose and Simon Karman
description: The Magical Adventures of Luna a short fairytale that is told via an interactive book.
tags:
  - game
  - csharp
  - unity
image: https://images.ctfassets.net/r26fkm24j6bh/2t15OlKCbwW1b5MV5PsBEc/7bdb966661148af060e11ea079b29de9/bookflip.png
download: https://downloads.ctfassets.net/r26fkm24j6bh/6WBynAn7JOPii8C3zOZcMN/56ff2c59e8f5080ceb6432ea9effc5cf/bookflip_version_0.61.zip
---

This is the graduation project of Suus Looijen. She needed someone to code the book for her. That's what I did. The art is made by Suus, the sound and music is done by Mangle Moose and I coded it all together.

The Magical Adventures of Luna is a digital, interactive fairytailbook for tablet and pc. The story is played in a 3D environment. The player can flip the pages to read the whole story. In the story the player follows Luna. Luna is a girl who lives in a remote house in the forest with her dad. Her grandma gave her a jewel before she died. Luna finds out that there is something mysterious about this jewel.

The project was created using the Unity 3D Engine. The technique used here to create the book is a separate camera for each page. These page-cameras render their view to a render texture, an overlay for the sides of the page is placed on top of this texture and this texture is then used on a separate mesh in the book that resembles the page. I used a different scene for the book and the world, these scenes are merged upon starting the game.

![BookFlip Developer](//images.ctfassets.net/r26fkm24j6bh/6cpWMflu5EBOJgRtLJs10o/4ebdd589eda519c29ffb59f72d61dd2d/bookflip_open.png)
