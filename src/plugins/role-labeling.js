'use strict';

import {isMentionToBot, removeMentionsFromContent} from '../helpers/mention';

const assignRole = (roleName, authorId, guild) => {
  return new Promise((done, reject) => {
    const member = guild.members.find('id', authorId);
    const role = guild.roles.find('name', roleName);

    if (!role) {
      reject('Sorry, there is no such role.');
    }

    member.addRole(role)
      .then(done)
      .catch(reject);
  });
};

const unassignRole = (roleName, authorId, guild) => {
  return new Promise((done, reject) => {
    const member = guild.members.find('id', authorId);
    const role = guild.roles.find('name', roleName);

    if (!role) {
      reject('Sorry, there is no such role.');
    }

    member.removeRole(role)
      .then(done)
      .catch(reject);
  });
};

const roleLabeling = {
  event: 'message',
  help: [
    {
      example: '@mentionToBot assign ${ROLE_NAME}',
      description: 'Assign you specified role.'
    },
    {
      example: '@mentionToBot unassign ${ROLE_NAME}',
      description: 'Unassign you specified role.'
    }
  ],
  callback: (client, message) => {
    if (!isMentionToBot(message, client)) {
      return;
    }

    const content = removeMentionsFromContent(message.content);
    const contents = content.split(' ');
    const roleName = contents.splice(1).join(' ');

    if (!/^(un)*assign/i.test(content)) {
      return;
    }

    const authorId = message.author.id;
    const guild = message.guild;

    if (/^assign/i.test(content)) {
      assignRole(roleName, authorId, guild)
        .then(() => {
          message.reply(`You now have the "${roleName}" role!`)
        })
        .catch((err) => {
          message.reply(err);
        });

      return;
    }

    if (/^unassign/i.test(content)) {
      unassignRole(roleName, authorId, guild)
        .then(() => {
          message.reply(`You now removed the "${roleName}" role!`)
        })
        .catch((err) => {
          message.reply(err);
        });
    }
  }
};

export default roleLabeling;
