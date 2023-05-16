import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import RegistrationForm from "./Form";
import "./styles.css";
import Alert from "../../Components/AlertModal";
import { register } from "../../Redux/Actions/register";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const [url, setUrl] = React.useState("");
  function validate(values) {
    let errors = {};

    if (!values.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm your Password";
    }
    return errors;
  }

  const onImageChange = (image) => {
    if (image === undefined) {
      return;
    }
    if (
      image.type === "image/jpeg" ||
      "image/jpg" ||
      "image/png" ||
      "image/svg"
    ) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "projects");
      data.append("cloud_name", "dakda5ni3");
      fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          console.log(url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  function submitRegisterForm(values) {
    const data = {
      username: values.firstName + " " + values.lastName,
      email: values.email,
      password: values.password,
      photo: url,
    };
    // console.log(values);
    dispatch(register(data));
  }

  React.useEffect(() => {
    if (alert.type === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [alert, navigate]);

  return (
    <React.Fragment>
      <div className="registration_container">
        <div className="heading_container">
          <h3 className="heading">Registration</h3>
          <span>
            Already have an account ? Then <Link to="/login">Sign In</Link>
          </span>
        </div>
        {alert.message && <Alert show={true} />}
        <RegistrationForm
          validate={validate}
          submitRegisterForm={submitRegisterForm}
          onImageChange={(img) => onImageChange(img)}
          url={url}
        />
      </div>
    </React.Fragment>
  );
}
