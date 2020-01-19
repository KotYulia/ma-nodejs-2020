const http = require('http');
const handler = require('./handler');

http.createServer(handler).listen(3000, () => {
  console.log('Server is running!');
});
