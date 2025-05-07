---
title: Dagobert
date: '2019-06-28'
contributors: Qontinuum
description: Project at ING Bank to payout ING Service Points.
tags:
  - quintor
  - ing-bank
  - java
  - axon
image: https://images.ctfassets.net/r26fkm24j6bh/4eJslOFLyQlOboWLaVUYjA/430f57f9766673875eb9c3d2e4cc36c6/quintor-ing-dagobert.jpg
---

After starting at Quintor my first assignment was at ING Bank. At ING I joined a team that consisted of mainly Quintor colleagues. During the project we worked on the Dagobert-application for half a year. We started in December of 2018 and helped until June of 2019. The goal of this project was to setup a correct, safe and configurable payout process to ING Service Points (ISP).

# ING Service Points (ISP)
An ISP is a servicedesk in a non-ING location, such as a Bruna store. The customers will be assited by an employee from the Bruna store, which can carry out tasks on behalf of ING. For example: opening a bank account. To each of these tasks a compensation is coupled. For every customer that the Bruna store assists, that store will be compensated at the end of the month.

To regularize these payments, multiple systems need to be coupled. Starting with a few __source systems__. During the time we were developing this application there were four. These source systems register all the tasks that were carried out by the ISPs and make this information available to other applications. Some of these applications did this dayly by uploading a file, others did this in realtime by writing to Kafka.

We used an application that would use the daily generated files as input, validated them (for example counting wether the number of rows conformed to a certain baseline for that day and week), and then translated these rows to events and sends them to Kafka. This ensured that the Dagobert application would be able to retrieve all the information from the source systems as events.

![Quintor ING Dagobert Duck](//images.ctfassets.net/r26fkm24j6bh/6Y29OUotwPR07nzxpcaE19/c3f274726910ea04b4d9ee92936a8f89/quintor-ing-dagobert-duck.jpg)

Within the Dagobert application we made use of the [Axon Framework](https://axoniq.io/). Kafka events were delivered to Axon. Incoming events were stored and processed by __Aggregates and Sagas__. From these events a daily report would be generated. These daily reports could then be viewed by internal ING employees for verification, before they were paid out. 

After this initial setup was inplace we handed over further development of the application to an internal ING team.

# Scrummaster
While working on the project I became scrummaster of the team. This meant that, appart from my development and architectural duties, I would ensure the team could perform its work as best as possible.

During my time as scrummaster I also achieved my __scrummaster certificate__ at the Zilverline scrum training center hosted by Michael Franken and Bas van der Hoek. This certification gave me the drive to improve our way of working even further. Together with the rest of the team we implemented some of my learnings from the certification course into our daily process.

Our daily standups, refinment process and backlog management were all optimized and improved. Our velocity also peaked after that. We all learned a lot from this process and it was a lot of fun.

# Implementation
The implementation was divided into four main modules. (1) All source information as events, (2) calculating the daily/monthly reports, (3) configuration of the compensation system, and (4) a four eye principle verification process on all changes and payouts.

Our team predominantly worked on module 2: Calculating the daily/monthly reports. After that was setup, we handed the rest of the work over to an internal ING team to continue development. During this handover I gave many sessions on the inner workings of the system we build. This included sessions about subject such as Development under Linux, Java Programming, and the Axon Framework.

# 3 Key Insights when working with Axon
Working with Axon, implementing an event driven system, and sharing our work with an other team gave me a good undestanding the framework and resulted in some key insights. I would like to share the following three insights, which I think apply to any Axon project.

## Idempotency
When developing an event driven system you should expect events or messages to be delivered more than once to an application. This can happen due to a service going down and not being able to acknowledge to the message broker that a message has been succesfully process, resulting in the message being delivered twice. To ensure that this doesn't result in invalid application state **it is important to handle incoming events in an idempotent way**. This simply means that when the same message or event is delivered twice, that the application knows how to handle this. In Dagobert we ensured that messages all messages had a source id, messages with the same source id and the same content can now be discarded when they arrive a second time.

## Aggregates vs Sagas
In Axon there are two important constructs, an Aggregate and a Saga. This section will describe both and their relationship.

### Aggragate
An **aggragate should represent an object in the domain model**. For example a daily report. In this example a daily report aggragate listens to commands and builds up all internal information needed to handle commands for the rerpot. The aggregate sends out an event every time a command has been handled. This is done to notify other components of the application that the report has been updated. **An aggragate does that hard work, based on this it is sending out events, and listens to new commands to process.**

### Saga
**A saga represents a (long-lived) process within your domain**. For example the approval of a daily report. An approval is a long-lived process, the approval saga listens to events that happen within your application. Based on events the saga keeps track of an internal state of the process. Based on this state it can delegates commands to aggregates. **A saga orchistrates a process, sending out commands, and listening to events.**

As can been seen from the above an aggregate and a Saga are actually opposites. An aggragate does that hard work, based on this it is sending out events, and listens to new commands to process. A saga orchistrates a process, sending out commands, and listening to events. Keep this in mind when chosing wether to use a Saga or Aggragate within your application.

When building an event driven application it is important to understand that the sole purpose of your aggragates and sagas are to process business logic. If you find them not to do that you're probably using them in the wrong way.

## Query Model / Projections
The way Axon is setup is that you cannot directly access the internal states of your aggragates and sagas. There is ofcourse a good reason for not being able to access the internal state of them, because they should only be accessed in a controlled way (via commands and events) so that the system can (for example) be distributed across mutliple system to handle large amounts of incoming messages.

Ofcourse you still want to give the users of your system insight into the internal state of your application. To do this you do need to be able to query your domain models. To facilitate this you build a query model.

There many advantages of using such a query model, I'll highlight two:
1. Reading from the database is user facing and should thus be quick, while writing to the database is mostly done by other application that often don't mind waiting those extra milliseconds.
2. A user of an application assumes reads to be quick and expects writes to take some time. These are two reasons for using the query model.

Within an Axon application a query model is simply an entity that listens to events that happen within your application and stores this information as close as possible to the way it should be displayed. Within Dagobert we called these query models: projections. For example a daily report projection would listen to all events that occured on the daily report. Based on these events a query model is build that projects all properties of the report into a single row in a database. When we want to display a daily report in the front end, we simple get one row from the database and display all information in there.