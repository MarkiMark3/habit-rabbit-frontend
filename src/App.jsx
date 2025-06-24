import React, { useContext, useEffect } from "react";
import { Routes, Route, Link, useNavigate, NavLink } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles.scss";

import { AccountActivationPage } from "./pages/AccountActivationPage";
import { AuthContext } from "./components/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { RequireAuth } from "./components/RequireAuth";
import { UsersPage } from "./pages/userPage/UsersPage.jsx";
import { Loader } from "./components/Loader.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { usePageError } from "./hooks/usePageError.js";
import { ResetPassword } from "./pages/ResetPassword.jsx";
import { PassResetEmail } from "./pages/PassResetEmailPage.jsx";
import { ChangeEmailPage } from "./pages/ChangeEmail.jsx";
import { HabitsPage } from "./pages/habitsPage/habitsPage.jsx";
import { TodoPage } from "./pages/todoPage/TodoPage.jsx";

function App() {
  const navigate = useNavigate();
  const [error, setError] = usePageError();
  const { isChecked, user, logout, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isChecked) {
    return <Loader />;
  }

  return (
    <>
      <nav
        className="navbar has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-start">
          <NavLink to="/" className="navbar-item">
            Home
          </NavLink>

          <NavLink to="/users" className="navbar-item">
            Profile
          </NavLink>
          <NavLink to="/habits" className="navbar-item">
            Habits
          </NavLink>
          <NavLink to="/todos" className="navbar-item">
            Todos
          </NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {user ? (
                <button
                  className="button is-light has-text-weight-bold"
                  onClick={() => {
                    logout()
                      .then(() => {
                        navigate("/login");
                      })
                      .catch((error) => {
                        setError(error.response?.data?.message);
                      });
                  }}
                >
                  Log out
                </button>
              ) : (
                <>
                  <Link
                    to="/sign-up"
                    className="button is-light has-text-weight-bold"
                  >
                    Sign up
                  </Link>

                  <Link
                    to="/login"
                    className="button is-success has-text-weight-bold"
                  >
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="section">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="sign-up" element={<RegistrationPage />} />
            <Route
              path="activate/:activationToken"
              element={<AccountActivationPage />}
            />
            <Route path="newEmail/:email" element={<ChangeEmailPage />} />
            <Route path="reset" element={<PassResetEmail />} />
            <Route path="resetPassword" element={<ResetPassword />} />
            <Route path="login" element={<LoginPage />} />

            <Route path="/" element={<RequireAuth />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="habits" element={<HabitsPage />} />
              <Route path="todos" element={<TodoPage />} />
            </Route>
          </Routes>
        </section>

        {error && <p className="notification is-danger is-light">{error}</p>}
      </main>
    </>
  );
}

export default App;
