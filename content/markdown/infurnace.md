---
title: Infurnace
date: '2015-07-03'
contributors: Simon Karman, Geert Lugtenberg, Kevin Kessels and Bas Geerts
description: Infurnace is an agent-based fire disaster simulator created for the Games and Agents course on the Utrecht University
tags:
  - csharp
  - simulator
  - unity
  - utrecht-university
image: https://images.ctfassets.net/r26fkm24j6bh/3357TgaC6Cbv9Yo26WnLIk/15c254f2b685aa88076f908c098b1e7f/ProjectInfurnace.png
download: https://downloads.ctfassets.net/r26fkm24j6bh/qmr2QivPUuXSs285C25Wj/d27016be34004ff58d16d0fe5976986b/ProjectInfurnace.zip
documentation: https://assets.ctfassets.net/r26fkm24j6bh/70EAOfV5gnrBs0gDjpn4nk/7dc365f83de6c9fd4cc2e1f49415e788/Agent-Based_Fire_Disaster_Simulator_Report.pdf
---

# Introduction
Simulation of realistic events has come a long way since its inception. Nowadays simulating disaster events is a great tool to solve potential issues that might arise during such a scenario. Specifically, looking at civilian flow when they are under such stressful conditions is important since the flow will be very different from normal. These simulation often have to be quite complex in order to properly simulate and predict the behavior of the civilians. For our project we decided to create a realistic-looking simulation of a city with civilians roaming around when, suddenly, a fire breaks out in the city. The civilians have to react to this change in the environment. To do this they make use of a simplified version of the Markov decision process and a memory module. Each civilian reacts differently to its environment and they are also influenced by each other. The firefighters can be alerted by civilians who see the fire. Once the firefighters are alerted they can be dispatched with their firetruck to come and put out the fire.

# Civilian State Visualization
The image below shows a visualization of the changing states of a civilian in the Unity Editor. The changes of the states over time is equivalent to the long-term memory. The selected civilian is the blue cylinder from which the white view cone is drawn. This view cone shows the look direction of the civilian and also visualizes its view cone.

In the visualization each change of state is visualized by a colored line connecting a same colored box and a sphere. The color of the line, box and sphere determines the state that was changed towards, the box shows the location where the agent was when changing state and the sphere shows the largest cause of the change to that state.

In the image the civilian initially walked from the right side of the image on the sidewalk towards the fire. The state of the civilian changed to a run away state (yellow) at the yellow box, the position of the cause of this change is represented by the yellow sphere. This yellow sphere represents the position of the fire in this case. The civilian ran away.

After running away from the fire for a small distance the civilian changed its state again. The civilian changed back to a wandering state, which is indicated by a blue color. The blue box shows the position at which the civilian changed to this wandering state and the blue sphere shows the cause of this change. We can conclude from the picture that the civilian saw another wandering civilian making it become calmer which activated the change of state back to the wander state.

![Infurnace - Civilian State Visualization](https://images.ctfassets.net/r26fkm24j6bh/4Lw4cwbmHzuEHq2Xmid9n5/a68b86dcaa5df72e5f9bad6ebaaeac67/CivilianStateVisualization.png)

# Download
This zipfile is the project package for ProjectInfurnace. ProjectInfurnace is the Games and Agents project simulating a fire distaster in a city environment. This project was created by Simon Karman, Geert Lugtenberg, Kevin Kessels and Bas Geerts for the Games and Agents course on the Utrecht University. This package contains the following folders:

- __Actor Scripts__: This folder containts Unity scripts used to define the actor. These script can be used as reference material
- __Program__: This folder containts the final build of the Unity project as .exe (Windows executable)
- __Report__: This folder containts the report of the project in PDF format
- __Screenshots__: This folder containts screenshots of the simulation which are also used in the project
