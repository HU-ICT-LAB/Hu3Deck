//development functions:
//for fun
global.thisLine = () => {
  const e = new Error();
  const regex = /\((.*):(\d+):(\d+)\)$/
  const match = regex.exec(e.stack.split("\n")[2]);
  return ":" + match[2];
}

global.echo = (filename, ...objects) => {
  let file = filename.replace(__dirname, "");
  console.log(file + " ", ...objects);
};
//end development functions

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


import expressAdapter from './src/express-callback'; 
import { listSessions, postSession }  from './src/controllers/session/';
import { postScene }  from './src/controllers/scene/';

app.use(express.static(process.cwd() + "/frontend/angular/dist/HU3Deck"));
app.use(express.static(process.cwd() + "/frontend/vr"));
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.get('/session/:id', expressAdapter(listSessions));
app.post('/session/create', expressAdapter(postSession));

//scene
app.post('/scenes/create', expressAdapter(postScene));

app.get('/vr-environment', (req, res) => {
  res.sendFile(__dirname + "/frontend/vr/index.html");
});

app.get('/*', (req, res) => {
  res.sendFile(process.cwd() + "/frontend/angular/dist/HU3Deck/index.html");
});


io.on('connection', (s) => {
  console.log('a user connected');
  
  s.on("change scene", (data) => {
    io.emit('change background', data); 
  });
  
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});