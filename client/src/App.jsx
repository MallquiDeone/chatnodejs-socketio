import {useState, useEffect} from 'react'
import io from 'socket.io-client'

const socket = io("http://localhost:3000")

function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'Gordarez'
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
  }
  useEffect(() => {
    socket.on('message', receiveMessage)

    return () => {
      socket.off("message", receiveMessage)
    }
  }, [])
  
  const receiveMessage = (message) =>
    setMessages((state) => [... state, message])
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Escribe tu sms' onChange={(e) => setMessage(e.target.value)} />
        <button>Enviar</button>
      </form>
      <ul>
        {
          messages.map((message, i) => (
            <li key={i}>{message.from}:{message.body}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default App