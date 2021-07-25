const http = require('http');
const fs = require('fs');

const hostname = '0.0.0.0'; // запуск сервера на всех интерфейсах
const port = 3000;

const server = http.createServer((req, res) => {
  const sharedValue = fs.readFileSync('./shared/data.txt');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello ' + sharedValue);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
