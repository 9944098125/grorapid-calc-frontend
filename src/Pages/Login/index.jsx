import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import "./styles.css";
import LoginForm from "./Form";
import { login } from "../../Redux/Actions/login";
import Alert from "../../Components/AlertModal";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useSelector((state) => state.alert);
  const loginDetails = useSelector((state) => state.login);

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (isNaN(values.email)) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //eslint-disable-line
        errors.email = "Email is invalid";
      }
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(
        //eslint-disable-line
        values.password
      )
    ) {
      errors.password =
        "Password must contain 8 characters, at least one capital letter, one number and one special character";
    }
    // console.log(errors);
    return errors;
  };

  function submitLoginApi(values) {
    if (values) {
      dispatch(login(values));
    }
  }

  React.useEffect(() => {
    if (
      loginDetails.isActivated ||
      localStorage.getItem("is_activated") === true ||
      localStorage.getItem("user") !== null
    ) {
      navigate("/", { replace: true });
    }
  }, [loginDetails.isActivated, navigate]);

  return (
    <React.Fragment>
      <div className="login_container">
        <div className="login_heading_container">
          <h3 className="heading">Login</h3>
          <span className="heading">
            Don't have account ? Then <Link to="/register">Sign Up</Link>
          </span>
        </div>
        {alert.message && <Alert show={true} />}
        <LoginForm validate={validate} submitLoginApi={submitLoginApi} />
      </div>
    </React.Fragment>
  );
}
