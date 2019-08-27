import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse,MDBFormInline } from "mdbreact";
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
        <MDBNavbar color="elegant-color-dark" dark expand="md" style={{ marginTop: "1px" }} className="" scrolling >
          <MDBNavbarBrand>
           Ag-Pub
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
            <MDBNavbarNav className="justify-content-center">
            <MDBNavItem>
                <Link to="/" className="nav-header">Accueil</Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/tous" className="nav-header">Publiciter</Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/test" className="nav-header">Entreprise Acces</Link>
              </MDBNavItem>
</MDBNavbarNav>
            <MDBNavbarNav right>

              <MDBNavItem>
              <MDBFormInline waves>
                        <div className="md-form my-0">
                          <input
                            className="form-control mr-sm-2"
                            type="text"
                            placeholder="Rechercher"
                            aria-label="Search"
                          />
                        </div>
                      </MDBFormInline>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/register" className="nav-header" >Creer compte</Link>
              </MDBNavItem>
              <MDBNavItem>
                <Link to="/login" className="nav-header" >Connexion</Link>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

      </div>
    );
  }
}

export default Navbar;
