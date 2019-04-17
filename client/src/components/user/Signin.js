import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import NavBar from './../common/NavBar';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      err: "",
      redirect: false,
      loading: false
    }
  }

  signin = user => {
    axios.post('http://localhost:3001/signin', { 
      email: user.email,
      password: user.password
    })
    .then(res => {
      if(typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(res.data));
        this.setState({ redirect: true, loading: false });
      }
    })
    .catch(err => {
      this.setState({ err: err.response.data.error, loading: false })
      swal("Oops!", `${this.state.err}`, "error");
    });
  }

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});
    const { email, password } = this.state;
    const user = { email, password };
    this.signin(user);
  }
  
  renderSigninForm = (email, password) => (
    <MDBContainer className="wrapper">
      <form>
        <p className="h4 text-center mb-5">Sign in</p>
        <div className="grey-text">
          <MDBInput
            label="Type your email"
            icon="envelope"
            group
            type="email"
            validate
            error="wrong"
            success="right"
            onChange={this.handleChange("email")}
            value={email}
          />
          <MDBInput
            label="Type your password"
            icon="lock"
            group
            type="password"
            validate
            onChange={this.handleChange("password")}
            value={password}
          />
        </div>
        <div className="text-center">
          <MDBBtn onClick={this.handleSubmit}>Login</MDBBtn>
        </div>
      </form>
    </MDBContainer>    
  )

  render() {
    const { email, password, redirect } = this.state;
    if(redirect) return <Redirect to="/" />
    return (
      <div>
        <NavBar />
        <React.Fragment>
          {this.renderSigninForm(email, password)}
        </React.Fragment>
      </div>
    );
  }
}

export default Signin;