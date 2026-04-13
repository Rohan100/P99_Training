const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Home Page');
    } else if (url === '/about' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Us Page');
    } else if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <form>
                <input type='text'>
                <br/>
                <input type='text'>
                <br/>
                <button>Submit</button>
            </form>    
        `)
    }
    else {
        // 404 Not Found handler
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('You are lost');
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
