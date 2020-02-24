const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });

function confirmdmpush(mcusername, discordusername, server, message) {
  // Send a direct message to the user.
  let requestconfirmation = new Discord.RichEmbed()
    .setTitle('Your request has been recieved.')
    .setColor('#FFA500')
    .setDescription(`Thank you ${discordusername.username} for your request to join ${server}.\nYour request has been received and a Staff Member will review your request.`)
  discordusername.send(requestconfirmation);
  return;
}

module.exports = {
  confirmdmpush
};
