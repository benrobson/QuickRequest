const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
  let minecraftusername = args[0];
  let user = message.author;

  if (!minecraftusername) {
    let embed = new Discord.RichEmbed()
      .setTitle('How to submit a request?')
      .setColor('#ffae19')
      .setDescription(`To submit a request, use '${process.env.prefix}request [Minecraft Username]'.\nFrom there your request will be reviewed and you will receive a message if you have been accepted or not.\nPlease ensure that you are using your Minecraft Username when you request for access.`)
    message.channel.send(embed);
    return;
  };

  // TODO: Add a check if the Minecraft Username is valid.

  // Send the request to the #requests channel.
  let requestchannel = message.guild.channels.find(c => c.name === `${process.env.requestchannel}`);
  let request = new Discord.RichEmbed()
    .setTitle(`Request [${minecraftusername}]`)
    .setColor('#6666ff')
    .setThumbnail(user.displayAvatarURL)
    .addField('Minecraft Username', `${minecraftusername}`, true)
    .addField('Requesting User', `${user}`, true)
    .addField('Requesting Users ID', `${user.id}`, true)
  requestchannel.send(request).then(async requestembed => {
    await requestembed.react('✅')
    await requestembed.react('❎')
  })

  // Sending a direct message to the user.
  let requestconfirmation = new Discord.RichEmbed()
    .setTitle('Your request has been recieved.')
    .setColor('#FFA500')
    .setDescription(`Thank you ${user.username} for your request. It has successfully been received.\nAn Administrator will review your request.`)
  message.author.send(requestconfirmation);
  return;
};

module.exports.help = {
  name: 'request'
};
