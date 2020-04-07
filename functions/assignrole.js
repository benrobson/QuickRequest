const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });

function push(requesteduser, serverrole, message) {
  // Add a role to the user when their request is accepted.
  let role = message.guild.roles.cache.find(role => role.name === `${serverrole}`);
  requesteduser.roles.add(role.id);
  return;
}

module.exports = {
  push
};
