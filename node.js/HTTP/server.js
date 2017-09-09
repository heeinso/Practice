const http = require('http');

http.createServer((req, res) => {
    console.log(123);

    res.end('Response ends');
}).listen(5555);

console.log("HTTP server running in 5555");