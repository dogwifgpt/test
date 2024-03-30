document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.querySelectorAll('.questionBtn').forEach(button => {
    button.addEventListener('click', function() {
        const messageText = this.textContent; // Get the button text
        displayMessage(messageText, 'user');
        // Generate a custom response or a "woof" based on the button text
        if (!generateCustomResponse(messageText)) {
            simulateTyping().then(() => {
                const botResponse = generateWoof(); // Fallback to generating "woof" if no custom response is matched
                typeMessage(botResponse, 'bot');
            });
        }
    });
});

function sendMessage() {
    const input = document.getElementById('userInput');
    if (input.value.trim() === '') return;

    displayMessage(input.value, 'user');
    input.value = '';

    // Here we check if the input matches a custom response before falling back to "woof"
    if (!generateCustomResponse(input.value)) {
        simulateTyping().then(() => {
            const botResponse = generateWoof();
            typeMessage(botResponse, 'bot');
        });
    }
}

function displayMessage(text, sender) {
    const chatWindow = document.getElementById('chatWindow');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);

    if (sender === 'bot') {
        const img = document.createElement('img');
        img.src = 'https://cdn.discordapp.com/attachments/895233277114351627/1223509502662414429/GPT_3.png?ex=661a1d05&is=6607a805&hm=1c81552d1ff58ee368079d2eb8bfec04b5740143ac182da5d45255d7c8b19d3b&'; // Ensure this path points to your bot's profile image
        img.classList.add('profile-pic');
        msgDiv.appendChild(img);

        const textDiv = document.createElement('div');
        textDiv.classList.add('message-content');
        msgDiv.appendChild(textDiv);
    } else {
        msgDiv.textContent = text;
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    return msgDiv; // Return the message div for further manipulation
}

function generateWoof() {
    if (Math.random() < 0.05) {
        return 'woof '.repeat(50).trim();
    }
    const woofCount = Math.floor(Math.random() * 20) + 1;
    return 'woof '.repeat(woofCount).trim();
}

function typeMessage(message, sender) {
    const msgDiv = displayMessage('', sender); // Create an empty message container
    const textDiv = sender === 'bot' ? msgDiv.querySelector('.message-content') : msgDiv;
    let i = 0;
    function typing() {
        if (i < message.length) {
            textDiv.textContent += message.charAt(i);
            i++;
            setTimeout(typing, Math.random() * 20 + 15);
        }
    }
    typing();
}

function simulateTyping() {
    return new Promise(resolve => {
        setTimeout(resolve, 500); // Simulates a brief pause before typing starts
    });
}

function generateCustomResponse(input) {
    const response = {
        'how can I join the presale?': "woof! you can join by sending at least 1 SOL to this wallet address: (FSujfGrYrdmNZUEjE74K9P7thvUG9ogYCLXDJTxqgXjP) you will receive bags of $WIFGPT after the presale on the same wallet you sent SOL from",
        'buy now': "$WIFGPT will launch soon. watch out for that release date on our socials",
        'what can you do?': "woof.",
        'give me a fun fact': "woof moon"
    }[input];

    if (response) {
        simulateTyping().then(() => {
            typeMessage(response, 'bot');
        });
        return true; // Indicate that a custom response was generated and handled
    }
    return false; // Indicate no custom response was found for the input
}
