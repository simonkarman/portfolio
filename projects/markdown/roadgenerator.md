---
title: Road Generator
date: '2014-01-06'
contributors: Simon Karman
description: A mesh generator that will generate a mesh along a curve. The generator will create a smoothed and parameterized mesh that will go through the points you provide.
tags:
  - pcg
  - c#
  - unity
image: https://images.ctfassets.net/r26fkm24j6bh/322aANGtvWu2WKKsw6yK4m/c0406c2f8239d70ad83d011d123e172b/smart_tangents.png
download: https://assets.ctfassets.net/r26fkm24j6bh/4Sh7FOpZ0s8EEUIKYsGQoY/a1ca173eafbf505559fe08f7dca5e2ff/roadgenerator.zip
---

A Road Generator that will generate a road mesh. It is created for use in the Unity Game Engine.

__Warning!: This project is unfinished. You can download and view the project but it might not contain proper documentation and/or fully work.__

Using this Road Generator you can easily create a road for your games. The road will be created by specifying the following data:
- a set of points,
- a profile,
- a material;
The generator will create a smoothed and parametized road mesh that will go through the points. The road will have the profile and material as you specified.

I implemented the tangents (as seen in the image above) using the following algoritme I wrote:

    public Vector3 GetTanget(int index, bool to)
    {
        int prevIndex = PreviousIndex(index),
            nextIndex = NextIndex(index);
             
        Vector3 direction = (points[nextIndex] - points[prevIndex]).normalized;
        float tangetMultiplier = 1f;
        if (to)
        {
            tangetMultiplier = -smoothing;
            tangetMultiplier *= (points[prevIndex] - points[index]).magnitude / 3;
        }
        else
        {
            tangetMultiplier = smoothing;
            tangetMultiplier *= (points[nextIndex] - points[index]).magnitude / 3;
        }
        return direction * tangetMultiplier;
    }

After you created your road shape you can create the mesh. The mesh is shown in the picute below:

![Road Generator Image 2](//images.contentful.com/r26fkm24j6bh/59I80yp0MMiMacEowmcEWe/669d5b4e782e652adb11b5dc9d2e46db/roadmesh.png)

You can also see that I used a road profile which is how the road is generated in the width of the road. You can use any amount of points in this profile.

One big part of the mesh generation is parametrizing the roads points. This means that each point has the same length to the next point.

    public Vector3[] GetParametizedPoints(int pointCount)
    {
        int detailCount = pointCount;
        Vector3 previousPoint;
        float length = 0f;
        float calcLength = 0f;
        float[] lengthAt = new float[detailCount];
        for (int i = 0; i < detailCount; i++)
        {
            Vector3 point = GetPosition(i / (float) (detailCount));
            if (i > 0)
                calcLength += (point - previousPoint).magnitude;
            if (i == detailCount - 1)
                length = calcLength;
            lengthAt[i] = calcLength;
            previousPoint = point;
        }
         
        Vector3[] pPoints = new Vector3[pointCount];
        int     pointer = 0;
        float   cProgress = 0f;
        for (int i = 0; i < detailCount - 1; i++) 
        {
            int ni = i + 1;
             
            float   lProgress1 = lengthAt[i]    / length,
                    lProgress2 = lengthAt[ni]   / length;
             
            float   oProgress1 = i  / (float) (detailCount - 1),
                    oProgress2 = ni / (float) (detailCount - 1);
            while (cProgress < lProgress2 && pointer < pointCount)
            {
                float   lerpPosition    = Mathf.InverseLerp(lProgress1, lProgress2, cProgress),
                        actualProgress  = Mathf.Lerp(oProgress1, oProgress2, lerpPosition);
                 
                pPoints[pointer] = GetPosition(actualProgress);
                 
                pointer++;
                cProgress = pointer / (float) (pointCount);
            }
        }
        return pPoints.Select(p => transform.TransformPoint(p)).ToArray();
    }
    
All source code is available in the download