import { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { usePageError } from "../../hooks/usePageError";
import { HomePageUser } from "./HomePageUser";
import { HomePageNew } from "./HomePageNew";

export const HomePage = () => {
  const [, setError] = usePageError("");
  const [user, setUser] = useState({});

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

  return <>{user.name ? <HomePageUser /> : <HomePageNew />}</>;
};
