# dcd-bot

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

A minimal bot for discord.

## Features

* `@mentionToBot help`
  * Show help list
* `@mentionToBot ping`
  * pong
* `@mentionToBot assign ${ROLE_NAME}`
  * Assign you specified role.
* `@mentionToBot unassign ${ROLE_NAME}`
  * Unassign you specified role.

## Installation

1. Create bot account
  * [Creating a discord bot & getting a token · reactiflux/discord-irc Wiki](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)
  * [Step 1: Creating your App and Bot account](https://eslachance.gitbooks.io/discord-js-bot-guide/content/getting-started/the-long-version.html)
2. Click 'Deploy to Heroku' button

## Trouble shooting

###  Why does my bot die soon on heroku?

Try below

```console
heroku scale web=0   
heroku scale worker=1
```
