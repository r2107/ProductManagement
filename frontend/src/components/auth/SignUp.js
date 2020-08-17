import React, { Component } from 'react';
import fetch from 'cross-fetch';
import './style.css';

class SignUp extends Component{
  constructor(){
    super();
    this.state = {
      loading:false,
      username: '',
      password: '',
      confPassword:'',
      done:false
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    const name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]:value
    });
  }

  async handleSubmit(e){
    e.preventDefault();
    if(this.state.password!==this.state.confPassword){
      alert('passwords do not match');
      return;
    }
    this.setState({
      loading:true
    });
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    const response = await fetch('/auth/signup',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    });
    const json = await response.json();
    if(json.message === 'Error: Username is already taken!'){
      alert('Username already exists');
      this.setState({
        loading:false
      })
      return;
    }
    this.setState({
      loading:false,
      done:true
    });
  }

  render(){
    return (
      <>
      {
        <form className='loginForm' onSubmit={e=>this.handleSubmit(e)}>
          <h1 style={{textAlign:'center'}}>SignUp</h1>
          <input name='username' placeholder='User Name' type='text' value={this.state.username} required onChange={this.handleChange} /><br />
          <input name='password' placeholder='Password' type='password' value={this.state.password} required onChange={this.handleChange} /><br />
          <input name='confPassword' placeholder='Confirm Password' type='password' value={this.state.confPassword} required onChange={this.handleChange} /> <br/>
          { this.state.loading?
          <button style={{margin:"0 36%"}} type='submit' disabled>Processing...</button>:
          <button style={{margin:"0 36%"}} type='submit'>SignUp</button>
          }
          {this.state.done?
          <p style={{fontSize:'1.2em',textAlign:"center"}}>Registration successful, <a style={{color:'#444', textDecoration:'underline'}} href='/login'>Login</a>.</p>:
          <p style={{fontSize:'1.2em',textAlign:"center"}}><a style={{color:'#444', textDecoration:'underline'}} href='/login'>Login</a> if you have already registerd.</p>
          }
        </form>
      }
      </>
    );
  }
}

export default SignUp;