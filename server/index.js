let server = require('diet');
let dietStatic = require('diet-static');
let SocketIO = require('socket.io');

let I = require('./src/I2HID');

let app = server();

app.listen(5050);
let io = SocketIO(app.server)

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('sine test', () => {
    I.sineTestMouse();
  });

  socket.on('string', (str) => {
    I.typeString(str);
  });

  socket.on('key', (str) => {
    I.key(str);
  });
});

let sfs = dietStatic({path: app.path+'/../client'});

app.footer(sfs);

app.get('/', ($) => {
  $.redirect('/index.html')
});
