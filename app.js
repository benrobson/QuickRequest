require ('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });
client.commands = new Discord.Collection();
require('./util/eventLoader.js')(client);
const fs = require('fs');

// Reads all commands & boot them in.
fs.readdir('./commands', (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === 'js')
  if (jsfile.length <= 0) {
    console.log(`[CONSOLE] Couldn\'t find commands.`);
    return
  }

  jsfile.forEach((files, i) => {
    let props = require(`./commands/${files}`);
    console.log(`[CONSOLE] ${files} has been loaded.`);
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

  if (!command.startsWith(prefix)) return;
  let commandfile = client.commands.get(command.slice(prefix.length));
  if (commandfile) commandfile.run(client, message, args);
});

client.on("ready", () => {
  console.log('[CONSOLE] Launched QuickRequest.');
  client.user.setActivity(`Use ${process.env.prefix}request`);
  setActivity(); setInterval(setActivity, 60000);

  function setActivity() {
    // Sets Activity in a rotation
    const Gameinfo = [`Use ${process.env.prefix}request`, 'Created by benrobson8', 'https://github.com/benrobson8'];
    var info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)];

    client.user.setActivity(info);
    console.log(`[CONSOLE] Activity set to (${info})`);
  }
});

client.login(process.env.discordapitoken);
