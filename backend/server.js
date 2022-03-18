const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer(function (request, response) {
  fs.readFile(__dirname + req.url, function(err, data) {
    if (err) {
      response.writeHead(404);
      response.end(JSON.stringify(err))
    }
    response.writeHead(200);
    response.end(data)
  });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT);

