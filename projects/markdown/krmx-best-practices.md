---
title: Krmx Best Practices
date: '2023-11-23'
contributors: Simon Karman
description: A Krmx server and client using with a system architecture.
tags:
  - krmx
  - typescript
  - websockets
image: >-
  https://images.ctfassets.net/r26fkm24j6bh/2udVVZEdIza6jTBd2EPVkj/69b23cf17ee8e5fd24d0225e39648313/krmx-best-practices.png
repository: https://github.com/simonkarman/krmx-best-practices/
---

If you've used [Krmx](https://simonkarman.github.io/krmx) before you know it can be tedious to manually sync state on server and client-side. To circumvent these issues, this mono repo sets up a [Krmx](https://simonkarman.github.io/krmx) server and client using a **System** architecture.

## Features
A **System** is a shared state store with predefined actions that uniformly alter that state on the server and clients. The clients use optimistic updates to give immediate feedback to the user.

It provides the following features.
- Uniform state management
- Optimistic updates at the Client-Side
- Utilize React ContextAPI to get the state
- Keep track of history to seamlessly let new clients join
- Use batches of events to stream history to clients
- Restore server state on restart by replaying history