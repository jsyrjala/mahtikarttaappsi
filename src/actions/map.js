export function update(position, zoom) {
  return {
    type: 'UPDATE_MAP',
    payload: {
      position,
      zoom,
    },
  };
}

export function addCoordinate(event) {
  return {
    type: 'ADD_COORDINATE',
    payload: event
  }
}