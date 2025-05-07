---
title: Endless Cave Generation
date: '2013-07-01'
contributors: Simon Karman
description: >-
  An endless cave generation algorithm I created in Unity. It only uses 3
  different segments to generate unique and random caves.
tags:
  - pcg
  - unity
  - c#
image: >-
  https://images.ctfassets.net/r26fkm24j6bh/1DHibXkiKUAqEogK4Eia62/ff224b84053c9ed9e8b128879db34e7f/segments.png
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
    id: 1dXkpv5ylKCeWOaSCU2mqs
    type: Asset
    createdAt: '2017-10-10T23:56:18.101Z'
    updatedAt: '2017-10-10T23:56:18.101Z'
    environment:
      sys:
        id: master
        type: Link
        linkType: Environment
    publishedVersion: 36
    revision: 1
    locale: en-US
  fields:
    title: Endless Cave Generation Download
    description: Download for Endless Cave Generation
    file:
      url: >-
        //downloads.ctfassets.net/r26fkm24j6bh/1dXkpv5ylKCeWOaSCU2mqs/6dd6aadc2981a8a21d50d87677ffab0b/EndlessRunner_CaveGeneration_SimonKarman.zip
      details:
        size: 17716797
      fileName: EndlessRunner_CaveGeneration_SimonKarman.zip
      contentType: application/zip
---

I created an endless-running type of cave generation in Unity C#. (Download at the bottom of the page!)

As seen in the image above it only uses 3 different segments. These are used to generate unique and random caves. It is really easy to create more segments and add those to the system using the Unity Editor Script I wrote.

The core of the system is rougly 20 lines of code:

    public GameObject CreateNewSegment(Connection connectedTo)
    {
        //Create the segment
        GameObject segmentPrefab = Hierarchy.GetComponentWithTag<Picker>("SegmentPicker").Pick(segmentsSpawned).GetComponent<SegmentCollection>().GetRandomSegment();
        GameObject segmentInstance = (GameObject) Instantiate(segmentPrefab, Vector3.zero, Quaternion.identity);
        segmentInstance.transform.parent = this.transform.parent;
         
        //Setup segment connections
        Segment segment = segmentInstance.GetComponent<Segment>();
        Connection otherConnection = segment.connections[Random.Range(0, segment.connections.Count)];
        if (connectedTo != null)
        {
            otherConnection.other = connectedTo;
            connectedTo.other = otherConnection;
        }
         
        //Create a segment holder at the transform of the otherConnection
        GameObject segmentHolder = new GameObject("SegmentHolder");
        segmentHolder.transform.position = otherConnection.transform.position;
        segmentHolder.transform.rotation = otherConnection.transform.rotation;
         
        //Setup the holder hierarchy
        segmentHolder.transform.parent = this.transform;
        segment.transform.parent = segmentHolder.transform;
         
        //Place segment on the connection
        if (connectedTo != null)
        {
            segmentHolder.transform.position = connectedTo.transform.position;
            segmentHolder.transform.rotation = Quaternion.LookRotation(-connectedTo.transform.forward, connectedTo.transform.up);
        }
         
        segmentsSpawned++;
        OnSegmentSpawned();
        return segmentHolder;
    }

In the image below you can see part of a generated cave. The player is in the center segments. This segment is connected to a next segment on each side. When moving to a different segment that segment will get activated and generate segments for it's connection points. The old segments that are now further away will get removed.

![Endless Cave Generation Image 2](//images.contentful.com/r26fkm24j6bh/4ru22BZqeIUesAguOyAWWQ/ee8ae7a203010b0874547ea396a625ec/segments.png)

In the download below you can test the random cave generation yourself. A windows and a mac build are provided.