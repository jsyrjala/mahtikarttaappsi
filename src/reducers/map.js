const initialState = {
  map: {
    position: [60.4847371,26.4378938],
    zoom: 3,
    coordinates: [],
    foo: [61,23.4378938]
  },
};

export function map(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_MAP':
      var mapState = state.map
      return {
        ...state,
        map: {
          ...mapState,
          position: action.position,
          zoom: action.zoom,
        },
      };

    case 'ADD_COORDINATE':
      var mapState = state.map
      return {
        ...state,
        map: {
          ...mapState,
          coordinates: [action.event]
        }
      }

    default:
      return state;
  }
}
