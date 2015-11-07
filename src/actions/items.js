export function add(text) {
  return {
    type: 'ADD_ITEM',
    payload: {
      text,
    }
  };
}

export function del() {
  return {
    type: 'DELETE_ITEM',
  };
}
