require("dotenv").config();
const http = require("http");
const app = require("./src/app");

app.set('port', process.env.PORT);

const server = http.createServer(app);

server.listen(app.get('port'));