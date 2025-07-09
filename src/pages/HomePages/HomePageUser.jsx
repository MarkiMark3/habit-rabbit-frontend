import { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { habitsService } from "../../services/habits.server";
import { todosService } from "../../services/todo.server";
import { Link } from "react-router-dom";

export const HomePageUser = () => {
  const [user, setUser] = useState({});
  const [habits, setHabits] = useState([]);
  const [todos, setTodos] = useState([]);
  const fetchData = () => {
    authService
      .getUser()
      .then(setUser)
      .catch((error) => {
        setError(error.message);
      });
    habitsService
      .getHabits()
      .then(setHabits)
      .catch((error) => {
        setError(error.message);
      });
    todosService
      .getTodos()
      .then(setTodos)
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getHighestStreak = habits
    .sort((habit1, habit2) => habit2.streak - habit1.streak)
    .filter((habit) => +habit.streak !== 0)
    .slice(0, 3);

  const getDoneTodos = todos.filter((todo) => todo.status);
  const getInProgresTodos = todos.filter((todo) => !todo.status);
  const getDoneHabits = habits.filter((habit) => habit.status);

  const getRate = Math.floor(
    ((getDoneTodos.length + getDoneHabits.length) * 100) /
      (habits.length + todos.length)
  );

  return (
    <section className="section">
      <h1
        className="title is-1 has-text-centered mb-4"
        data-cy="username-home-page"
      >
        Welcome back {user.name}!👋
      </h1>
      <div className="container">
        <h1 className="title">📈 Your Weekly Summary</h1>

        <div className="columns is-multiline mt-4">
          <div className="column is-one-quarter">
            <div className="box has-text-centered">
              <p className="heading">Todos Completed</p>
              <p className="title">{getDoneTodos.length}</p>
            </div>
          </div>

          <div className="column is-one-quarter">
            <div className="box has-text-centered">
              <p className="heading">Todos in Progress</p>
              <p className="title">{getInProgresTodos.length}</p>
            </div>
          </div>

          <div className="column is-one-quarter">
            <div className="box has-text-centered">
              <p className="heading">Success Rate</p>
              <p className="title">{getRate ? getRate : 0}%</p>
            </div>
          </div>

          <div className="column is-one-quarter">
            <div className="box has-text-centered">
              <p className="heading">Longest Streak</p>
              <p className="title">
                {getHighestStreak[0] ? `${getHighestStreak[0].streak}🔥` : 0}
              </p>
            </div>
          </div>
        </div>

        <div className="box">
          <h2 className="title is-5">🔥 Top Habit Streaks</h2>
          <ul>
            {getHighestStreak.map((habit, index) => (
              <li key={index}>
                <strong>{habit.title}</strong> – {habit.streak}🔥
              </li>
            ))}
          </ul>
        </div>

        <div className="buttons mt-5">
          <Link to="/habits" className="button is-primary">
            Go to Habits
          </Link>
          <Link to="/todos" className="button is-link">
            Go to Todos
          </Link>
        </div>
      </div>
    </section>
  );
};
