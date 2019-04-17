import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      err: "",
      redirect: false,
      loading: false
    }
  }

  signup = user => {
    axios.post('http://localhost:3001/signup', { 
      name: user.name,
      email: user.email,
      password: user.password
    })
    .then(res => {
      this.setState({
        redirect: true,
        loading: false,
      });
      swal("Congratulation!", `${res.data.message}`, "success");
    })
    .catch(err => {
      this.setState({ 
        err: err.response.data.error, 
        loading: false 
      });
      swal("Oops!", `${this.state.err}`, "error");
    })
  }

  handleChange = field => e => {
    this.setState({ [field]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({loading: true});
    const { name, email, password } = this.state;
    const user = { name, email, password };
    this.signup(user);
  }
  
  renderSignupForm = (name, email, password) => (
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
                onChange={this.handleChange("name")} 
                value={name}
              />
              <MDBInput
                label="Your email"
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
                label="Your password"
                icon="lock"
                group
                type="password"
                validate
                onChange={this.handleChange("password")} 
                value={password}          
              />
            </div>
            <div className="text-center">
              <MDBBtn onClick={this.handleSubmit}>Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )

  render() {
    const { name, email, password, redirect } = this.state;
    if(redirect) {
      return <Redirect to="/signin" />
    }
    return (
      <div>
        <React.Fragment>
          {this.renderSignupForm(name, email, password)}
        </React.Fragment>
      </div>
    );
  }
}

export default Signup;