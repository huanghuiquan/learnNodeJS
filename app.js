var http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.write('<h1>Node.js</h1>');
    res.write('<p>Hello world!</p>');
    res.end();
}).listen(3000);

console.log("http server is listening at port 3000");