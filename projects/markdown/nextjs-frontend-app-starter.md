---
title: Next.js Frontend App Starter
date: '2021-09-24'
contributors: Simon Karman
description: Starter for a modern frontend using Next.js with TypeScript, Contentful, and more.
tags:
  - nextjs
  - react
  - typescript
  - contentful
image: https://images.ctfassets.net/r26fkm24j6bh/3et1rits0V5wSzIrNnZkk/590bf72b92c73d33170326eeff60f0f1/nextjs.png
repository: https://github.com/simonkarman/nextjs-frontend-app-starter
---

# Introduction
I decided to bundle my frontend experience and best practices into a modern frontend starter. The starter is an example of how, with my current knowledge and experience, I would build a frontend web app for a portfolio website like simonkarman.nl.

> Disclaimer: In no way am I trying to advocate that this is the only or the best solution for a frontend project. Nor am I claiming the solution is usable for every frontend app. This solution is simply what I currently think is well suited for a static generated web app. I based this on my own expertise and knowledge and I hope that this starter gives you some takeaways for your own frontend projects. If you have any feedback or suggestions, please [let me know](https://simonkarman.nl/contact), I am always willing to learn more!

# Trying it out yourself
You can try out this starter by copying the [source code](https://github.com/simonkarman/nextjs-frontend-app-starter), reading the Getting Started section in the README.md file, and then modifying the projects to suite your own needs. If you do, attribution is appreciated.

A live demo of the app can be found on [karman.dev/nextjs-frontend-app-starter](https://karman.dev/nextjs-frontend-app-starter/). It showcases the exported version (`yarn build`) on a static cdn.

# History
During the corona pandemic in 2020, I rebuilt my portfolio website using [VueJS, Nuxt, and Contentful](https://simonkarman.nl/projects/simonkarman-nuxt). After that, during my work at Tikkie I worked with React and React Native using Typescript. I have been pondering lately about what I have learned and which improvements I can make to my personal portfolio website. That is why I decided that, instead of rebuilding my website again, I would write a minimalistic showcase of all the features I would use if I were to rebuild my website right now.

# Features
I build this starter with a few different features that I want to highlight.

The starter was built using React with Next.js and TypeScript and can be used to generate a static portfolio website by using the Next.js export functionality.

The content is created in Contentful, which is a CMS, and the type definitions for Contentful are auto-generated.

The project defines some commonly used custom written React Hooks, it employs styling using the Styled Components library, achieves linting of the source code using ESLint, runs Unit Tests using Jest, and adds precommit hooks using Husky.

That's quite a lot of features, so let's go through each feature one by one.

## React with Next.js and TypeScript
The starter is written using React, Next.js and Typescript. With technologies such as [React Native](https://reactnative.dev/) and my current professional experience it felt like the logical choice to use React over Vue.

The React framework I decided to work with is [Next.js](https://nextjs.org/), which is very similar to the Vue framework [Nuxt](https://nuxtjs.org), which I for my portfolio website. In short, Next.js ensures that common things like creating multiple pages, links between those pages, prerendering pages, and more are ready to use right out the box.

TypeScript. While a few years ago TypeScript support for libraries was sometimes lacking, nowadays TypeScript has been fully adopted. TypeScript provides benefits that are a necessity in a modern way of working. It ensures type safety, code completion, integrated documentation, and improved refactoring.

Below is an example of a Page component in Next.js written in TypeScript:
```ts
const HomePage: NextPage = () => (
  <>
    <h1>Welcome!</h1>
    <p>
      This starter is built using React, Next.js, and Typescript.
    </p>
    <p>
      <LinkTo href="/projects">
        Projects can be found here
      </LinkTo>
    </p>
  </>
);

export default HomePage;
```

## Contentful and TypeScript
The projects that are on my website are stored in a Content Management System (CMS). The CMS I'm using is [Contentful](https://www.contentful.com/). In contentful you can create your own entity types and give these entity types properties. I created an entity type 'project', with properties such as a name, a title, an image, and so forth.

The website can fetch the defatils of projects from contentful to display on the pages. But how does your IDE now what properties to expect on a 'project' entity that is returned from Contentful? We can use a TypeScript interface for this. A tool exists to extract the TypeScript interface from a contentful entity type. This tool can be found on [contentful-typescript-codegen](https://github.com/intercom/contentful-typescript-codegen).

An example of the interface that generated by the project is shown below.
```ts
// part of '@types/generated/contentful.d.ts'
export interface IProjectFields {
  /** name */
  name: string;

  /** title */
  title: string;

  /** description */
  description: string;

  /** tags */
  tags?: string[] | undefined;

  /** image */
  image: Asset;

  /** and more ... */
}
```

In the starter you can run `yarn contentful-typescript-codegen` to generate these TypeScript interfaces. You can find the resulting types in [@types/generated/contentful.d.ts](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/%40types/generated/contentful.d.ts). You can look at the `contentful-typescript-codegen.sh` file to see more details. Make sure you create a `.env.local` property specifying the values as explained in the README.md of the project to ensure you app can successfully connect to Contentful.

## Next Export
The [`next export` feature](https://nextjs.org/docs/advanced-features/static-html-export) allows you to export you app to static files (HTML, CSS, and JavaScript). An exported Next.js app run standalone, without the need of a Node.js server. This is useful when you want to deploy your website to a static file hosting environment.

To create a static export, Next.js needs to know all the pages that it needs to generate. Next.js looks at the pages you defined in the `/pages` directory and generates a HTML file for each of them.

However when pages use dynamic routes, such as `simonkarman.nl/projects/karmannet`, where `karmannet` is the dynamic part of the route. Next.js needs to know about all the different dynamic routes before it can generate the websites. To let Next.js know which dynamics routes it should use you can export a method called `getStaticPaths`. This method should generate an array of all the different dynamic parameters you want to generate that page with.

This starter uses this structure in the [`pages/projects/[name].tsx`](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/pages/projects/%5Bname%5D.tsx) file to generate a page for each project it can find at contentful.

```ts
// part of 'pages/projects/[name].tsx'
export const getStaticPaths: GetStaticPaths = async () => {
  // First get all the projects from contentful
  const projects = (await contentful().getEntries<IProjectFields>('project')).items
    .map((project) => project.fields);

  // Then create a path for each project based on the project name
  return {
    paths: projects.map((project) => ({ params: { name: project.name } })),
    fallback: false,
  };
};
```

## React Hooks
React Hooks is the new way of writing React components that use state without having to write a class. This means that reusing and structuring you components becomes easier.

If you have used React before you have probably written some custom React hooks. Within the starter I have provided some hooks that I commonly use. You can find them in the `hooks/common` directory.

- [useArray](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/hooks/common/useArray.ts) - This hook makes it easy to work with arrays in your state.
- [useAsync](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/hooks/common/useAsync.ts) - This hook takes an async function, invokes it, and returns an array with information about the progress and execution of the function. This first element in the returning array is a boolean that indicates whether the async function is still in progress, the second element is the response of the async function when it is resolved, and the third and last element is the error for when the async function was rejected. 
- [usePrevious](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/hooks/common/usePrevious.ts) - This hook makes it possible to keep track of the a previous value of some state.
- [useStateWithHistory](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/hooks/common/useStateWithHistory.ts) - This hook keeps track of the changes that are made to a variable and makes it possible to go back and forward in this history.
- [useStorage](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/hooks/common/useStorage.ts) - The hooks `useSessionStorage` and `useLocalStorages` allow you to store variables in either the session or local storage in the browser. Note that this can have some issues when used with Server Side Rendering.
- [useTimeout](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/hooks/common/useTimeout.ts) - This hook lets you execute a method after a certain amount of time.

> These hooks are inspired by [Web Dev Simplified](https://www.youtube.com/watch?v=vrIxu-kfAUo&ab_channel=WebDevSimplified) and have been rewritten in TypeScript by me.

An usage example can be found in the [`hooks/projects/useProjects`](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/hooks/projects/useProjects.ts)-file. There the `useAsync` hook is extended and used to fetch all the projects from Contenful. Usage of this hook can be found in the [`pages/projects.tsx`](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/ages/projects.tsx) file.

## Pregeneration vs Dynamic Loading
The contect of pages can be pre-generated during the `next export` or data can be fetched by the browser while a user loads the page. Both approaches have pros and cons. The [projects page](https://karman.dev/nextjs-frontend-app-starter/projects/) demonstrates the difference between the two.

> The `getStaticPaths` method can be used to pre-generate pages during export, while with the `useProjects` hook shows how you can dynamically load new data at run time in the browser of the client.

The upside of pregenerating the list is that the page loads very fast and that the data is also part of Search Engine Optimization (SEO). A downside however is that you need to create a new export of your website any time you make changes to it. If your content changes often, this might be a problem.

The upside of loading content dynamically is that the website will always fetch the lastest information from your source. A downside is that the client side code also needs to be able to access the contentful data directly, meaning your (read-only) api key will ship to your clients and that clients have to wait precious milliseconds before the content is loaded.

A combination of both works best in most cases: Pre-generate the pages, but dynamically update them whenever new projects are available.

## Styled Components
For styling I used [Styled Components](https://styled-components.com/). What's great about styled components is that it really fits well into the component based approach of React, which makes it easy to create your own custom style library. Styled components comes out of the box with a great color scheme and a grid layout system.

An example of a styled component can be seen below:
```ts
// Define a Box with shadow, which is a div
const Box = styled.div`
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);;
  border: 1px solid gray;
  margin: 0.5em;
  padding: 0.5em;
`;

// Then you can use the Box in your Page just like it is a component
const Page = () => (
  <>
    <Box>
      <h1>Title</h1>
      <p>Text</p>
    </Box>
  </>
);
```

Next.js has to understand that styled-components are being used. You can do this by adding the `styled-components` plugin the the `.babelrc` file.

```json5
# in '.babelrc'
{
  ...
  "plugins": [
    ...
    [
      "styled-components",
      {
        "ssr": true,
        "displayName": true,
        "preprocess": false
      }
    ],
    ...
  ]
}
```

There is also a downside to using styled components. Since your styles are generated during runtime they are relatively slow to load. Luckily when using a pre-generation styles are part of the static files, so this is less of an issue.

## Git Hooks with Husky
As a developer you don't want to push code to your git repository that breaks. This means you'll first need to fix your issues before commiting your code, which ensures all code pushed to the origin repository is valid.

I use Git hooks to achieve this. Everytime I try to commit new code the code will be build, tested, and linted. Whenever one of these steps detects an issue, the commit will not go through and fail. To easily setup Git hooks in an npm managed project you can use [Husky](https://www.npmjs.com/package/husky/v/4.3.8)

For the linting step I use [ESLint](https://eslint.org/). ESLint statically analyzes your code to quickly find problems. Many problems ESLint finds can be automatically fixed. Only problems that cannot be automatically fixed have to be manually looked at. The rules and configuration of ESLint I use can be found in the [`.eslintrc.js`](https://github.com/simonkarman/nextjs-frontend-app-starter/blob/main/.eslintrc.js) file.

For the unit testing step I use [Jest](https://jestjs.io/). Jest runs all tests it can find in files that match the `*.test.ts` expression. Please note that this starter does not contain proper unit tests.

# Visual Studio Code
When working on React project I generally use Visual Studio Code. Within VS Code I use some extension to make my life easier:
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)

You can also enable fixing linting errors everytime you save a file in VSCode by adding the following to your VSCode settings file (`.vscode/settings.json`):
```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
}
```

# Trying it out
That's all! I hope that this starter gives you some takeaways for your own frontend projects. If you have any feedback or suggestions, please [let me know](https://simonkarman.nl/contact), I am always willing to learn more!

You can try out this starter by copying the [source code](https://github.com/simonkarman/nextjs-frontend-app-starter), reading the Getting Started section in the README.md file, and then modifying the projects to suite your own needs. If you do, attribution is appreciated.

A live demo of the app can be found on [karman.dev/nextjs-frontend-app-starter](https://karman.dev/nextjs-frontend-app-starter/) and showcases the exported version (`yarn build`) on a static cdn.