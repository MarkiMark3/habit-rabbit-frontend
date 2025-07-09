export const HomePageNew = () => {
  return (
    <div>
      <h1
        className="title is-1 has-text-centered mb-4"
        data-cy="username-home-page"
      >
        Welcome to Habit Rabbit!🐰
      </h1>
      <section className="hero is-light is-fullheight">
        <div className="hero-body has-text-centered">
          <div className="container">
            <h1 className="title is-2">
              Build Better Habits, One Day at a Time
            </h1>
            <h2 className="subtitle is-5">
              A simple and powerful way to track your habits and todos.
            </h2>

            <div className="buttons is-centered mt-5">
              <a href="/sign-up" className="button is-primary is-medium">
                Get Started
              </a>
              <a href="/login" className="button is-light is-medium">
                Log In
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h3 className="title has-text-centered is-3 mb-6">
            Why use our Website?
          </h3>

          <div className="columns is-multiline">
            <div className="column is-one-third has-text-centered">
              <span className="icon is-large has-text-primary">
                <i className="fas fa-check-circle fa-2x"></i>
              </span>
              <h4 className="title is-5 mt-3">Track Daily Habits</h4>
              <p>Create and complete habits every day to build consistency.</p>
            </div>

            <div className="column is-one-third has-text-centered">
              <span className="icon is-large has-text-info">
                <i className="fas fa-tasks fa-2x"></i>
              </span>
              <h4 className="title is-5 mt-3">Manage Your Todos</h4>
              <p>Plan your day with todos and reminders in one place.</p>
            </div>

            <div className="column is-one-third has-text-centered">
              <span className="icon is-large has-text-success">
                <i className="fas fa-chart-line fa-2x"></i>
              </span>
              <h4 className="title is-5 mt-3">See Your Progress</h4>
              <p>View streaks, stats, and celebrate your wins over time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
