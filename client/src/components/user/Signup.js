import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import NavBar from './../common/NavBar';
import { signup } from './../../auth/auth';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      err: "",
      redirect: false,
    }
  }  

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    signup(user)
    .then(() => {
      this.setState({ redirect: true });
    })
    .catch(err => {
      this.setState({ err: err.response.data.error });
      swal("Oops!", `${this.state.err}`, "error");
    });
  }
  
  renderSignupForm = (name, email, password) => (
    <MDBContainer className="wrapper">
      <form>
        <p className="h4 text-center mb-5">Sign up</p>
        <div className="grey-text">
          <MDBInput
            label="Your name"
            icon="user"
            group
            type="text"
            onChange={this.handleChange("name")} 
            value={name}
          />
          <MDBInput
            label="Your email"
            icon="envelope"
            group
            type="email"
            onChange={this.handleChange("email")} 
            value={email}
          />
          <MDBInput
            label="Your password"
            icon="lock"
            group
            type="password"
            onChange={this.handleChange("password")} 
            value={password}          
          />
        </div>
        <div className="text-center">
          <MDBBtn onClick={this.handleSubmit}>Register</MDBBtn>
        </div>
      </form>
    </MDBContainer>
  )

  render() {
    const { name, email, password, redirect } = this.state;
    if(redirect) {
      return <Redirect to="/signin" />
    }
    return (
      <div>
        <NavBar />
        <React.Fragment>
          {this.renderSignupForm(name, email, password)}
        </React.Fragment>
      </div>
    );
  }
}

export default Signup;