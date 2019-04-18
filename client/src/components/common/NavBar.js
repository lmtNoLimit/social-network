import React, { Component } from 'react';
import {
  MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse
  } from "mdbreact";
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }
  toggleCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
    return (
      <div>
        <MDBNavbar color="default-color" dark expand="md" fixed="top">
          <Link to="/">
            <strong className="white-text">LOGO</strong>
          </Link>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <Link className="nav-link" to="/signin">Sign in</Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link className="nav-link" to="/signup">Sign up</Link>
              </MDBNavItem>            
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default NavBar;