import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from './styles';
import L from 'leaflet';
import _ from 'lodash';

/* actions */
import * as actionCreators from 'actions/map';

@connect(state => state.map)
export class MapView extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    map: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(actionCreators, this.props.dispatch);
    this.polylines = {}
  }

  location() {
    return this.props.map
  }
  getMap() {
    return this.refs.map.leafletElement
  }
  storeState() {
    const leaflet = this.getMap()
    const position = leaflet.getCenter()
    const zoom = leaflet.getZoom()
    this.actions.update([position.lat, position.lng], zoom)
  }
  handleResize() {
    this.refs.container.style.height = (window.innerHeight - 85 ) + 'px';
  }
  updateMarker(event) {
    if(!event.loc) {
      return
    }
    var coordinate = L.latLng(event.loc, event.city)
    if(this.marker) {
      console.log('update marker', coordinate, event.city)
      this.marker.setLatLng(coordinate)
      this.marker.update()
      //console.log(this.getMap().hasLayer(this.marker))
    } else {
      this.marker = L.marker(coordinate)
      this.marker.addTo(this.getMap())
    }
  }
   palette = [
     'blue', 'red', 'green', 'violet', 'black', 'white', 'purple',
   ]

  updatePolyline(event) {
    if(this.polylines[event.city]) {
      const polyline = this.polylines[event.city]
      polyline.spliceLatLngs(polyline.getLatLngs(), 0, event.loc)
    } else {
      const color = this.palette[_.random(this.palette.length)]
      const polyline = L.polyline([event.loc], {color: color})
      this.polylines[event.city] = polyline
      polyline.city = event.city
      polyline.addTo(this.getMap())
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

        this.updatePolyline(msg)
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
  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', () => this.handleResize());
    this.startWebSocket()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', () => this.handleResize());
    this.stopWebSocket()
  }

  markers() {
    if(_.isEmpty(this.props.map.coordinates)) {
      return
    }
    const coordinates = this.props.map.coordinates
    const coordinate = _.last(coordinates)
    return (
      <Marker position={coordinate.loc}>
        <Popup>
          <span>{coordinate.city}</span>
        </Popup>
      </Marker>
    )
  }

  render() {
    return (
      <div className='map-container' ref='container'>
        <Map ref='map'
             center={this.location().position} zoom={this.location().zoom}
             onLeafletMoveend={() => this.storeState()}
             onLeafletZoomend={() => this.storeState()}>
          <TileLayer
            url='http://tiles.kartat.kapsi.fi/peruskartta/{z}/{x}/{y}.png'
            attribution='<a class="attribution" href="http://maanmittauslaitos.fi/">MML</a>'
            />
          <Marker position={[60.4847371,26.4378938]}>
            <Popup>
              <span>Ruhtinashuvila<br/><a href="http://www.nitor.fi">CodeCamp</a></span>
            </Popup>
          </Marker>
        </Map>
      </div>
    )
  }
}