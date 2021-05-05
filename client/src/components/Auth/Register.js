import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import '../../App.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to homepage
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
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
    this.setState({ [e.target.id]: e.target.value });
  };
  //e.preventDefault() to stop the page from reloading when the submit button is clicked
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // we can easily access it within our action 
    this.props.registerUser(newUser, this.props.history);
  };


  render() {

    const { errors } = this.state;
    return (

      <div className="container1">

        <div className="row">

          <div className="col s8 offset-s2" className="main-register">
            <Link to="/" className="btn-flat waves-effect c white-text">
              <i className="material-icons left white-text">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="white-text text-darken-1">
                Already have an account? <Link to="/login" style={{ color: '#FFFE33' }}>Log in</Link>
              </p>
            </div>
             {/*Every form element has an onChange event that ties its value to our components state}*/}
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  style={{ color: ' #ffffff' }}
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"

                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name" className="white-text">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
                <input
                  style={{ color: ' #ffffff' }}
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email" className="white-text">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  style={{ color: ' #ffffff' }}
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password" className="white-text">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  style={{ color: ' #ffffff' }}
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2" className="white-text">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div >
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
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
//prop-types package to define types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
  { registerUser }
)(withRouter(Register));


