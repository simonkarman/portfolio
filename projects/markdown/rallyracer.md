---
title: Rally Racer
date: '2016-02-17'
contributors: Ard Bonewald, Gerrit Willemse and Simon Karman
description: The HTML5 car racing game I created while working at Tingly Games. The game uses the physics engine Box2D which was used in JavaScript by the port from C++ using ASM.js.
tags:
  - game
  - javascript
  - asmjs
  - tingly
image: https://images.ctfassets.net/r26fkm24j6bh/4BCLTXZNPFe5cYqXUNxyub/4511384a28a93e7e5771ac8a8ae65af2/rallyracer.png
---

During my time at Tingly Games I created a HTML5 car racing game. The game uses an physics engine to simulate the car physics. I used the C++ engine Box2D which was ported to JavaScript using ASM.js.

I programmed all the aspects of the game. I started with the car controls, then I created a track editor with track pieces that are nice to ride on with the car and at the end I created the AI system to add enemies cars to the tracks. The chapters below give a good overview of the work that I did to create this game.

You can play the game [here](http://www.newgames.com/en/rally-racer.html)

# Controlling the Car
The first challenge was to make the car move. This was quite a challenge because the player has to feel that he has control over the car while the screen space is quite small. What made it even harder was that I had to create the full car control using only the left mouse button and the position of the mouse.

I started by implementing something like this: [gamejs-box2d-car-example](http://domasx2.github.io/gamejs-box2d-car-example/). This seemed like the best approach for realistic driving and was also written using box2d which made it a great choice to work with. I implemented my own version which also supports drifting and backwards driving.

To make it easier to control the car, the camera placement was very important. What I did was calculate the location of the car some steps into future. I called this point the target point. The camera then chases the target point in a natural manner. This worked amazingly well.

# Creating a Track
When designing a race game always start with the controls before you create the track. It is much easier to create a track based on the movement of the car, than it is to create the movement of the car based on the track.

To come up with a great design for the track, I download about 20 images of tracks that are used in other racing games. All these tracks had different sizes of the track, different radia of the corners of the track and different sharpness of these corners. I tested which were the easiest to ride by just riding over the image without any collisions. Based on the track that was easiest and most fun to ride over I created some blueprint information for the artist to create the track pieces from.

After I had some track pieces, I had to provide a way for game designers to create a track. This also meant that the boundaries of the track should be automatically generated. To create a track the game designer simply places track pieces on an empty grass canvas, then the designer also adds a start/finish line and checkpoints to check the cars progress along the way. For aesthetics some props such as a tree, a water puddle or a house can be added aswell, these all have no effect to the gameplay however. When a track is loaded, the game will connect all the pieces. To create the boundaries I use the predefined boundaries of each track piece and connect these together. This resulted in a smooth boundary through-out the whole track.

![Rally Racer Track Editor](//images.ctfassets.net/r26fkm24j6bh/6S4Xjn4BlErU3VMuHznN8E/0db7e51b46c96769fe2313802e01747a/trackeditor.png)


# Implementing AI
A racing game isn't a great racing game without great competition. Since there is no multilayer I wrote an artificial intelligence (AI) that controls the other cars in the game.

The AI uses exactly the same system as the player has, the only difference is that input for the movement of the car is simulated. This means that the AI cars and player cars can be switched to automatic movement and player controlled movement at any moment in time. This is very useful when you finish the level and the car has to keep on driving. Also this was very handy when testing the AI. I could place the car in a very awkward position, then enable the AI and see whether it could get out of the situation and back on track. In the track editor I added the option to create an AI path trough-out the track. The AI path is then roughly followed by the AI cars and parallel branches can be created to simulate smart behavior of the cars.

After this I had a great time tweaking the AI cars until it was fun and fair to play!

You can play the game [here](http://www.newgames.com/en/rally-racer.html)