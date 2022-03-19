const http = require('http');
const fs = require('fs');
const path = require('path');
const getMsg = require('./messagegen');

const app = http.createServer(function (request, response) {
  //request logger
  console.log(`request ${request.method} ${request.url}`);

  //routes
  const {url, method} = request;
  if((url === '/api' || url === '/api/') && method === 'GET'){
    response.writeHead(200, {contentType: 'application/json'})
    const newmsg  = getMsg();
    console.log('server generated message: ', newmsg)
    response.end(JSON.stringify({text:newmsg}))
  } else {
    let filePath = './public' + url;
    if (url == '/') {
      filePath = './public/index.html';
    }

  //mime types
    const extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html' : 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
      }
    const contentType = mimeTypes[extname] || 'application/octet-stream'
  
  //return static file or error
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
  }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT);
console.log('Mettabot server listening on port: ', PORT)

