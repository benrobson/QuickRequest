const Discord = require('discord.js');
const log = require('node-file-logger');

module.exports = async guild => {
  let mainchannel = guild.channels.find(c => c.name === 'general');
  if (!mainchannel) return;

  let embed = new Discord.RichEmbed()
    .setTitle('QuickRequest')
    .setColor('#7F99B1')
    .setDescription(`Thank you for inviting QuickRequest to your guild.\nThis bot was developed quickly [in about 24 hours] for the use of simply requesting for access to Servers.\nUse ${process.env.prefix}request.`)
    .setThumbnail('https://pbs.twimg.com/profile_images/1159403721555501056/huIADqDi_400x400.jpg')
  mainchannel.send(embed)

  console.log(`[CONSOLE] ${guild.name} has added QuickRequest.`);
  log.Info(`${guild.name} has added QuickRequest.`)
};
