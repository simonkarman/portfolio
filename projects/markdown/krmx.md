---
title: Krmx
date: '2023-08-08'
contributors: Simon Karman
description: A network protocol for realtime multi-user interactions.
tags:
  - krmx
  - typescript
  - websockets
image: >-
  https://images.ctfassets.net/r26fkm24j6bh/7un7jZTuk0lU6z8XETyhZ8/d2bdb355e51faed5cb8295d7ff244f45/krmx-events.png
repository: https://github.com/simonkarman/krmx
---

**Krmx** is a network protocol for realtime multi-user interactions.

Let's break that down.

Krmx is a **network protocol**. A network protocol defines a set of rules and conventions for exchanging messages between a client and a server. Krmx uses WebSockets to achieve **realtime** and bidirectional connections.

Krmx is a **multi-user** protocol. An application using Krmx always consists of one or more clients that create connections to a *single server*. Once a client established a connection to the server, it can link its connection to a user. Connections that are linked to users will receive realtime information about all users on the server and can send custom messages to the server.

Krmx lets you build **interactions**. As the application designer you extend the Krmx protocol with custom messages that are sent between server and client over the connections. These custom messages define the interactions your users have with the server (and each-other).

Get started and find more information in the [Krmx Documentation](https://simonkarman.github.io/krmx).

The reference implementation of Krmx in TypeScript are hosted on npm and can be found here:
- [server](https://www.npmjs.com/package/@krmx/server)
- [client](https://www.npmjs.com/package/@krmx/client)

You can install Krmx in an npm project using the following commands.

```bash
# in your NodeJS backend
npm install @krmx/server

# in your React frontend
npm install @krmx/client
```
