import React, { Component } from "react";

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import { withStyles } from '@material-ui/core/styles';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import MonPub from "../Publications/MonPub"
// import MiseJ from "../Publications/MiseAJour"
// import NavbarRightMenu from "./NavTest"
import NavbarLeftMenu from "./LeftNavTest"


//   flex: {
//     flexGrow: 1
//   },
//   logo: {
//     color: '#fff',
//     textDecoration: 'none'
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20
//   },
//   root: {
//     flexGrow: 1
//   }

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (<div>
      <div className="root">
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className="menuButton"
              color="inherit"
              aria-label="Menu"
            >
               <NavbarLeftMenu /> 
            </IconButton>
            <Typography
              className="flex"
              variant="title"
              color="inherit"
            >
              <Link className="logo" to="/">
                MERN Social
              </Link>
            </Typography>
            {user.name.split(" ")[0]}
            <div>
              {/* <NavbarRightMenu logoutUser={logoutUser} user={user} />  */}
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        
        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.name.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
            </h4>
            <MonPub/>
            <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
