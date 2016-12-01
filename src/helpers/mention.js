'use strict';

/**
 *
 * @param message
 * @param client
 * @returns {boolean}
 */
export function isMentionToBot(message, client) {
  return message.mentions.users.exists('id', client.user.id);
}

/**
 *
 * @param content
 * @returns {string}
 */
export function removeMentionsFromContent(content) {
  const contents = content.split(/[\s!?]/);
  return contents
    .filter(c => !/^<@\d+>$/ig.test(c))
    .filter(c => c !== '')
    .join(' ');
}
