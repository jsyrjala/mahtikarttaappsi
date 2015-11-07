class WebSocketServiceSingleton {

  registerMap(map) {
    this.map = map
  }
  unregisterMap() {
    this.map = undefined
  }

  updateMarker(map, event) {
    if(!event.loc) {
      return
    }
    var coordinate = L.latLng(event.loc, event.city)
    if(this.marker) {
      this.marker.setLatLng(coordinate)
      this.marker.update()
    } else {
      this.marker = L.marker(coordinate)
      this.marker.addTo(map)
    }
  }
  palette = [
    'blue', 'red', 'green', 'violet', 'black', 'white', 'purple',
  ]

  updatePolyline(map, event) {
    this.updateMarker(event)
    if(this.polylines[event.city]) {
      const polyline = this.polylines[event.city]
      polyline.spliceLatLngs(polyline.getLatLngs(), 0, event.loc)
    } else {
      const color = this.palette[_.random(this.palette.length)]
      const polyline = L.polyline([event.loc], {color: color})
      this.polylines[event.city] = polyline
      polyline.city = event.city
      polyline.addTo(map)
    }
  }
  updateMap(msg) {
    var map = this.map
    if(map) {
      this.updateMarker(map, msg)
      this.updatePolyline(map, msg)
    }
  }
  startWebSocket() {
    try {
      this.ws = new WebSocket('ws://localhost:3100/ws')
      this.ws.onmessage = (e) => {
        var msg = JSON.parse(e.data)
        if(!msg.loc) {
          return
        }
        // the react way
        //this.actions.addCoordinate(msg)
        // the other way
        //this.updateMarker(msg)
        this.updateMap()
      }
    } catch(e) {
      console.log('websocket', e)
    }
  }
  stopWebSocket() {
    if(this.ws) {
      this.ws.close()
      this.marker = undefined
      this.polylines = {}
    }
  }
}

const WebSocketService = new WebSocketServiceSingleton()
export default WebSocketService
