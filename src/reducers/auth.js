
const initialState = {
  auth: {
    user: undefined,
    status: 'logged-out'
  },
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        auth: {
          username: undefined,
          status: 'pending'
        }
      }
    case 'LOGGED_IN':
      return {
        ...state,
        auth: {
          username: action.username,
          status: 'logged-in'
        }
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        auth: {
          user: undefined,
          status: 'logged-out'
        }
      }

    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: undefined,
          status: 'logged-out'
        }
      }

    default:
      return state;
  }
}