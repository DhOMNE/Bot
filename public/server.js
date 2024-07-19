const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));


const connectToHelpDesk = (socket) => {
  socket.emit('bot message', 'You are now connected to a help desk representative.');
};


let chatbotState = {};


const questions = [
  'What is your name?',
  'How can I assist you today?',
  'Do you need to connect with a help desk representative? (yes/no)'
];

io.on('connection', (socket) => {
  console.log('New client connected');
  
  
  socket.emit('bot message', questions[0]);

  socket.on('user message', (msg) => {
    const userId = socket.id;

    if (!chatbotState[userId]) {
      chatbotState[userId] = { currentQuestion: 0, responses: [] };
    }

    const userState = chatbotState[userId];

    
    userState.responses.push(msg);
    userState.currentQuestion++;

    
    if (userState.currentQuestion === 3 && msg.toLowerCase() === 'yes') {
      return connectToHelpDesk(socket);
    }

    if (userState.currentQuestion >= questions.length) {
      socket.emit('bot message', 'Thank you for your responses. If you need further assistance, please let us know.');
    } else {
      socket.emit('bot message', questions[userState.currentQuestion]);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Chatbot server running at http://localhost:${port}`);
});
