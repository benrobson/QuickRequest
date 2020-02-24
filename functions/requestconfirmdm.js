const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });

function push(mcusername, discordusername, server) {
  let requestdm = new Discord.RichEmbed()
    .setTitle("Your request has been recieved.")
    .setColor('#ffb732')
    .setDescription(`Thank you ${discordusername} for your request to join the ${server} server.\nYour request has been received and a Staff Member will review your request.`)
  discordusername.send(requestdm);
  return;
}

module.exports = {
  push
};
