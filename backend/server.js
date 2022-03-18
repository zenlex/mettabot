const http = require('http');
const fs = require('fs');
const path = require('path');

const app = http.createServer(function (request, response) {
  //request logger
  console.log(`request ${request.method} ${request.url}`);

  let filePath = './build' + request.url;
  if (request.url == '/') {
    filePath = './build/index.html';
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  console.log({extname})
  var mimeTypes = {
      '.html' : 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css'
    }

  const contentType = mimeTypes[extname] || 'application/octet-stream'

  fs.readFile(filePath, function(err, content) {
    if (err) {
      if(err.code == 'ENOENT') {
        fs.readFile('./404.html', function(err, content) {
          response.writeHead(404, { 'Content-Type': 'text/html '});
          response.end(content, 'utf-8')
        })
      }else {
        response.writeHead(500)
        response.end('Sorry, off looking for myself...' + error.code)
      }
    } else {
      response.writeHead(200, {"Content-Type": contentType});
      response.end(content, 'utf-8')
    }
  });
})

const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log('Mettabot server listening on port: ', PORT)

