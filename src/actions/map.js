export function update(position, zoom) {
  return {
    type: 'UPDATE_MAP',
    position,
    zoom,
  };
}