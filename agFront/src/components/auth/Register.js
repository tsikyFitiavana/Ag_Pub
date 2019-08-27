import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      cles: "",
      password: "",
      password2: "",
      errors: {},
      persons: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/users/entreprise`)
      .then(res => {
        const persons = res.data;
        console.log("ity ny get entreprise lesy dada ah " + persons)
        this.setState({ persons });
      })
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      cles: this.state.cles,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div id="register">
            <form noValidate onSubmit={this.onSubmit}>
              <label htmlFor="name">Name</label>
              <br />
              <input

                id="inputFileRegister"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                name="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })}
              />
              <br />
              <span className="red-text">{errors.name}</span>
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input
                id="inputFileRegister"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                name="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email
                })}
              />
              <br />
              <span className="red-text">{errors.email}</span>
              <br />


              <label htmlFor="cles">Cles</label>
              <br />
              <input
                id="inputFileRegister"
                onChange={this.onChange}
                value={this.state.cles}
                error={errors.cles}
                name="cles"
                type="password"
                className={classnames("", {
                  invalid: errors.cles
                })}
              />
              <br />
              <span className="red-text">{errors.cles}</span>
              <br />

              <label htmlFor="password">Password</label>
              <br />
              <input
                id="inputFileRegister"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                name="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password
                })}
              />
              <br />
              <span className="red-text">{errors.password}</span>
              <br />
              <label htmlFor="password2">Confirm Password</label>
              <br />
              <input
                id="inputFileRegister"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                name="password2"
                type="password"
                className={classnames("", {
                  invalid: errors.password2
                })}
              />
              <br />
              <span className="red-text">{errors.password2}</span>
              <br />
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
                type="submit"
                id="buttonLogin"
              >
                S'inscrire
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
