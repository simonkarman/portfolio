---
title: Rebuild of simonkarman.nl
date: '2020-03-24'
contributors: Simon Karman
description: A rebuild of my portfolio website using VueJS, Nuxt, TailwindCSS, and Contentful.
tags:
  - vue
  - nuxtjs
  - javascript
  - contentful
image: https://images.ctfassets.net/r26fkm24j6bh/4THLEnsM3LzBepRWlWXEKV/87b3551822e6e289ea2fba40da232e6a/home.png
---

Up until today, my website was build using a custom framework I had build in php. For a long time I have wanted to rewrite it and now its finally here, a rebuild of my portfolio website using VueJS, Nuxt, TailwindCSS, and Contentful.

The general layout of the site was kept very similar. The header of each page is still showing my logo and name. As can be seen below the home page shows some information about me, where you can click to get to know more about me and it shows the 5 latest projects I worked on.

![Home of simonkarman-nuxt](//images.ctfassets.net/r26fkm24j6bh/4THLEnsM3LzBepRWlWXEKV/87b3551822e6e289ea2fba40da232e6a/home.png)

Also pages like the contact page as shown below have in general kept the same structure, but just with a more modern look.

![Contact of simonkarman-nuxt](//images.contentful.com/r26fkm24j6bh/4DKNV5oMZe3HsMZiKivWlH/32375d4eb87af44eb00e1ddf35c1f829/contact.png)

# Content Management
One of the most time consuming challenges of migrating my website was to setup a system in which I can easily manage my content (aka my portfolio).

In my former php implementation I used a mysql database that contained entries for all the different recent updates and projects. Next to that I used the `project-data/` directory to store all the images, downloads, source code, ect... for these projects. 

First, I decided that my 'recent updates' page no longer made sense. This page contained post similair to post you nowadays find on websites like linkedin and twitter. As I have accounts on such websites I can easily post these kind of posts there. So I decided to completely remove this feature.

Secondly, I decided to move the database of projects to a tool called [Contentful](https://www.contentful.com/). In Contentful you can create your own entity types and give these entity types properties. I created an entity type 'project', with properties such as a name, a title, an image, and so forth. The nice thing about contentful is that is also allows you to store your files such as images and downloads and serve them to your users. It took me quite a few days to reimport all projects in contentful including all assets, but the endresult was worth it. Now all my projects are stored at contentful and editable via a beautiful UI.

![Contentful projects of simonkarman-nuxt](//images.contentful.com/r26fkm24j6bh/6iRKbfbeaTfhcSIWJQWlIU/35ebfc84999b40ee1a7b4b02ab7749b3/contentful.png)

# Technology
For the technology of the new website I have chosen to use VueJS, [Nuxt.js](https://nuxtjs.org), and [TailwindCSS](https://tailwindcss.com/).

Nuxt is an intuitive framework for developing VueJS application. It has features build in such as File-system Routing, Data Fetching, and Modules Ecosystem. It is also SEO Friendly by being able to pregenerate pages to an static html format, which can be easily served by a static cdn (Content Delivery Network).

TailwindCSS is a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center` and `rotate-90` that can be composed to build any design, directly in your markup. The utility classes are also easily extendible with a config file and only utility classes you actually use will be packaged with your production build. This makes it super easy to create and build prototypes fasts. The only downside that this creates is that it mixes the structure of you html with your styling, which is normally separated into your html and css.

> Note: In september 2021 I wrote an update about how I would build a frontend web app for a portfolio website like simonkarman.nl based on new insights and experience. You can find it here [simonkarman-next](https://simonkarman.nl/projects/nextjs-frontend-app-starter)