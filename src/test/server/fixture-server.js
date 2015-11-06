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
  function randomCityIndex() {
    return Math.floor(Math.random() * geodata.features.length)
  }
  var cityIndex = randomCityIndex()
  var coordinateIndex = 0

  return function sendCoordinate() {
    function nextCity() {
      cityIndex = randomCityIndex()
      coordinateIndex = 0
    }
    function nextCoordinate() {
      setTimeout(sendCoordinate, 50);
    }
    try {
      var features = geodata.features
      var city = features[cityIndex]
      if(!city.geometry.coordinates) {
        // e.g has several geometry subgroups (Kotka, Kalajoki, Ii, ...)
        console.log('Bad city', city)
        nextCity()
        nextCoordinate()
        return
      }
      var coordinates = city.geometry.coordinates[0]
      if(!coordinates) {
        nextCoordinate()
        return;
      }
      var coordinate = coordinates[coordinateIndex]
      var cityName = city.properties.name
      ws.send(JSON.stringify(
        {
          loc: [coordinate[1], coordinate[0]], // note order
          city: cityName
        }))

      if(coordinateIndex === 0) (
        console.log('City', cityName, coordinates.length)
      )
      coordinateIndex++
      if (coordinateIndex >= coordinates.length) {
        nextCity()
      }
      nextCoordinate()
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
