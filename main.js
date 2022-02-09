const serialPort = require('serialport');
const twilio = require('twilio');

let arduinoResponse = 0;

const windowPath = 'COM3';
const macPath = '/dev/cu.usbmodem141101';
const raspPath = '/dev/ttyACM0';

//Twilio set-up
var accountSid = '';
var authToken = ''; 
var client = new twilio(accountSid, authToken);

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

var currentDoor = 0;

var previousDoor = 68;

//When parser activates, use callback function
parser.on('data', (data) => {
  currentDoor = Number(data.substring(0,data.indexOf('i')));
  if(currentDoor - previousDoor >30){
    client.messages.create({
      body: 'Door has opened',
      to: '',  // Text this number
      from: '+14798885977' // From a valid Twilio number
    })
    .then((message) => 
    {
      console.log(message.sid)
    });
  }
  previousDoor = currentDoor;
  //console.log(Number(data.substring(0,data.indexOf('i'))))
  console.log(data);
});


