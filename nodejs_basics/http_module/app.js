const http = require('http');
PORT = 3000

console.log("hello")
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html', });

  res.end('<h1>Hello, World!</h1>');
});


server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});