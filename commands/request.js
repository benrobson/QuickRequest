const Discord = require('discord.js');
const reqsend = require('../functions/requestsend');
const reqdmsend = require('../functions/requestconfirmdm');

module.exports.run = async (client, message, args) => {
  let requestchannel = message.guild.channels.cache.find(c => c.name === `${process.env.requestchannel}`);
  let mcusername = args[1];
  let server = args[0].toLowerCase();
  let discordusername = message.author;

  // If user did not identify a Server, list the avaliable ones.
  if (!server) {
    let embed = new Discord.MessageEmbed()
      .setTitle('How to submit a request?')
      .setColor('#ffae19')
      .setDescription(`To submit a request, use '${process.env.prefix}request [server] [username]'.\nFrom there your request will be reviewed and you will receive a message if you have been accepted or not.\nPlease ensure that you are using your Minecraft Username when you request for access.\n\n**Avaliable Servers**`)
      .addField("RLCraft", "**!request rlcraft [Minecraft Username]** RLCraft is a Minecraft Modpack consisting of 120 separate mods that has been bundled and tweaked by Shivaxi to create a challenging Minecraft fantasy world. The modpack is currently runs on Minecraft version 1.12.")
      .addField("Revelation", "**!request revelation [Minecraft Username]** The Nether Update is an upcoming major update themed around revamping the Nether. This update was announced at MINECON Live 2019. The update is to be released on Java Edition as version 1.16.")
    message.channel.send(embed);
    return;
  };

  // Checks to see if the user entered a username.
  if (!mcusername) {
    let embed = new Discord.MessageEmbed()
      .setTitle('Error')
      .setColor('#cc0000')
      .setDescription(`A Minecraft Username is required to submit a request.`)
    message.channel.send(embed);
    return;
  } else {
    // Run through and check if the user has requested any of our services.
    if (server == "rlcraft") {
      // RLCraft
      reqsend.push(mcusername, discordusername, server, requestchannel);
      reqdmsend.push(mcusername, discordusername, server);
    } else if (server == "revelation") {
      // Revelation
      reqsend.push(mcusername, discordusername, server, requestchannel);
      reqdmsend.push(mcusername, discordusername, server);
    } else {
      // Chuck an error because none of the services were ours.
      let embed = new Discord.MessageEmbed()
        .setTitle('Error')
        .setColor('#cc0000')
        .setDescription(`No valid platform was selected.`)
      message.channel.send(embed);
    }
  };
};

module.exports.help = {
  name: 'request'
};
