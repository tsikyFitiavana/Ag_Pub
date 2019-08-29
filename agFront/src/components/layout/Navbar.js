import React, { Component } from "react";

class Navbar extends Component {
  render() {
    return (
      <div>
        
      <div className="header">
        <h2 className="logo">Ag-Pub</h2>
        <input type="checkbox" id="chk"/>
        <label for="chk" className="show-menu-btn">
        <i class="fas fa-bars"></i>
        </label>
        <ul className="menu">
          <a href="#">Accueil</a>
          <a href="/tous">Publiciter</a>
          <a href="/">test</a>
          <label for="chk" className="hide-menu-btn">
        <i class="fas fa-times"></i>
        </label>
        </ul>
      </div>
      <div className="content">
        <div>test</div>
      </div>
      </div>
    );
  }
}

export default Navbar;
