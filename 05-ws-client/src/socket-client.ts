import { Manager, Socket } from "socket.io-client"


let socket: Socket
export const connectToServer = ( token: string ) => {

  const manager = new Manager('http://localhost:3000', {
    extraHeaders: {
      hola: 'mundo',
      authentication: token
    }
  });


  socket?.removeAllListeners();
  socket = manager.socket('/messages');
  // console.log({ socket })
  addListeners()

}

const addListeners = () => {
  const serverStatusLabel = document.querySelector('#server-status')! as HTMLSpanElement
  const clientsUl = document.querySelector('#clients-ul')! as HTMLUListElement
  const messageForm = document.querySelector('#message-form')! as HTMLFormElement
  const messageInput = document.querySelector('#message-input')! as HTMLInputElement
  const messagesUl = document.querySelector('#messages-ul')! as HTMLUListElement

  socket.on('connect', () => {
    // console.log('Connected to server')
    serverStatusLabel.innerHTML = 'Connected'
  })

  socket.on('disconnect', () => {
    // console.log('Disconnected to server')
    serverStatusLabel.innerHTML = 'Disconnected'
  })

  socket.on('clients-updated', (clients: string[]) => {
    // console.log({clients})
    let clientsHtml = ''
    clients.forEach(client => {
      clientsHtml += `<li>${client}</li>`
    })

    clientsUl.innerHTML = clientsHtml
  })

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if( messageInput.value.trim() === '' ) return

    // console.log({id: 'YO!', message: messageInput.value})
    socket.emit('message-from-client', {id: 'YO!', message: messageInput.value}) 

    messageInput.value = ''
  })

  socket.on('message-from-server', (payload: { fullname: string, message: string }) => {
    const newMessage = `
      <li>
        <strong>${payload.fullname}</strong>: ${payload.message}
      </li>
    `;
    const li = document.createElement('li')
    li.innerHTML = newMessage
    messagesUl.appendChild(li)
  })
}