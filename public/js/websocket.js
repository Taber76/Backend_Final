//--- SOCKET
const socket = io.connect()

function chatInit( username ) {
  document.querySelector('#userChat').innerHTML = templateContainer()
  socket.emit('online', username)
  socket.on('mensajes', allChat => {
    document.querySelector('#chatContainer').innerHTML = chatMessages( allChat )
    chatMsg.value = ''
  })

  const chatMsg = document.querySelector('#chatUserMessage')
  document.querySelector('#sendChat').addEventListener("click", ev => {
    socket.emit('mensaje', { username: username, body: chatMsg.value })
    chatMsg.value = 'asistente escribiendo ...'
  })

}


function templateContainer() {
  return `
  <div class="container alert alert-primary">
    <button type="button" class="btn btn-primary position-relative">CHAT</button>
    <div class="container mt-3" style="background-color: white; border-radius: 10px;">
      <div class="row" id="chatContainer"></div>
    </div>
    <div class="container mt-3" style="border-radius: 10px;">
      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="chatUserMessage" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Mensaje</label>
      </div>   
    </div>
    <button type="button" class="btn btn-success position-relative mt-3" id="sendChat">Enviar</button>
  </div>
  `
}

function templateSystemChat( msg ) {
  return `
  <div class="col-8" style="color: green; font-weight: 600;">
    Asistente: ${msg}
  </div>
  <div class="col-4"></div>
  `
}

function templateUserChat( msg ) {
  return `
    <div class="col-4"></div>
      <div class="col-8 aling-self-end" style="text-align: end; font-weight: 600;">
        ${msg}
      </div>
    `
}


function chatMessages ( data ) {
  let allChat = ''
  data.forEach( msg => {
    msg.type === 'assistant' 
      ? allChat += templateSystemChat( msg.body )
      : allChat += templateUserChat( msg.body )
  })
  return allChat
}



