const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
MQTTPort = 1884;

//Vars 
var error = new Error('Please check your credential');

server.listen(MQTTPort, function () {
    console.log('MQTT server started and ', MQTTPort)
  });

// authentication
aedes.authenticate = (client, username, password, callback) => {
password = Buffer.from(password, 'base64').toString();
    if (username === 'warcyber' && password === 'mqtt123456') {
        return callback(null, true);
    }
    console.log('Authentication failed.')
        return callback(error, false)
}

// client connects to the broker
aedes.on('client', function (client) {
  console.log(`CLIENT CONNECTED : MQTT Client ${(client ? client.id : client)} connected to aedes broker ${aedes.id}`)
})
//when a client disconnects from the broker
aedes.on('clientDisconnect', function (client) {
  console.log(`CLIENT DISCONNECTED : MQTT Client ${(client ? client.id : client)} disconnected from the aedes broker ${aedes.id}`)
})
//when a client subscribes to a message topic
aedes.on('subscribe', function (subscriptions, client) {
  console.log(`TOPIC SUBSCRIBED : MQTT Client ${(client ? client.id : client)} subscribed to topic: ${subscriptions.map(s => s.topic).join(',')} on aedes broker ${aedes.id}`)
})
//when a client unsubscribes from a message topic
aedes.on('unsubscribe', function (subscriptions, client) {
  console.log(`TOPIC UNSUBSCRIBED : MQTT Client ${(client ? client.id : client)} unsubscribed to topic: ${subscriptions.join(',')} from aedes broker ${aedes.id}`)
})
//when a client publishes a message packet on the topic
aedes.on('publish', function (packet, client) {if (client) {
  console.log(`MESSAGE PUBLISHED : MQTT Client ${(client ? client.id : 'AEDES BROKER_' + aedes.id)} has published message "${packet.payload}" on ${packet.topic} to aedes broker ${aedes.id}`)}
})