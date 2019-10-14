const reqEvent = (event) => require(`../events/${event}`)

module.exports = (client) => {
  client.on('guildCreate', reqEvent('guildCreate'));
  client.on('messageReactionAdd', reqEvent('messageReactionAdd'));
};
