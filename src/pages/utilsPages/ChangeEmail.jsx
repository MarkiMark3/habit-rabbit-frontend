import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Loader } from "../../components/Loader.jsx";
import { authService } from "../../services/authService.js";

export const ChangeEmailPage = () => {
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const { email } = useParams();

  useEffect(() => {
    authService
      .activateEmail({ email })
      .catch((error) => {
        setError(error.response?.data?.message || `Wrong activation link`);
      })
      .finally(() => {
        setDone(true);
      });
  }, []);

  if (!done) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="title">Change Email</h1>

      {error ? (
        <p className="notification is-danger is-light">{error}</p>
      ) : (
        <p className="notification is-success is-light">
          Your email was Changed!
        </p>
      )}
    </>
  );
};
