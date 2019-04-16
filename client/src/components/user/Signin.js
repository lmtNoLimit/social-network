import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


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
    <Form className="form">
      <h2>Sign in</h2>
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
          placeholder="ex. lmt99999"
          value={password}
        />
      </FormGroup>      
      <Button onClick={this.handleSubmit} color="primary">Sign in</Button>
      {this.state.loading ? 
          <div className="text-center mt-2">
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
          </div> : ""}
      <p>Don't have an account? <Link to="/signup">Sign up</Link> here</p>
    </Form>
  )

  render() {
    const { email, password, redirect } = this.state;
    if(redirect) return <Redirect to="/" />
    return (
      <div className="d-flex justify-content-center align-items-center wrapper">
        <React.Fragment>
          {this.renderSigninForm(email, password)}
        </React.Fragment>
      </div>
    );
  }
}

export default Signin;