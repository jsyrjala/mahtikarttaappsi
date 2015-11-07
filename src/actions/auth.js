import WebSocketService from 'service/WebSocketService'


export function requestLogin(username) {
  console.log('action: login')
  return {
    type: 'LOGIN',
  };
}


export function logout() {
  console.log('action: logout')
  WebSocketService.stopWebSocket()

  return {
    type: 'LOGOUT'
  };
}

export function loggedIn(username, token) {
  console.log('action: loggedIn')
  WebSocketService.startWebSocket()
  return {
    type: 'LOGGED_IN',
    payload: {
      username,
      token,
    }
  };
}

export function loginFailed() {
  console.log('action: loginFailed')
  return {
    type: 'LOGIN_FAILED'
  };
}

export function executeLogin(username, password) {
  return dispatch => {
    dispatch(requestLogin())

    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response
      } else {
        var error = new Error(response.statusText)
        error.response = response
        throw error
      }
    }

    var data = JSON.stringify({
      'username': username,
      'password': password,
    })
    return fetch('http://localhost:3100/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    }).then(checkStatus)
      .then((response) => {
        if(response.status )
          return dispatch(loggedIn(username, response.json().token))
      }).catch(() => {
        return dispatch(loginFailed())
      })

  }
}
