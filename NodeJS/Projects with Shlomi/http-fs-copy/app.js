const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const data = fs.createReadStream(__dirname + "/home.html");
    data.pipe(res);
  }
  if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const data = fs.createReadStream(__dirname + "/about.html");
    data.pipe(res);
  }
});

server.listen(3001, () => {
  console.log("connected to server at port 3001");
});
