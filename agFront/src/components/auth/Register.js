import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import compose from 'recompose/compose';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import axios from 'axios';
const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.spacing.unit * 50,
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5]
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  link: {
    textDecoration: 'none'
  },
  footer: {
    marginTop: theme.spacing.unit * 2
  },
  errorText: {
    color: '#D50000',
    marginTop: '5px'
  },
  successText: {
    color: '#32971E',
    marginTop: '10px',
    textDecoration: 'none'
  }
});
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
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div className="container">
        <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Cree compte</Typography>
            <form noValidate onSubmit={this.onSubmit}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Nom</InputLabel>
                <Input
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
                <span className={classes.errorText}>{errors.name}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
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
                <span className={classes.errorText}>{errors.email}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Confirmation entreprise</InputLabel>
                <Input
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
                <span className={classes.errorText}>{errors.cles}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <Input
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
                <span className={classes.errorText}>{errors.password}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirmation mot de passe</InputLabel>
                <Input
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
                <span className={classes.errorText}>
                  {errors.password2}
                </span>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
              >
                cree compte
              </Button>
            </form>
            <Typography className={classes.footer} variant="body1">
              {'Déjà un compte? '}
              <NavLink to="/login" className={classes.link}>
                Se connecter
              </NavLink>
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
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

export default compose(withStyles(styles),connect(
  mapStateToProps,
  { registerUser }
))(withRouter(Register));
