import './style.css'
import { connectToServer } from './socket-client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket Client</h2>
    <input id="jwt-token" type="text" placeholder="JWT Token">
    <button id="btn-connect">Connect</button>

    <br/>
    <span id="server-status">Server Status: </span>
  </div>
  <ul id="clients-ul"></ul>

  <form id="message-form">
    <input type="text" placeholder="message" id="message-input">
  </form>

  <h3>Messages</h3>
  <ul id="messages-ul"></ul>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!
const btnConnect = document.querySelector<HTMLButtonElement>('#btn-connect')!

btnConnect.addEventListener('click', () => {

  if( jwtToken.value.trim() === '' ) return alert('Please provide a JWT Token')
  connectToServer(jwtToken.value)
})