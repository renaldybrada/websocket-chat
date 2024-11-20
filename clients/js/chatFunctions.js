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

function createChatBubble(username, message) {
    const chatBox = document.getElementById("chat-box");
    let chatBubble = document.createElement('div')
    chatBubble.classList.add('chat-bubble')
    let chatUsername = document.createElement('div')
    chatUsername.classList.add('chat-user')
    chatUsername.innerText = username
    let chatMessage = document.createElement('div')
    chatMessage.classList.add('chat-msg')
    chatMessage.innerText = message

    chatBubble.appendChild(chatUsername)
    chatBubble.appendChild(chatMessage)

    chatBox.appendChild(chatBubble)
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