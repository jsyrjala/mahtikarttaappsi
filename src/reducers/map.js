const initialState = {
  map: {
    position: [60.4847371,26.4378938],
    zoom: 14,
  },
};

export function map(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_MAP':
      return {
        ...state,
        map: {
          position: action.position,
          zoom: action.zoom,
        },
      };

    default:
      return state;
  }
}
