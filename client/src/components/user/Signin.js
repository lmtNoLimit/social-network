import React, { Component } from 'react';
import { MDBContainer, MDBInput, MDBBtn } from 'mdbreact';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import NavBar from './../common/NavBar';
import { signin } from '../../auth/auth';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const { email, password } = this.state;
    const user = { email, password };
    signin(user)
    .then(() => {
      this.setState({ redirect: true });
    })
    .catch(err => {
      this.setState({ err: err.response.data.error })
      swal("Oops!", `${this.state.err}`, "error");
    });
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
            onChange={this.handleChange("email")}
            value={email}
          />
          <MDBInput
            label="Type your password"
            icon="lock"
            group
            type="password"
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