import { useEffect, useState } from "react";
import { authService } from "../../services/authService";
import cn from "classnames";
import { Formik, Form, Field } from "formik";
import { habitsService } from "../../services/habits.server";
import { usePageError } from "../../hooks/usePageError";
import "./habitsPage.scss";

export const HabitsPage = () => {
  const [error, setError] = usePageError("");
  const [user, setUser] = useState({});
  const [habits, setHabits] = useState([]);

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
  };
  useEffect(() => {
    fetchData();
  }, []);

  const toggleHabit = (id) => {
    habitsService
      .toggleHabit({ id })
      .then(() => {
        fetchData();
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {});
  };

  const deleteHabit = (id) => {
    habitsService
      .deleteHabit({ id })
      .then(() => {
        fetchData();
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {});
  };

  return (
    <>
      <div className="habits">
        <h1 className="title is-3 mb-4 has-text-centered ">
          Habits for Today 🐇
        </h1>
        <div className="container">
          <Formik
            initialValues={{ title: "" }}
            onSubmit={({ title }, formikHelpers) => {
              formikHelpers.setSubmitting(true);

              habitsService
                .addHabit({ title })
                .then(() => {
                  formikHelpers.resetForm();
                  fetchData();
                })
                .catch((e) => {
                  throw new Error(e);
                })
                .finally(() => {
                  formikHelpers.setSubmitting(false);
                });
            }}
          >
            {() => (
              <Form className="mb-4">
                <div className="field has-addons">
                  <div className="control is-expanded-mobile">
                    <Field
                      className="input is-fullwidth "
                      type="text"
                      name="title"
                      data-cy="title-habits-page"
                      placeholder="New habit title"
                    />
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className="button is-primary"
                      data-cy="addHabitButton-habits-page"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div className="box">
            {habits.map((habit) => (
              <div
                key={habit.id}
                data-cy="habitBox-habits-page"
                className={cn(
                  "is-flex is-align-items-center is-justify-content-space-between mb-2",
                  {
                    "has-background-success-light": habit.status,
                  }
                )}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "10px",
                  gap: "20px",
                }}
              >
                <div
                  className="is-flex is-align-items-center is-justify-content-space-between"
                  style={{ flex: 1, gap: "20px" }}
                >
                  <button
                    className={cn("button", {
                      "is-danger": habit.status,
                      "is-success": !habit.status,
                    })}
                    data-cy="habitButton-habits-page"
                    onClick={() => toggleHabit(habit.id)}
                  >
                    {habit.status ? "Undo" : "Done"}
                  </button>

                  <p data-cy="habitTitle-habit-page" className="ml-2">
                    {habit.title}
                  </p>

                  <p
                    className="is-size-5"
                    style={{ minWidth: "50px", textAlign: "right" }}
                  >
                    {+habit.streak !== 0 ? `${+habit.streak}🔥` : "🪵"}
                  </p>
                </div>
                <button
                  className="button is-danger is-small"
                  data-cy="habitDeleteButton-habits-page"
                  onClick={() => deleteHabit(habit.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
