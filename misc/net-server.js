


const net = require('net');
const server = net.createServer((connection)=>{
    const outboundMessage = 'pong'
    connection.write(outboundMessage)
    connection.on('data',(inboundMessage)=>{
        const msgStr = inboundMessage.toString()
        console.log('I wrote',outboundMessage,'and they said', msgStr)
    })
})

server.listen(6000)