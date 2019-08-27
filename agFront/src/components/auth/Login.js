import React, { Component } from "react";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    console.log(sessionStorage.getItem('idE'));

    // If logged in and user navigates to Login page, should redirect them to dashboard




    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div id="" className="container-fluid">
        <div className="row" >
          <div className="col-md-7">test</div>
          <div className="col-md-5">
          <div id="login">
          <form noValidate onSubmit={this.onSubmit}>
            <span >
              {errors.clesnotfound}
            </span>
            <br/>
            <label htmlFor="email">Email</label>
            <br/>
              <input id="inputFile"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                name="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <br/>
              
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>

              <br/>
              <label htmlFor="password">Password</label>
              <br/>
              <input
              id="inputFile"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                name="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect
                })}
              /><br/>
              
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span><br/>
              <button
                type="submit"
                id="buttonLogin"
              >
                Connexion
                </button>
          </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
