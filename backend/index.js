const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type':'application/json'});
  response.end(JSON.stringify({message: "Hello World"}))
})

const PORT = 3001;
app.listen(PORT);

