const socket = io();
let name;
let textarea = document.querySelector('#textarea')
let messagearea = document.querySelector('.message_area')

do{
   name = prompt('Please enter name')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(msg){
    let mesg ={
        user: name,
        message:msg.trim()
    }

    //append the msg
    appendMessage(mesg,'outgoing')
    textarea.value='';
    scrollToBottom()

    //send to server
    socket.emit('message',mesg) 
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className,'message')

    let markup = 
    `<h4>${msg.user}</h4>
    <p>${msg.message}</p>`
    
    mainDiv.innerHTML = markup;
    messagearea.appendChild(mainDiv);
}
//recieve msg 

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrollToBottom()
})

function scrollToBottom(){
    messagearea.scrollTop = messagearea.scrollHeight
}

