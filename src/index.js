import app from './app.js'
import http from 'http'
import {Server as SocketServer} from 'socket.io'

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', socket => {
    console.log('Cliente')
    socket.on('message', (body) =>{
        console.log(body)
        socket.broadcast.emit('message', {
            body,
            from: socket.id.slice(2)
        })
    })
})

server.listen(PORT)
console.log(`SERVER IS RUNNING ON POR ${PORT}`)