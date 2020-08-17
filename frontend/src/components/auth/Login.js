import React, { Component } from 'react';
import { loginUserAsync } from '../../store/reducers/authReducers';
import { connect } from 'react-redux';
import './style.css';

class LoginComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:'',
      loading:false,
      done:false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const name = e.target.name;
    const value = e.target.value;
    switch(name){
      case 'email':
        return this.setState({
          email:value
        });
      case 'password':
        return this.setState({
          password:value
        })
      default:
        return;
    }
  }

  async handleSubmit(e){
    this.setState({
      loading:true
    });
    e.preventDefault();
    const data = await fetch('/auth/signin',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username:this.state.email,
        password:this.state.password
      })
    });
    const jsonData = await data.json();
    if(jsonData.error){
      alert("Invalid Credentials");
      this.setState({
        loading:false,
      })
      return;
    }
    localStorage.setItem('auth-token',jsonData.token);
    this.setState({
      loading:false,
      done:true
    });
  }

  render(){
    return (
          <form className='loginForm' onSubmit={e=>this.handleSubmit(e)}>
          <h1 style={{textAlign:'center'}}>LOGIN</h1>
          <input name='email' placeholder='Username' onChange={this.handleChange} required value={this.state.email} type='text' />
          <input name='password' placeholder='Password' required onChange={this.handleChange} value={this.state.password} type='password' />
          {this.state.loading?
          <button type='submit' disabled>Processig...</button>:
          <button type='submit'>Login</button>
          }
          {
            this.state.done?
            <p style={{fontSize:'1.2em',textAlign:"center"}}>Successfully logged in <br/><a style={{color:'#444', textDecoration:'underline'}} href='/products'>Click here</a><br/> to proceed.</p>:
            <p style={{fontSize:'1.2em',textAlign:"center"}}><a style={{color:'#444', textDecoration:'underline'}} href='/signup'>Sign Up</a> if you aren't registerd.</p>
          }
        </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    user:state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser : user => dispatch(loginUserAsync(user))
  }
}

const Login = connect(mapStateToProps,mapDispatchToProps)(LoginComponent);

export default Login;