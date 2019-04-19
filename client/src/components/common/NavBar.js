import React, { useState } from 'react';
import {
  MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse
  } from "mdbreact";
import { Link, withRouter } from 'react-router-dom';
import { signout } from './../../auth/auth';

const isActive = (history, path) => {
  return history.location.pathname === path ? 'active' : '';
}

const renderNavLink = (history) => {
  if(localStorage.getItem('token')) 
  return (
    <MDBNavbarNav right>
      <MDBNavItem>
        <span style={{userSelect: "none"}} className="nav-link disabled">{JSON.parse(localStorage.getItem('token')).user.name}</span>
      </MDBNavItem> 
      <MDBNavItem>
        <p 
          className="nav-link m-0" 
          onClick={() => signout(() => history.push('/'))}
          style={{cursor: "pointer"}}
        >
          Sign out
        </p>
      </MDBNavItem> 
    </MDBNavbarNav>
  );
  return (
    <MDBNavbarNav right>
      <MDBNavItem className={isActive(history, '/signin')}>
        <Link className="nav-link" to="/signin">Sign in</Link>
      </MDBNavItem>
      <MDBNavItem className={isActive(history, '/signup')}>
        <Link className="nav-link" to="/signup">Sign up</Link>
      </MDBNavItem>
    </MDBNavbarNav>
  );
}

const NavBar = ({history}) => {  
  const [ isOpen, setIsOpen ] = useState(false);
  const toggleCollapse = () => setIsOpen(!isOpen);
  return (
    <MDBNavbar color="default-color" dark expand="md" fixed="top">
      <Link to="/">
        <strong className="white-text">LOGO</strong>
      </Link>
      <MDBNavbarToggler onClick={toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
        {renderNavLink(history)}  
      </MDBCollapse>
    </MDBNavbar>
  );
}

export default withRouter(NavBar);