import React from "react";
import { Formik, Form, Field } from "formik";
import { MdVisibilityOff, MdVisibility, MdPassword } from "react-icons/md";
import { AiTwotoneMail } from "react-icons/ai";
import { useSelector } from "react-redux";

import "./styles.css";

function LoginForm(props) {
  const initialValues = {
    email: "",
    password: "",
  };

  const loginDetails = useSelector((state) => state.login);

  const [showPassword, setShowPassword] = React.useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <React.Fragment>
      <div className="glass_box">
        <Formik
          initialValues={initialValues}
          validate={(values) => props.validate(values)}
          onSubmit={(values) => props.submitLoginApi(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="col-12">
                <div className="col-12">
                  <label htmlFor="email">
                    Email <AiTwotoneMail />
                  </label>
                  <Field
                    style={{ outline: "none" }}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                    className={
                      errors.email && touched.email
                        ? "form-control login-input-field is-invalid"
                        : "form-control login-input-field"
                    }
                  />
                  {touched.email && errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  {/* {console.log(errors.email)} */}
                </div>

                <div className="col-12">
                  <label htmlFor="password">
                    Password <MdPassword />
                  </label>
                  <div className="password_field_row">
                    <div className="col-12">
                      <Field
                        style={{ outline: "none" }}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Enter your Password"
                        className={
                          errors.password && touched.password
                            ? "form-control login-input-field is-invalid"
                            : "form-control login-input-field"
                        }
                      />
                      {touched.password && errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    {showPassword ? (
                      <MdVisibility
                        fontSize="25px"
                        style={{
                          marginLeft:
                            touched.password && errors.password
                              ? "-15%"
                              : "-10%",
                          marginTop:
                            touched.password && errors.password
                              ? "-10%"
                              : "-6%",
                          cursor: "pointer",
                        }}
                        onClick={toggleShowPassword}
                      />
                    ) : (
                      <MdVisibilityOff
                        fontSize="25px"
                        style={{
                          marginLeft:
                            touched.password && errors.password
                              ? "-15%"
                              : "-10%",
                          marginTop:
                            touched.password && errors.password
                              ? "-10%"
                              : "-6%",
                          cursor: "pointer",
                        }}
                        onClick={toggleShowPassword}
                      />
                    )}
                  </div>
                </div>
                <button className="submit_btn" type="submit">
                  Login {loginDetails.loading && "..."}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default LoginForm;
