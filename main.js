const serialPort = require('serialport');


let arduinoResponse = 0;

const windowPath = 'COM4';
const macPath = '/dev/cu.usbmodem14101'

//Creating port
const myPort = new serialPort(macPath, {
  baudRate: 9600,
});
//Creating parser
const parser = new serialPort.parsers.Readline();
myPort.pipe(parser); //Adding parser to port

//When myPort is on, call function
myPort.on('open', () => {
    console.log('Communication is on!');
});

//When parser activates, use callback function
parser.on('data', (data) => {
  console.log(data);
});


