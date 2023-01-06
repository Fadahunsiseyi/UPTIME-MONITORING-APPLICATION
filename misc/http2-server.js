

const http2 = require('http2')


//Init the server

const server = http2.createServer()


server.on('stream',(stream,headers)=>{
    stream.respond({
        'status': 200,
        'Content-Type': 'text/html'
    })
    stream.end('<html> <body> <p>Hello world</p> </body> </html>')
})

server.listen(6000)