---
title: Scavenger Hunt
date: '2019-05-11'
contributors: Simon Karman and Ruud van der Weide
description: Scavenger Hunt web app build with Vue and Netlify
tags:
  - vue
  - netlify
image: >-
  https://images.ctfassets.net/r26fkm24j6bh/2LZrTKU1yrIypU0qAYclgh/d29afa97c2ee10a055040d2e70f545b8/gno-dag-vue-netlify.png
repository: https://bitbucket.org/simonkarman/scavenger-hunt
---

# Scavenger Hunt
Once a year my sister and I organize a day full of activities for our parents. This year we decided to organize a scavenger hunt. During the day we wanted to provide our parents with new clues as to where we should be going, or what they should do. We wanted them to find out about these clues gradually during the day without our intervention. To facilitate this I wrote this small web app.

I asked Ruud van der Weide for advice on how to setup such a project. Ruud was kind enough to help me pick the right tools for this job, since I had only one day to build it, it was important that the setup could be done quick. I didn't expect that setting up up a continuous deployment pipeline was achievable within one day, however Ruud showed me that this was definitely possible using Vue and Netlify. After I build I feel like this was indeed the way to go! Thank for you advice, Ruud!

So, I build this modern web app using Vue and Netlify. The webapp can still found on [https://gno.karman.dev](https://gno.karman.dev). Note that in the current state of the web app all clues have already been provided. The source code can be found at [Bitbucket](https://bitbucket.org/simonkarman/scavenger-hunt).

## Vue
Vue is a progressive JavaScript framework, that lets you easily define interactive components that can be rendered in your HTML pages.

The core of Vue is a system that allows you to render data to the DOM using a template syntax. By specifying a template, script and style block you can define your own components. An example can be seen below:
```vue
<template>
  <div id="app" class="app">
    {{ message }}
  </div>
</template>

<script>
  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
  })
</script>

<style>
  .app {
    color: red;
  }
</style>
```

For the scavenger hunt project I used the [Vue cli](https://cli.vuejs.org/). This made it easy to setup the project and to allow me to use `npm run build` to generate a static website. The static website will be published to the `dist` directory.

I wrote a ScavengerHunt component that kept track of the current time. Based on this time it knew which clues to show. The list of cues where shown by rendering a Clue component for each. As time progressed during the day, more clue components were shown.

```vue
<template>
  <div>
    <div class="header">
      <h1>Moeder- en Vaderdag 2019</h1>
      <p class="now">{{ nowDisplayable }}</p>
      <p>Clues: {{ visibleClues.length }} / {{ clues.length }}</p>
    </div>
    <div class="clues">
      <Clue
        v-for="clue in visibleClues"
        :key="clue.date"
        :start="clue.start"
        :title="clue.title"
        :message="clue.message"
        :image="clue.image"
      />
    </div>
  </div>
</template>
```

## Netlify
After building the web app using Vue on my local machine, I needed a way  to deploy it to a website, to achieve this I used Netlify.

[Netlify](https://www.netlify.com/) offers hosting and serverless backend services for web applications and static websites. The great thing about Netlify is that it is very easy to use.

In Netlify you can create a project. For this scavenger hunt project I created the `gno-dag` project, the projects you create are directly accessible under `https://<project-name>.netlify.app/`. I then connected the project to the master branch of my Bitbucket repository. This allowed me to configure that every commit to the master branch would result in the `npm run build` command being exectuted by Netlify and the `dist` directory being deployed to `https://gno-dag.netlify.app/`. Lastly, I added a CNAME dns record to karman.dev to allow access to the site via [gno.karman.dev](https://gno.karman.dev).

That's all! Within 15 minutes I had a continuous deployment pipeline up and running.