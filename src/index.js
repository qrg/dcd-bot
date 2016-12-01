'use strict';

import {Client} from 'discord.js';

import showHelp from './help';
import ready from './plugins/ready';
import ping from './plugins/ping';
import roleLabeling from './plugins/role-labeling';
import {
  isMentionToBot,
  removeMentionsFromContent
} from './helpers/mention';

const token = process.env.DISCORD_TOKEN; // https://discordapp.com/developers/applications/me
const bot = new Client();
const plugins = [
  ready,
  ping,
  roleLabeling
];

bot.on('message', (message) => {
  if (!isMentionToBot(message, bot)) {
    return;
  }

  const content = removeMentionsFromContent(message.content);
  if (!/^help$/i.test(content)) {
    return;
  }

  showHelp(message, plugins);
});

plugins.forEach(plugin => {
  bot.on(plugin.event, (...args) => plugin.callback(bot, ...args));
});

// log our bot in
bot.login(token);
