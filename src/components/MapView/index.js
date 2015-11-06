import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

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
  }

  location() {
    return this.props.map
  }
  storeState() {
    const leaflet = this.refs.map.leafletElement
    const position = leaflet.getCenter()
    const zoom = leaflet.getZoom()
    this.actions.update([position.lat, position.lng], zoom)
  }
  render() {
    return (
      <div>
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