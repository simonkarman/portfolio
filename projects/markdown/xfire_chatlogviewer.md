---
title: Xfire Chatlog Viewer
date: '2013-03-22'
contributors: Simon Karman
description: A chatlog viewer for Xfire with easy access to all your contacts and your conversations.
tags:
  - c#
  - windowsforms
image: https://images.ctfassets.net/r26fkm24j6bh/4GBDmJ7ETm202asG4gQEuU/6d846f606e56c4a55f25678c77f88985/xfirechatlogviewer.png
download: https://assets.ctfassets.net/r26fkm24j6bh/2fsLnw64e0aKMuOQ8yQyaa/6bdf1ccdca3b98baa75231c033d6f90b/xfire_chatlogviewer.zip
---

I created an XfireChatlogViewer using Windows.Forms in .NET 4. 

On startup the XfireChatlogViewer will load your chat logs from Xfire and it tries to convert them to an easy understandable user interface. As shown below:

![Xfire Chatlog Viewer Image 2](//images.contentful.com/r26fkm24j6bh/13CYflLBcQeaqqou8gse8w/dc077de4aa74e02854a695047d8d1a3b/viewer.png)

Please note that __only DUTCH__ chat logs can be converted so that this program only works for the dutch Xfire chat log format.

# Seperating GUI and data
Programming this program I focused on separating the GUI from the actual data a lot since this was something I wanted to get more experienced with. This was also the main reason for creating this application.
Since loading the data doesn't involve any form interaction whatsoever the program can easily preform this task in a different thread than the forms thread. This way the application won't freeze up-on loading the conversations.

# Easy to use Chatlog classes
The second point I focused on was that I wanted to create an easy to use class library that stores all the classes.
I used the following class setup:
__ChatlogHistory__ (one ChatlogHistory object will contain all the chatlog data for one xfire-user)
- List<ChatLog>

__ChatLog__ (one ChatLog object contains all the conversations between the xfire-user and one contact)
- string username
- List<Conversation>

__Conversation__ (one Conversation object contains the begin time, end time and all the messages between the xfire-user and one contact in that conversation)
- string nickname
- string nicknameFriend
- DateTime started
- DateTime ended
- List<Message>

__Message__ (one Message object contains the time and the text that was send in that message)
- DateTime time
- string text
