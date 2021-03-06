const rcon = require("librcon");
const log = require('node-file-logger');

function commandpush(command, rconpassword, rconaddress, port) {
  rcon.send(`${command}`, `${rconpassword}`, `${rconaddress}`, port).then((res) => {
      console.log(`[CONSOLE] [RCON] ${res}`);
      log.Info(`[RCON] ${res}`);
  }).catch((err) => {
      console.log(`[CONSOLE] [RCON] [ERROR] An error has occured!\n ${err.message}`);
      log.Error(`[RCON] An error has occured!\n ${err.message}`);
  });
  return;
}

module.exports = {
  commandpush
};
