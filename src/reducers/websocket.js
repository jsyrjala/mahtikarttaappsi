const initialState = {
  websocket: {
    status: 'closed'
  }
};

export function websocket(state = initialState, action) {
  console.log('state')
  switch (action.type) {
    case 'WEBSOCKET_CONNECTING':
      return  {
        ...state,
        websocket: {
          status: 'connecting'
        }
      };
    case 'WEBSOCKET_OPENED':
      return  {
        ...state,
        websocket: {
          status: 'open'
        }
      };
    case 'WEBSOCKET_CLOSED':
      return  {
        ...state,
        websocket: {
          status: 'closed'
        }
      };
    // TODO websocket error
    default:
      return state;
  }
}
