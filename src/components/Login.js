import React, { useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

const initialState = {
  username : '',
  password : '',
  isLoading : false,
  error : '',
  LoggedIn : false,
}

function loginReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        isLoading: true,
        error: '',
      }
    case 'loggedIn':
      return {
        ...state,
        LoggedIn: true,
      }
    case 'logout':
      return {
        ...state,
        LoggedIn: false,
        isLoading: false,
        username: '',
        password: '',
      }
    case 'field' :
      return {
        ...state,
        [action.field]: action.value,
      }
    case 'error':
      return {
        ...state,
        error: 'Incorrect login information',
        isLoading: false,
        username: '',
        password: '',
      }
    case 'no spaces':
      return {
        ...state,
        error: 'No empty spaces',
      }

    default:
      break;
  }
  return state;
}

function Login() {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  const {username, password, isLoading, error, LoggedIn} = state;

  useEffect(()=>{
    if(/\s/gm.test(username)) {
      dispatch({type: 'no spaces'})
    }
  }, [username, password])


  const submitLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: 'login' });
    try {
      const validated = await validation(username, password);
      setCookie('user', validated.id);
      if(validated) {
        dispatch({ type: 'loggedIn' })
      }
    } catch (error) {
      dispatch({ type: 'error' });
    }
  };

  return (
    <div id="login-page" className="login-page">
      {LoggedIn ?
        <div>
          <h1> Hello {username}</h1>
          <button onClick={() => dispatch({ type: 'logout' })}>Log out</button>
        </div> :
        <form id="login-form">
          {<p className="error">{error}</p>}
          <label htmlFor="username-input">Insert username</label>
          <input
            className="username-input"
            id="username-input"
            placeholder="Username..."
            value={username}
            onChange={e => dispatch({ 
              type: 'field', 
              field: 'username', 
              value: e.currentTarget.value
            })}
          />
          <label htmlFor="password-input">Insert password</label>
          <input
            className="password-input"
            type="password"
            id="password-input"
            placeholder="Password..."
            value={password}
            onChange={e => dispatch({ 
              type: 'field', 
              field: 'password', 
              value: e.currentTarget.value
            })}
          />
          <button
            className="login-btn"
            type="submit"
            onClick={e => submitLogin(e)}
            disabled={isLoading}
          >
            {isLoading ? 'Loggin in...' : 'Login'}
          </button>
        </form>
      }
    </div>
  );
}

async function validation(username, password) {
  // return new Promise((resolve, reject) => {
  console.log('data before fetch', JSON.stringify({ username, password }), password);
  let userData;  
  await fetch('/api/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    }).then(response => response.json())
    .then(data => userData = data)
    console.log('userData', userData);
    return userData;
    // setTimeout(() => {
    //   if (username === 'artmap' && password === 'secret') {
    //     resolve();
    //   } else {
    //     reject();
    //   }
    // }, 1000);
  // });
}

export default Login;
