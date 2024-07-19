const responses = {
    "hello": "Hi there! How can I assist you today?",
    
  'hi': 'Hello! What brings you here ?',
    "what hubnex labs do": "At Hubnex Labs,We are a leading IT consultancy with expertise in innovative solutions for modern challenges. visit  hubnex labs .<a href='https://hubnex.in/' target='_blank'>Visit Website</a>",
    "how are you": "I'm just a bot, but I'm here to help you!",
    "need help": "How I can help you today?",
    "bye": "Goodbye! Have a great day!",
    "default": "I'm sorry, I didn't understand that. Want to connect with expert?",
    "expert": "Great! Please wait a moment while we connect you with an expert.",
    'what hubnex labs do':'At Hubnex Labs,We are a leading IT consultancy with expertise in innovative solutions for modern challenges.',
    'what services you provide':' mentorship in ui/ux,data science,Marketing,hr,etc.',
    
    'ui/ux':"Master UIUX with clear and specialized workshop and become an design expert.<a href='https://hubnex.in/' target='_blank'>Visit page</a>",
    'hr':"Master HR skills with clear and specialized workshop and become an human resource expert <a href='https://hubnex.in/' target='_blank'>Visit page</a>",
    'data science':"Master data science with clear and get specialized workshop and become an analytical expert<a href='https://hubnex.in/' target='_blank'>Visit page</a>",
    'marketing':"Master marketing skills with clear and specialized workshop and become an marketing expert.learn more <a href='https://hubnex.in/' target='_blank'>Visit page</a>",
    "no": "Okay, if you change your mind just let me know!"
};

document.getElementById('chatbot-toggle-btn').addEventListener('click', toggleChatbot);
document.getElementById('close-btn').addEventListener('click', toggleChatbot);
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function toggleChatbot() {
    const chatbotPopup = document.getElementById('chatbot-popup');
    chatbotPopup.style.display = chatbotPopup.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('user', userInput);
        respondToUser(userInput.toLowerCase());
        document.getElementById('user-input').value = '';
    }
}

function respondToUser(userInput) {
    const response = responses[userInput] || responses["default"];
    setTimeout(function() {
        appendMessage('bot', response);
    }, 500);
}

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
    if (sender === 'bot' && message === responses["default"]) {
        const buttonYes = document.createElement('button');
        buttonYes.textContent = '✔ Yes';
        buttonYes.onclick = function() {
            appendMessage('bot', responses["expert"]);
        };
        const buttonNo = document.createElement('button');
        buttonNo.textContent = '✖ No';
        buttonNo.onclick = function() {
            appendMessage('bot', responses["no"]);
        };
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(buttonYes);
        buttonContainer.appendChild(buttonNo);
        chatBox.appendChild(buttonContainer);
    }
}
