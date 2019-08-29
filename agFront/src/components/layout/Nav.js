import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline } from "mdbreact";
class Navbar extends Component {

  state = {
    modal5: false,

  }


  //popops login fonction 
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
  toggle = nr => () => {
    let modalNumber = "modal" + nr;
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }


  render() {
    return (
      <div>
        <MDBNavbar color="primary-color-dark" dark expand="md" style={{ marginTop: "1px" }} className="" scrolling >
          <MDBNavbarBrand id="brandsLogo">
            Ag-Pub
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <Link to="/" className="navList">Accueil</Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/tous" className="navList">Publiciter</Link>
              </MDBNavItem>

              <MDBNavItem>
                <Link to="/register" className="navList" >Creer compte</Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/login" className="navList" >Connexion</Link>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
        
      </div>
    );
  }
}

export default Navbar;
