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
  
  s.on("change scene", (data) => {
    console.log(data);
    //get data from database

    //als test doe ik dit nu even, heeeeel sloppy
    if(data['scene'] == "Scene 1") {
      data['background_image'] = "first.jpg";
    } else if(data['scene'] == "Scene 2") {
      data['background_image'] = "second.jpg";
    } else if(data['scene'] == "Scene 2") {
      data['background_image'] = "second.jpg";
    } else if(data['scene'] == "Scene 3") {
      data['background_image'] = "third.jpg";
    } else if(data['scene'] == "Scene 4") {
      data['background_image'] = "fourth.jpg";
    } else if(data['scene'] == "Scene 5") {
      data['background_image'] = "fifth.jpg";
    } else {
      data['background_image'] = "first.jpg";
    }

    io.emit('change background', data); 
  });
  
});


http.listen(3000, () => {
  console.log('listening on *:3000');
});