var express = require('express')
var app = express()
var expressWs = require('express-ws')(app);
var _ = require('lodash')
var geodata = parsedJSON = require('../../../data/kuntarajat-ok.json');
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.send('Hello World')
})
app.listen(3100)

function sender(ws) {
  console.log('sender')
  var cityIndex = 0
  var coordinateIndex = 0

  return function sendCoordinate() {
    try {
      var features = geodata.features
      var city = features[cityIndex]
      var coordinates = city.geometry.coordinates[0]
      var coordinate = coordinates[coordinateIndex]
      var cityName = city.properties.name
      ws.send(JSON.stringify(
        {
          loc: coordinate,
          city: cityName
        }))

      if(coordinateIndex === 0) (
        console.log('City', cityName, coordinates.length)
      )
      coordinateIndex++
      if (coordinateIndex >= coordinates.length) {
        cityIndex++
        coordinateIndex = 0
      }
      setTimeout(sendCoordinate, 200);
    } catch(e) {
      console.log('error', e)
    }
  }
}
app.ws('/ws', function(ws, req) {
  ws.send(JSON.stringify({msg: 'Hello'}))
  var sendFn = sender(ws)
  sendFn()
  ws.on('message', function(msg) {
    console.log('ws req', msg)

    ws.send(msg);
  });
});

console.log('Server up and running http://localhost:3100/')
