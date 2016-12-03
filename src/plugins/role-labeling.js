'use strict';

import {isMentionToBot, removeMentionsFromContent} from '../helpers/mention';

// https://discord.js.org/#/docs/main/master/typedef/PermissionResolvable
const UNAVAILABLE_PERMISSIONS = [
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "MANAGE_MESSAGES",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES_OR_PERMISSIONS"
];

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

const listRoles = (roles) => {
  return roles
    .filter(role => {
      return role.name !== '@everyone' && !UNAVAILABLE_PERMISSIONS.some(p => role.hasPermission(p));
    })
    .map(role => role.name);
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
    },
    {
      example: '@mentionToBot list roles',
      description: 'List available roles.'
    }
  ],
  callback: (client, message) => {
    if (!isMentionToBot(message, client)) {
      return;
    }

    const content = removeMentionsFromContent(message.content);
    const contents = content.split(' ');
    const roleName = contents.splice(1).join(' ');
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

      return;
    }

    if (/^list roles/i.test(content)) {
      const roleNames = listRoles(guild.roles)
        .sort()
        .map((name, i) => `${i}. \`${name}\``);

      message.channel.sendMessage(`\n\n**Available roles**\n\n${roleNames.join('\n')}`);
    }
  }
};

export default roleLabeling;
