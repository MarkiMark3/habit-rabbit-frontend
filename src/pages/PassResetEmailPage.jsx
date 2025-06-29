import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import cn from "classnames";

import { AuthContext } from "../components/AuthContext.jsx";
import { usePageError } from "../hooks/usePageError.js";
import { authService } from "../services/authService.js";

function validateEmail(value) {
  if (!value) {
    return "Email is required";
  }

  const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailPattern.test(value)) {
    return "Email is not valid";
  }
}

function validatePassword(value) {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 6) {
    return "At least 6 characters";
  }
}

export const PassResetEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = usePageError("");
  const { reset } = useContext(AuthContext);

  const [sentEmail, setSentEmail] = useState(false);

  if (sentEmail) {
    return (
      <section className="">
        <h1 className="title">Check your email</h1>
        <p>We have sent you an email with link to reset your Password</p>
      </section>
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
        }}
        validateOnMount={true}
        onSubmit={({ email }) => {
          authService
            .reset({ email })
            .then(() => {
              setSentEmail(true);
            })
            .catch((e) => {
              setError(error.response?.data?.message);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Reset Password</h1>
            <div className="field">
              <label htmlFor="email" className="label">
                Email
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validateEmail}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="e.g. bobsmith@gmail.com"
                  className={cn("input", {
                    "is-danger": touched.email && errors.email,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-envelope"></i>
                </span>

                {touched.email && errors.email && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.email && errors.email && (
                <p className="help is-danger">{errors.email}</p>
              )}
            </div>
            <div className="field">
              <button
                type="submit"
                className={cn("button is-success has-text-weight-bold", {
                  "is-loading": isSubmitting,
                })}
                disabled={isSubmitting || errors.email}
              >
                Send
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {error && <p className="notification is-danger is-light">{error}</p>}
    </>
  );
};
