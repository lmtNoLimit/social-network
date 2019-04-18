import React, { useState } from 'react';
import {
  MDBNavbar, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse
  } from "mdbreact";
import { Link } from 'react-router-dom';

const NavBar = () => {  
  const [ isOpenMenu, setIsOpenMenu ] = useState(0);
  const toggleCollapse = () => {
    setIsOpenMenu(!isOpenMenu);
  }
  return (
    <div>
      <MDBNavbar color="default-color" dark expand="md" fixed="top">
        <Link to="/">
          <strong className="white-text">LOGO</strong>
        </Link>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpenMenu} navbar>
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

export default NavBar;