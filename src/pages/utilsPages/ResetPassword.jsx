import { useState } from "react";
import { Formik, Form, Field } from "formik";
import cn from "classnames";

import { usePageError } from "../../hooks/usePageError.js";
import { authService } from "../../services/authService.js";

function validatePassword(value) {
  if (!value) {
    return "Password is required";
  }

  if (value.length < 6) {
    return "At least 6 characters";
  }
}

export const ResetPassword = () => {
  const [error, setError] = usePageError("");

  const [reset, setReset] = useState(false);

  if (reset) {
    return (
      <section className="">
        <h1 className="title">Password was Reset</h1>
        <p>Your password was reset!</p>
      </section>
    );
  }
  return (
    <>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validateOnMount={true}
        onSubmit={({ password, confirmPassword }, formikHelpers) => {
          formikHelpers.setSubmitting(true);

          authService
            .resetPass({ password, confirmPassword })
            .then(() => {
              setReset(true);
            })
            .catch((error) => {
              if (error.message) {
                setError(error.message);
              }

              if (!error.response?.data) {
                return;
              }

              const { errors, message } = error.response.data;

              formikHelpers.setFieldError("password", errors?.password);
              formikHelpers.setFieldError(
                "cpnfirmPassword",
                errors?.confirmPassword
              );

              if (message) {
                setError(message);
              }
            })
            .finally(() => {
              formikHelpers.setSubmitting(false);
            });
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form className="box">
            <h1 className="title">Reset Password</h1>
            <div className="field">
              <label htmlFor="password" className="label">
                New Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="password"
                  type="password"
                  id="password"
                  placeholder="*******"
                  className={cn("input", {
                    "is-danger": touched.password && errors.password,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>

                {touched.password && errors.password && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.password && errors.password ? (
                <p className="help is-danger">{errors.password}</p>
              ) : (
                <p className="help">At least 6 characters</p>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>

              <div className="control has-icons-left has-icons-right">
                <Field
                  validate={validatePassword}
                  name="confirmPassword"
                  type="password"
                  id="confirmPassword"
                  placeholder="*******"
                  className={cn("input", {
                    "is-danger":
                      touched.confirmPassword && errors.confirmPassword,
                  })}
                />

                <span className="icon is-small is-left">
                  <i className="fa fa-lock"></i>
                </span>

                {touched.confirmPassword && errors.confirmPassword && (
                  <span className="icon is-small is-right has-text-danger">
                    <i className="fas fa-exclamation-triangle"></i>
                  </span>
                )}
              </div>

              {touched.confirmPassword && errors.confirmPassword ? (
                <p className="help is-danger">{errors.confirmPassword}</p>
              ) : (
                <p className="help">At least 6 characters</p>
              )}
            </div>
            <div className="field">
              <button
                type="submit"
                className={cn("button is-success has-text-weight-bold", {
                  "is-loading": isSubmitting,
                })}
                disabled={isSubmitting || errors.confirmPassword}
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
