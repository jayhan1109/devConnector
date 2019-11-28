import React, { Fragment, useState } from "react";
import { Link,Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../reducers/alert";
import { login } from "../../reducers/auth";
import PropTypes from "prop-types";

const Login = ({login,isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const {email, password } = formData;

  const onChange = async e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login({email,password});
    }

  // Redirect if logged in
  if(isAuthenticated){
    return <Redirect to="/dashboard"/>
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            value={password}
            minLength="6"
            required
          />
        </div>
        
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
};

export default connect(
  state=>({
    isAuthenticated:state.auth.isAuthenticated
  }),
  {
  setAlert,
  login
})(Login);
