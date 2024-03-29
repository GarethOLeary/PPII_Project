import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import axios from 'axios'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

   // If logged in and user navigates to Login page, should redirect them to homepage
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

   // push user to homepage when they login
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  // e.preventDefault() to stop the page from reloading when the submit button is clicked
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="container1">

        <div style={{ marginTop: "4rem" }} className="main-login">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect white-text">
              <i className="material-icons left white-text">keyboard_backspace</i> Back to
              home
            </Link >
            <div className="col s12 white-text" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="white-text text-darken-1">
                Don't have an account? <Link to="/register" style={{ color: '#FFFE33' }}>Register</Link>
              </p>
            </div>
            <br />
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  style={{ color: ' #ffffff' }}
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email" className="white-text">Email</label>
                <span className="red-text">
                  {errors.email}

                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12 black-text">
                <input

                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  style={{ color: ' #ffffff' }}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password" className="white-text">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
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
// mapStateToProps allows us to get our state from Redux and map it to props which we can use inside components
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// Used withRouter from react-router-dom, wrapping our component in our export withRouter()
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);

