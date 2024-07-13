import app from './app.js'
import http from 'http'
import {Server as SocketServer} from 'socket.io'

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
const io = new SocketServer(server)

server.listen(PORT)
console.log(`SERVER IS RUNNING ON POR ${PORT}`)