import $ from 'jquery'
export function requestLogin(username) {
  console.log('action: login')
  return {
    type: 'LOGIN',
  };
}


export function logout() {
  console.log('action: logout')
  return {
    type: 'LOGOUT'
  };
}

export function loggedIn(username) {
  console.log('action: loggedIn')
  return {
    type: 'LOGGED_IN',
    username,
  };
}

export function loginFailed() {
  console.log('action: loginFailed')
  return {
    type: 'LOGIN_FAILED'
  };
}

export function executeLogin(username, password) {
  console.log('action: executeLogin')
  return dispatch => {
    console.log('Starting login', dispatch)
    dispatch(requestLogin())
    console.log('before ajax')

    //return dispatch(loginFailed())

    return $.ajax({
      type: "POST",
      url: "/login",
      data: {username: username, password: password},
      contentType: "application/json; charset=utf-8",
      dataType: "json",
    }).then(() => {
      console.log('Logged in')
      return dispatch(loggedIn(username))
    }, () => {
      console.log('login fail')
      return dispatch(loginFailed())
    })

  }
}
