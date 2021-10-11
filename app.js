/** app for groupchat */

import { WebSocketServer } from 'ws';
const wss = new WebSocketServer({ server });
const ChatUser = require('./ChatUser');
//initialize a simple http server

//initialize the WebSocket server instance

wss.on('connection', (ws) => {
  try {
    const user = new ChatUser(
      ws.send.bind(wss), // fn to call to message this user
      12 // name of room for user
    );

    // register handlers for message-received, connection-closed

    ws.on('message', function (data) {
      try {
        user.handleMessage(data);
      } catch (err) {
        console.error(err);
      }
    });

    ws.on('close', function () {
      try {
        user.handleClose();
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
})
module.exports = server;
// //connection is up, let's add a simple simple event
// ws.on('message', (message: string) => {

//   //log the received message and send it back to the client
//   console.log('received: %s', message);
//   ws.send(`Hello, you sent -> ${message}`);
// });

// //send immediatly a feedback to the incoming connection    
// ws.send('Hi there, I am a WebSocket server');
//   });

//start our server

// const path = require("path");

//Serve frontend files
// app.use(express.static(path.join(__dirname, "..", "client", "build"))); 


/** Handle websocket chat */

// allow for app.ws routes for websocket routes





/** Handle a persistent connection to /chat/[roomName]
 *
 * Note that this is only called *once* per client --- not every time
 * a particular websocket chat is sent.
 *
 * `ws` becomes the socket for the client; it is specific to that visitor.
 * The `ws.send` method is how we'll send messages back to that socket.
 */

// app.ws('/room/:roomId', function (ws, req, next) {
//   try {
//     const user = new ChatUser(
//       ws.send.bind(ws), // fn to call to message this user
//       req.params.roomId // name of room for user
//     );

//     // register handlers for message-received, connection-closed

//     ws.on('message', function (data) {
//       try {
//         user.handleMessage(data);
//       } catch (err) {
//         console.error(err);
//       }
//     });

//     ws.on('close', function () {
//       try {
//         user.handleClose();
//       } catch (err) {
//         console.error(err);
//       }
//     });
//   } catch (err) {
//     console.error(err);
//   }
// });


