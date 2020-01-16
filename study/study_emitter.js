const EventEmitter = require("events");

const eventEmitter = new EventEmitter();


eventEmitter.on('change', ()=> {

  console.log('123');

});

eventEmitter.emit('change');
eventEmitter.emit('change');
eventEmitter.emit('change');