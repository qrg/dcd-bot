'use strict';

export default function showHelp(message, plugins) {
  const helps = plugins
    .map(p => p.help)
    .reduce((prev, h) => [...prev, ...h], [])
    .filter(h => h);

  helps.unshift({
    example: '@mentionToBot help',
    description: 'Show help list'
  });

  const answers = helps.map(h => {
    return `\`${h.example}\`\n${h.description}\n`
  }).join('\n');

  message.reply(`\n${answers}`);
}
