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


//multer 
import storage from './src/multer-storage';
const multer = require('multer');
const upload = multer({ storage: storage(multer) });


require('dotenv').config();


import expressAdapter from './src/express-callback';
import socketAdapter from './src/socket-callback';

//socket controllers
import { listPropById } from './src/socket-controllers/prop';

//controllers
import { listSceneProps, postPropBackground, listNotActiveProps, postSceneProps } from './src/controllers/prop';
import { listSessions, postSession, listActiveSession, putSession }  from './src/controllers/session';
import { postScene, listAllScenes } from './src/controllers/scene';
import { listAllUsers, postUser } from './src/controllers/user';
import { listHeartbeat, postHeartbeat } from './src/controllers/heartbeat';



app.use(express.static(`${process.cwd()}/frontend/angular/dist/HU3Deck`));
app.use(express.static(`${process.cwd()}/frontend/vr`));
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.get('/sessions/:id', expressAdapter(listSessions));
app.get('/session/active', expressAdapter(listActiveSession));
app.post('/sessions/create', expressAdapter(postSession));
app.post('/session/update', expressAdapter(putSession));

//scene
app.get('/scenes', expressAdapter(listAllScenes));
app.post('/scenes/create', expressAdapter(postScene));
app.get('/scene/:id/props', expressAdapter(listSceneProps));
app.post('/scene/:id/assignprops', expressAdapter(postSceneProps));

//user
app.get('/users', expressAdapter(listAllUsers));
app.post('/users/create', expressAdapter(postUser));

//heartbeat
app.get('/heartbeat/:id', expressAdapter(listHeartbeat));
app.post('/heartbeat/create', expressAdapter(postHeartbeat));

//prop
//multer
const backgroundPropFileFields = upload.fields([
  { name: 'backgroundFile', maxCount: 1 },
  { name: 'audioFile', maxCount: 1 }
]);

app.post('/prop/createBackground', backgroundPropFileFields, expressAdapter(postPropBackground));

app.get('/scene/:id/props/notactive', expressAdapter(listNotActiveProps));



app.get('/vr-environment', (req, res) => {
  res.sendFile(`${__dirname}/frontend/vr/index.html`);
});

app.get('/*', (req, res) => {
  res.sendFile(`${process.cwd()}/frontend/angular/dist/HU3Deck/index.html`);
});


io.on('connection', s => {
  console.log('a user connected');

  s.on("reload", data => {
    io.emit("reload", data);
  });
  
  s.on("set volume", socketAdapter(io, "change volume", async data => data))

  s.on("show prop", socketAdapter(io, "create prop", listPropById ));

  s.on("hide prop", socketAdapter(io, "remove prop", async data => data ));

  s.on("reset scene", socketAdapter(io, "remake scene", async data => data));
  
});


http.listen(3000, () => {
  console.log(`listening on *:${process.env.PORT}`);
});