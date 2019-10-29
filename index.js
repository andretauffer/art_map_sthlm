if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  require("dotenv").config();
}
require("./config");
const http = require("http");

const app = require("./server/app");

const server = http.createServer(app);

server.listen(global.gConfig.serverPort, () =>
  console.debug(`Server listening on port: ${global.gConfig.serverPort}`)
);

module.exports = server;
