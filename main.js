const fs = require('fs')
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static(process.cwd()+"/public/angular/dist/HU3Deck"));


app.get('/vr-environment', (req, res) => {
  res.sendFile(__dirname + "/public/vr/index.html");
});


app.get('/assets/:file', (req, res, next) => {
  req.params.file = escape(req.params.file);

  let path = __dirname + "/public/vr/assets/" + req.params.file;
  if(!fs.existsSync(path)) {
    return res.sendStatus(404);
  }

  next();
}, (req, res) => {
  res.sendFile(__dirname + '/public/vr/assets/' + req.params.file);
});



app.get('/*', (req, res) => {
  res.sendFile(process.cwd()+"/public/angular/dist/HU3Deck/index.html");
});


io.on('connection', (s) => {
  console.log('a user connected');
  
  s.on("change background", (data) => {
    console.log(data);
    s.broadcast.emit('change background', data); 
  });
  
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});