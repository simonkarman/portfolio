---
title: Visibility Polygon in Javascript
date: '2015-06-27'
contributors: Simon Karman
description: >-
  A visibility polygon implementation in JavaScript that runs in Ο(n log n) time
  by using a sweep line algorithm.
tags:
  - javascript
  - jsimon
  - geometric-algorithms
image: >-
  https://images.ctfassets.net/r26fkm24j6bh/1eULiJw6AXa5YukkbOdyTg/69e50dc5050ea65340300292db8811e3/VisibilityPolygon.png
download:
  metadata:
    tags: []
    concepts: []
  sys:
    space:
      sys:
        type: Link
        linkType: Space
        id: r26fkm24j6bh
    id: 2RaxIff9Ao9ppNO8y8Hz9X
    type: Asset
    createdAt: '2020-01-26T12:18:47.270Z'
    updatedAt: '2020-01-26T12:18:47.270Z'
    environment:
      sys:
        id: master
        type: Link
        linkType: Environment
    publishedVersion: 29
    revision: 1
    locale: en-US
  fields:
    title: Visibility Polygon in Javascript Download
    description: Dowload for Visibility Polygon in Javascript project
    file:
      url: >-
        //assets.ctfassets.net/r26fkm24j6bh/2RaxIff9Ao9ppNO8y8Hz9X/1b436f8e799c820b563ef6320e91db07/VisibilityPolygon.zip
      details:
        size: 39975
      fileName: VisibilityPolygon.zip
      contentType: application/zip
demo:
  metadata:
    tags: []
    concepts: []
  sys:
    space:
      sys:
        type: Link
        linkType: Space
        id: r26fkm24j6bh
    id: 6hlrOzzmij0fN4FvVzjisX
    type: Asset
    createdAt: '2020-03-24T19:41:40.417Z'
    updatedAt: '2020-03-24T19:41:40.417Z'
    environment:
      sys:
        id: master
        type: Link
        linkType: Environment
    publishedVersion: 26
    revision: 1
    locale: en-US
  fields:
    title: Visibility Polygon Demo
    description: Demo of the Visibility Polygon
    file:
      url: >-
        //assets.ctfassets.net/r26fkm24j6bh/6hlrOzzmij0fN4FvVzjisX/7d1fc51c1d6607ea5b258dc33970cef6/visibilitypolygon.min.js
      details:
        size: 117029
      fileName: visibilitypolygon.min.js
      contentType: text/javascript
---

One of the questions on the final exam of the Geometric Algorithms course on the Utrecht University caught my eye. The question was to come up with a sweep line algorithm to find all the segments S that are visible from a point P in Ο(n log n) time by using a sweep line algorithm.

In this demo a visibility polygon can be created in a 2-dimensional space, the plane. The region of the visibility polygon equals all the points in the plane to which a line can be drawn from the view point that doesn't intersect any wall. The visibility polygon is computed in Ο(n log n) time, in which n is linear to the number of walls in the scene.

# Live Demo
Click with the mouse in the plane to add new walls to the scene.
Hold `<control>` while moving the mouse to change the view point.