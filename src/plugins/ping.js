'use strict';

import {isMentionToBot, removeMentionsFromContent} from '../helpers/mention';

const ping = {
  event: 'message',
  help: [
    {
      example: '@mentionToBot ping',
      description: 'pong'
    }
  ],
  callback: (client, message) => {
    if (!isMentionToBot(message, client)) {
      return;
    }

    const content = removeMentionsFromContent(message.content);

    if (!/^ping$/ig.test(content)) {
      return;
    }

    message.reply('udon');
  }
};

export default ping;
