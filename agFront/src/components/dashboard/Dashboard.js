import React, { Component } from "react";

import axios from 'axios';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import { withStyles } from '@material-ui/core/styles';
import Publication from "../Publications/AjoutPub"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import MonPub from "../Publications/MonPub"
import PubEntre from "../Publications/PubEntreprise"
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
  componentDidMount() {
    axios.get(`http://localhost:5000/api/users/entreprise/${localStorage.cles}`)
      .then(response => {
        console.log('user-entreprise.nom ==== ', response.data.nom)
        localStorage.setItem('nomEntre', response.data.nom)
        console.log('user-entreprise.nom ==== ', localStorage.getItem('nomEntre'))
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  render() {
    const { user } = this.props.auth;
    return (
    <div>
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
                Accueil
              </Link>
            </Typography>
            <Typography>
            </Typography>
            <Typography>
              <Link to="/dashboard">
                <button onClick={() => {
                  document.getElementById('dashboard').style.display = "none"
                  document.getElementById('ajout').style.display = "block"
                  document.getElementById('pub-entreprise').style.display = "none"
                }
                }>Nouvelle produit</button>
              </Link>
            </Typography>
            <Typography>
              <button
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Deconnecter
            </button>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <Publication />
      <div>
        <PubEntre />
      </div>


      <div style={{ height: "75vh" }} className="container valign-wrapper" id="dashboard">


        <div className="row">
          <div className="landing-copy col s12 center-align">
            <h4>
              <b>Bonjour</b> {user.name.split(" ")[0]} 👏
              <p className="flow-text grey-text text-darken-1">
              </p>
            </h4>
            <MonPub />

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
