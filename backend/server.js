const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (request, response) {
  console.log('request', request.url)
})