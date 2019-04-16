import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
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
    <Form className="form">
      <h2>Create an account</h2>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input 
          onChange={this.handleChange("name")} 
          type="text" 
          name="name" 
          id="name" 
          placeholder="ex. Lam Thanh"
          value={name}
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input 
          onChange={this.handleChange("email")} 
          type="email" 
          name="email" 
          id="email" 
          placeholder="ex. lmt151099@gmail.com"
          value={email}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input 
          onChange={this.handleChange("password")} 
          type="password"
          name="password"
          id="password"
          placeholder="ex. lmt999999"
          value={password}
        />
      </FormGroup>
      <p>By clicking "Create your account" below, you agree to our <Link to="/signup">terms of service</Link> and <Link to="/signup">privacy policy</Link></p>
      <Button onClick={this.handleSubmit} color="primary">Create your account</Button>
      {this.state.loading ? 
        <div className="text-center mt-2">
          <Spinner type="grow" color="primary" />
          <Spinner type="grow" color="info" />
          <Spinner type="grow" color="success" />
          <Spinner type="grow" color="danger" />
          <Spinner type="grow" color="warning" />
        </div> : ""}
      <p>Already have an account? <Link to="/signin">Sign in</Link></p>
    </Form>
  )

  render() {
    const { name, email, password, redirect } = this.state;
    if(redirect) {
      return <Redirect to="/signin" />
    }
    return (
      <div className="d-flex justify-content-center align-items-center wrapper">
        <React.Fragment>
          {this.renderSignupForm(name, email, password)}
        </React.Fragment>
      </div>
    );
  }
}

export default Signup;