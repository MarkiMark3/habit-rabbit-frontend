import { useEffect, useState } from 'react';
import { usePageError } from '../../hooks/usePageError.js';
import './UserPage.scss';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import cn from 'classnames';
import { authService } from '../../services/authService.js';
import { validate } from '../../services/validators.js';

export const UsersPage = () => {
  const [error, setError] = usePageError('');
  const [user, setUser] = useState({});
  const [resetPass, setResetPass] = useState('');

  const fetchUser = () => {
    authService
      .getUser()
      .then(setUser)
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const [changeEmail, setChangeEmail] = useState(false);

  if (changeEmail) {
    return (
      <section className="">
        <h1 className="title">Check your email</h1>
        <p>We have sent you an email with the new Email link</p>
      </section>
    );
  }

  return (
    <div className="content">
      <h1 className="title is-2">Settings⚙️</h1>

      <p className="title is-bold is-4">
        Hi {user.name}👋! <br />
        This is your settings page.
        <br /> You can change your 🪪Name, 📬Email and 🕵️Password.
      </p>

      <div className="userPageForms">
        <Formik
          initialValues={{
            name: '',
          }}
          validateOnMount={true}
          onSubmit={({ name }, formikHelpers) => {
            formikHelpers.setSubmitting(true);

            authService
              .changeName({ name })
              .then(() => {
                formikHelpers.resetForm();
                fetchUser();
              })
              .catch((error) => {
                if (error.message) {
                  setError(error.message);
                }

                if (!error.response?.data) {
                  return;
                }

                const { errors, message } = error.response.data;

                formikHelpers.setFieldError('name', errors?.name);

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
            <Form className="box ">
              <h1 className="title">Change your Name</h1>
              <div className="field mb-4">
                <label htmlFor="name" className="label">
                  New Name
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validate.name}
                    name="name"
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className={cn('input', {
                      'is-danger': touched.name && errors.name,
                    })}
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>

                  {touched.name && errors.name && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
                </div>

                {touched.name && errors.name && (
                  <p className="help is-danger">{errors.name}</p>
                )}
              </div>

              <div className="field">
                <button
                  type="submit"
                  className={cn('button is-success has-text-weight-bold', {
                    'is-loading': isSubmitting,
                  })}
                  disabled={isSubmitting || errors.name}
                >
                  Sent
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{
            password: '',
            email: '',
          }}
          validateOnMount={true}
          onSubmit={({ password, email }, formikHelpers) => {
            formikHelpers.setSubmitting(true);

            authService
              .changeEmail({ password, email })
              .then(() => {
                setChangeEmail(true);
              })
              .catch((error) => {
                if (error.message) {
                  setError(error.message);
                }

                if (!error.response?.data) {
                  return;
                }

                const { errors, message } = error.response.data;

                formikHelpers.setFieldError('name', errors?.name);

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
              <h1 className="title">Change Email</h1>
              <div className="field">
                <label htmlFor="password" className="label">
                  Password
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validate.password}
                    name="password"
                    type="password"
                    id="password"
                    placeholder="*******"
                    className={cn('input', {
                      'is-danger': touched.password && errors.password,
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
              <div className="field mb-4">
                <label htmlFor="email" className="label">
                  New Email
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validate.email}
                    name="email"
                    type="email"
                    id="email"
                    placeholder="e.g. bobsmith@gmail.com"
                    className={cn('input', {
                      'is-danger': touched.email && errors.email,
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
                  className={cn('button is-success has-text-weight-bold', {
                    'is-loading': isSubmitting,
                  })}
                  disabled={isSubmitting || errors.email || errors.password}
                >
                  Sent
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Formik
          initialValues={{
            oldPassword: '',
            newPassword: '',
            confPassword: '',
          }}
          validateOnMount={true}
          onSubmit={(
            { oldPassword, newPassword, confPassword },
            formikHelpers
          ) => {
            formikHelpers.setSubmitting(true);

            authService
              .changePassword({ oldPassword, newPassword, confPassword })
              .then(() => {
                setResetPass('Password was Changed!');
              })
              .catch((error) => {
                if (error.message) {
                  setError(error.message);
                }

                if (!error.response?.data) {
                  return;
                }

                const { errors, message } = error.response.data;

                formikHelpers.setFieldError('name', errors?.name);

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
                <label htmlFor="oldPassword" className="label">
                  Old Password
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validate.password}
                    name="oldPassword"
                    type="password"
                    id="oldPassword"
                    placeholder="*******"
                    className={cn('input', {
                      'is-danger': touched.oldPassword && errors.oldPassword,
                    })}
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>

                  {touched.oldPassword && errors.oldPassword && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
                </div>

                {touched.oldPassword && errors.oldPassword ? (
                  <p className="help is-danger">{errors.oldPassword}</p>
                ) : (
                  <p className="help">At least 6 characters</p>
                )}
              </div>
              <div className="field">
                <label htmlFor="newPassword" className="label">
                  New Password
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validate.password}
                    name="newPassword"
                    type="password"
                    id="newPassword"
                    placeholder="*******"
                    className={cn('input', {
                      'is-danger': touched.newPassword && errors.newPassword,
                    })}
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>

                  {touched.newPassword && errors.newPassword && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
                </div>

                {touched.newPassword && errors.newPassword ? (
                  <p className="help is-danger">{errors.newPassword}</p>
                ) : (
                  <p className="help">At least 6 characters</p>
                )}
              </div>

              <div className="field">
                <label htmlFor="confPassword" className="label">
                  Confirm Password
                </label>

                <div className="control has-icons-left has-icons-right">
                  <Field
                    validate={validate.password}
                    name="confPassword"
                    type="password"
                    id="confPassword"
                    placeholder="*******"
                    className={cn('input', {
                      'is-danger': touched.confPassword && errors.confPassword,
                    })}
                  />

                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>

                  {touched.confPassword && errors.confPassword && (
                    <span className="icon is-small is-right has-text-danger">
                      <i className="fas fa-exclamation-triangle"></i>
                    </span>
                  )}
                </div>

                {touched.confPassword && errors.confPassword ? (
                  <p className="help is-danger">{errors.confPassword}</p>
                ) : (
                  <p className="help">At least 6 characters</p>
                )}
              </div>
              <div className="field">
                <button
                  type="submit"
                  className={cn('button is-success has-text-weight-bold', {
                    'is-loading': isSubmitting,
                  })}
                  disabled={isSubmitting || errors.confPassword}
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {error && <p className="notification is-danger is-light">{error}</p>}

      <Link to="/reset" className="button is-info has-text-weight-bold mt-6">
        Reset your password
      </Link>

      {resetPass.length > 0 && (
        <p className="notification is-success is-light">{resetPass}</p>
      )}
    </div>
  );
};
