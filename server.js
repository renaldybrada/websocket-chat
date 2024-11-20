const WebSocket = require('ws');

// Create websocket server
const server = new WebSocket.Server({ host: '0.0.0.0', port: 8080 });

// Subsribers pool for all chat rooms
const subscribers = {};

// logging with timestap functions
function logTimestamp(message) {
    const date = new Date()
    console.log(`[${date.toLocaleString()}]`, message)
}

// publish connected user list on specific room
function sendConnectedUserList(room) {
    if (subscribers[room]) {
        const connectedUsers = subscribers[room].map(sub => sub.username)
        const payload = {'connectedUsers': connectedUsers}

        subscribers[room].forEach((subscriber) => {
            if (subscriber.socket.readyState === WebSocket.OPEN) {
                subscriber.socket.send(JSON.stringify({ type: 'user_info', room, payload }));
            }
        });
        logTimestamp(`User info sent to room: ${room}`)
    }
}

// publish user notification when in or out of the room
function userNotifRoom(username, room, status) {
    const payload = {
        username,
        status
    }

    if (subscribers[room]) {
        if (subscribers[room]) {
            subscribers[room].forEach((subscriber) => {
                if (subscriber.socket.readyState === WebSocket.OPEN) {
                    subscriber.socket.send(JSON.stringify({ type: 'in_out_user_info', room, payload }));
                }
            });
            logTimestamp(`${username} ${status} room : ${room}`);
        }
    }
}

server.on('connection', (socket) => {
    logTimestamp('Client connected');

    // listen message from clients
    socket.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            // if message type is subscribe, then register the client on chat room
            // send notification to all user on the room that new user is entering the chat room
            if (data.type === 'subscribe') {
                const room = data.room;
                const username = data.username;
                if (!subscribers[room]) {
                    subscribers[room] = [];
                }
                const client = {
                    'socket': socket,
                    'username': username
                };
                subscribers[room].push(client);
                userNotifRoom(username, room, 'join')
                logTimestamp(`Client ${username} join to room: ${room}`);
            }

            // if message type is publish (regular chat message)
            else if (data.type === 'publish') {
                const room = data.room;
                const payload = data.payload;
                // Send message to all user on that chat room
                if (subscribers[room]) {
                    subscribers[room].forEach((subscriber) => {
                        if (subscriber.socket.readyState === WebSocket.OPEN) {
                            subscriber.socket.send(JSON.stringify({ type: 'chat', room, payload }));
                        }
                    });
                    logTimestamp(`Message sent to room: ${room}`);
                }
            }

            // if message type is user_info, send all user list message to active user on specific room
            else if (data.type === 'user_info') {
                const room = data.room

                sendConnectedUserList(room);
            }
        } catch (err) {
            console.error('Error processing message', err);
        }
    });

    // Delete subscriber when connection is closed from client
    socket.on('close', () => {
        for (const room in subscribers) {
            const disconnectedUser = subscribers[room].filter((sub) => sub.socket === socket);

            subscribers[room] = subscribers[room].filter((sub) => sub.socket !== socket);
            
            if (disconnectedUser.length > 0) {
                logTimestamp(`Client ${disconnectedUser[0].username} disconnected from room ${room}`);
                userNotifRoom(disconnectedUser[0].username, room, 'out')
                sendConnectedUserList(room);
            }
        }
    });
});

logTimestamp('WebSocket server is running on ws://localhost:8080');
