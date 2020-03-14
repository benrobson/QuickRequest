require ('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
require('./util/eventLoader.js')(client);
const fs = require('fs');

//
// Controllers
//
const rcon = require('./controllers/rcon'); // RCON controller
const log = require('log-to-file');

// Reads all commands & boot them in.
fs.readdir('./commands', (err, files) => {
  if (err) return console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    log(`[CONSOLE] Couldn\'t find commands.`);
    return console.log(`[CONSOLE] Couldn\'t find commands.`);
  }

  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(`[CONSOLE] ${files} has been loaded.`);
    log(`${files} has been loaded.`);
    client.commands.set(props.help.name, props);
  })
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = process.env.prefix;
  let messageArray = message.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1);
  let msg = message.content.toLowerCase();

  if (!command.startsWith(prefix)) return;
  let commandfile = client.commands.get(command.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);

  if (msg.includes('!request')) {
    message.delete(5000);
  };
});

client.on("ready", () => {
  console.log('[CONSOLE] Launched QuickRequest.');
  log('Launched QuickRequest.')
  client.user.setActivity(`Use ${process.env.prefix}request`);
});

client.login(process.env.discordapitoken);
