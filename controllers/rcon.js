const rcon = require("librcon");

function commandpush(command, rconpassword, rconaddress, port) {
  rcon.send(`${command}`, `${rconpassword}`, `${rconaddress}`, port).then((res) => {
      console.log(`[CONSOLE] [RCON] ${res}`);
  }).catch((err) => {
      console.log(`[CONSOLE] [RCON] [ERROR] An error has occured!\n ${err.message}`);
  });
  return;
}

module.exports = {
  commandpush
};
