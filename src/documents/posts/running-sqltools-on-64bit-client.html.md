---
layout: post
title: Running SqlTools on 64bit Oracle Client
date: 2014-03-20 00:00

published: true
comments: true
tags: Sql
---

[SqlTools](http://www.sqltools.net/) is an extremely light weight and fast windows frontend for Oracle. [SQLTools++](http://www.sqltools-plusplus.org:7676/) is based on it with fixing some bugs. I started to use it from years ago in Windows XP era and love it much more than [Oracle SQL Developer](http://www.oracle.com/technetwork/developer-tools/sql-developer/overview/index.html) or [Toad](www.quest.com/toad/).

However, it requires Oracle Client installed. I always have installed Oracle Server for development at local, so this is not an issue to me.

About 3 years ago, I switched to Win 7 64bit and installed Oracle Server 64 bit for development. The SQLTools++ does not work any more with this error:
> The application was unable to start correctly (0xc000007b).

<img title="Running SqlTools on 64bit Oracle Client" src="/stuff/sqltools-win-x64-error.png">

** Solution **

1. Download a 32bit [Oracle Instant Client](http://www.oracle.com/technetwork/topics/winsoft-085727.html).

2. Extract the Oracle Instant Client to a folder. E.g. `d:\oracle\instantclient_12_1\`.

3. Add the folder into system PATH.

4. Start SqlTools (or SqlTools++) again. It can be run up successfully.
