const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });

async function push(requesteduser, ipaddress) {
  let requestaccept = new Discord.RichEmbed()
    .setTitle('Request Accepted')
    .setColor('#329932')
    .setDescription(`Congratulations! Your request has been accepted!\nYou should be whitelisted on our Server now. The IP to login is **${ipaddress}**`)
  requesteduser.send(requestaccept);
  return;
}

module.exports = {
  push
};
