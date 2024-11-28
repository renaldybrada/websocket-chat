function randomCode() {
    const alphabets = [
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)), // A-Z
        ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))  // a-z
    ];

    const randomAlphabets = Array.from({ length: 8 }, () => {
        const randomIndex = Math.floor(Math.random() * alphabets.length);
        return alphabets[randomIndex];
    });

    return randomAlphabets.join('');
}

function createChatBubble(username, message, is_self) {
    const chatBox = document.getElementById("chat-box");
    let chatBubble = document.createElement('div')
    chatBubble.classList.add('chat-bubble')
    if (is_self) {
        chatBubble.classList.add('chat-bubble--right')
    }

    let chatUsername = document.createElement('div')
    chatUsername.classList.add('chat-user')
    chatUsername.innerText = username
    let chatMessage = document.createElement('div')
    chatMessage.classList.add('chat-msg')
    chatMessage.innerText = message
    let currentTime = new Date()
    let chatTime = document.createElement('div')
    chatTime.classList.add('chat-time')
    chatTime.innerHTML = `${currentTime.getHours()}:${currentTime.getMinutes()}`

    chatBubble.appendChild(chatUsername)
    chatBubble.appendChild(chatMessage)
    chatBubble.appendChild(chatTime)

    chatBox.appendChild(chatBubble)
    chatBox.scrollTop = chatBox.scrollHeight
}

function updateConnectedUsers(usernames) {
    const userListElement = document.getElementById("user-list")
    userListElement.innerHTML = ''

    usernames.forEach((username) => {
        const newUser = document.createElement('span')
        newUser.classList.add('user-item')
        newUser.innerText = username

        userListElement.appendChild(newUser)
    })
}

function createChatBubbleInfo(username, status) {
    const chatBox = document.getElementById("chat-box");
    let chatBubble = document.createElement('div')
    chatBubble.classList.add('chat-bubble')
    chatBubble.classList.add('chat-info')

    let chatMessage = document.createElement('div')
    chatMessage.classList.add('chat-msg')
    if (status == 'join') {
        message = `${username} entered the chat room`;
    } else if (status == 'out') {
        message = `${username} out from this room`;
    }
    chatMessage.innerText = message

    chatBubble.appendChild(chatMessage);

    chatBox.appendChild(chatBubble);
}