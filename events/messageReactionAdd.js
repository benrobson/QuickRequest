const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
const reqacceptdm = require('../functions/requestacceptdm');
const assignrole = require('../functions/assignrole');
const rcon = require('../controllers/rcon');

module.exports = async (reaction, user) => {
  let channel = reaction.message.channel.name;
  let message = reaction.message, emoji = reaction.emoji;
  let authorizer = user.username;

  if (user.bot == true) return; // This stops the bot from picking up it's own reactions.
  if (!channel) return; // This allows the bot to only detect changes in the #requests channel

  let mcusername = reaction.message.embeds[0].fields[0].value; // shadowolfyt
  let server = reaction.message.embeds[0].fields[1].value; // servers
  let discordid = reaction.message.embeds[0].fields[2].value; // discord id
  let requesteduser = message.guild.fetchMember(discordid);

  console.log(reaction.message.embeds[0].fields[2].value);

  if (emoji.name == '✅') {
    if (server == "rlcraft") {
      // RLCraft
      // reqacceptdm.push(requesteduser, process.env.rlcraftaddress);
      rcon.commandpush(`whitelist add ${mcusername}`, process.env.rlcraftrconpassword, process.env.rconaddress, process.env.rlcraftrconport);
      // assignrole.push(requesteduser, `${process.env.rlcraftrole}`, message);
      return console.log(`[CONSOLE] A request has been accepted by ${authorizer} for ${mcusername} to gain access to ${server}.`);
      message.delete();
    } else if (server == "revelation") {
      // Revelation
      // reqacceptdm.push(requesteduser, process.env.revelationaddress);
      rcon.commandpush(`whitelist add ${mcusername}`, process.env.revelationrconpassword, process.env.rconaddress, process.env.revelationrconport);
      message.delete(2000);
      return console.log(`[CONSOLE] A request has been accepted by ${authorizer} for ${mcusername} to gain access to ${server}.`);
    }

    // message.delete();
  } else if (emoji.name == '❎') {
    // Log in console that the users request was denied.
    console.log(`[CONSOLE] ${mcusername}\'s request has been denied.`);
    return;
  };
};
