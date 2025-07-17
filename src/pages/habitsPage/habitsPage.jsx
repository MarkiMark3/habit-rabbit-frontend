import { useEffect, useState } from 'react';
import cn from 'classnames';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { habitsService } from '../../services/habits.server';
import './habitsPage.scss';
import { validate } from '../../services/validators';

export const HabitsPage = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(null);
  const [loadingHabit, setLoadingHabit] = useState(null);

  const fetchData = () => {
    habitsService
      .getHabits()
      .then(setHabits)
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleHabit = (id) => {
    setLoadingHabit(id);
    habitsService
      .toggleHabit({ id })
      .then(() => {
        fetchData();
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        setLoadingHabit(false);
      });
  };

  const deleteHabit = (id) => {
    setLoadingDelete(id);
    habitsService
      .deleteHabit({ id })
      .then(() => {
        fetchData();
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        setLoadingDelete(null);
      });
  };

  return (
    <>
      <div className="habits">
        <h1 className="title is-3 mb-4 has-text-centered ">
          Habits for Today 🐇
        </h1>
        <div className="container">
          <Formik
            initialValues={{ title: '' }}
            onSubmit={({ title }, formikHelpers) => {
              setLoading(true);
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
                  setLoading(false);
                });
            }}
          >
            {() => (
              <Form className="mb-4">
                <div className="field has-addons">
                  <div className="control is-expanded-mobile">
                    <Field
                      validate={validate.name}
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
                      className={cn('button is-primary', {
                        'is-loading': loading,
                      })}
                      data-cy="addHabitButton-habits-page"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <ErrorMessage
                  name="title"
                  component="p"
                  className="help is-danger"
                />
              </Form>
            )}
          </Formik>
          <div className="box">
            {habits.map((habit) => (
              <div
                key={habit.id}
                data-cy="habitBox-habits-page"
                className={cn(
                  'is-flex is-align-items-center is-justify-content-space-between mb-2',
                  {
                    'has-background-success-light': habit.status,
                  }
                )}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  padding: '10px',
                  gap: '20px',
                }}
              >
                <div
                  className="is-flex is-align-items-center is-justify-content-space-between"
                  style={{ flex: 1, gap: '20px' }}
                >
                  <button
                    className={cn('button', {
                      'is-danger': habit.status,
                      'is-success': !habit.status,
                      'is-loading': habit.id === loadingHabit,
                    })}
                    data-cy="habitButton-habits-page"
                    onClick={() => toggleHabit(habit.id)}
                  >
                    {habit.status ? 'Undo' : 'Done'}
                  </button>

                  <p data-cy="habitTitle-habit-page" className="ml-2">
                    {habit.title}
                  </p>

                  <p
                    className="is-size-5"
                    style={{ minWidth: '50px', textAlign: 'right' }}
                  >
                    {+habit.streak !== 0 ? `${+habit.streak}🔥` : '🪵'}
                  </p>
                </div>
                <button
                  className={cn('button is-danger is-small', {
                    'is-loading': habit.id === loadingDelete,
                  })}
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
