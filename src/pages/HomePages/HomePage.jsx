import { useEffect, useState } from 'react';
import { authService } from '../../services/authService';
import { HomePageUser } from './HomePageUser';
import { HomePageNew } from './HomePageNew';

export const HomePage = () => {
  const [user, setUser] = useState({});

  const fetchUser = () => {
    authService
      .getUser()
      .then(setUser)
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return <>{user.name ? <HomePageUser /> : <HomePageNew />}</>;
};
