import { useEffect, useState } from "react";
import { authService } from "../services/authService";
import { usePageError } from "../hooks/usePageError";
import { HomePageUser } from "./HomePages/HomePageUser";
import { HomePageNew } from "./HomePages/HomePageNew";

export const HomePage = () => {
  const [error, setError] = usePageError("");
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

  return (
    <>
      <h1
        className="title is-1 has-text-centered mb-4"
        data-cy="username-home-page"
      >
        {user.name
          ? `Welcome back ${user.name}!👋`
          : "Welcome to Habit Rabbit!🐰"}
      </h1>
      {user.name ? <HomePageUser /> : <HomePageNew />}
    </>
  );
};
