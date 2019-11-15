import React, {Component} from "react";

//utils 
import {axiosWithAuth} from '../utils/axiosWithAuth';

//components
class Login extends Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  changeHandler = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', this.state.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        this.props.history.push('/colors')
      })
      .catch(err => console.log('err in Login.login', err))
  }

  render() {
  return (
    <div>
      <form onSubmit = {this.login}>
        <input 
          type = 'text'
          name = 'username'
          onChange = {this.changeHandler}
          />
        <input
          type = 'text'
          name = 'password'
          onChange = {this.changeHandler}
          />
        <button>Log In</button>
      </form>
      {/* <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p> */}
    </div>
  );
  }
};

export default Login;
