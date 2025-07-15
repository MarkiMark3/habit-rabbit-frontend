import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { todosService } from '../../services/todo.server';
import { usePageError } from '../../hooks/usePageError';
import { validate } from '../../services/validators';

export const TodoPage = () => {
  const [, setError] = usePageError('');
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, isLoading] = useState(false);
  const [loadingId, isLoadingId] = useState(null);
  const [loadingTodo, isLoadingTodo] = useState(null);

  const fetchData = () => {
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

  const filteredTodos = filterSortBy(filter);
  const finallTodos = filteredTodos.filter((todo) => {
    const title = todo.title.toLowerCase();
    const params = search.toLocaleLowerCase();

    return title.includes(params);
  });

  function filterSortBy(option) {
    switch (option) {
      case 'In progress':
        return todos.filter((todo) => todo.status !== true);
      case 'Finished':
        return todos.filter((todo) => todo.status !== false);
      default:
        return todos;
    }
  }

  const toggleTodo = (id) => {
    isLoadingTodo(id);
    todosService
      .toggleTodo({ id })
      .then(() => {
        fetchData();
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        isLoadingTodo(null);
      });
  };

  const deleteTodo = (id) => {
    isLoadingId(id);
    todosService
      .deleteTodo({ id })
      .then(() => {
        fetchData();
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        isLoadingId(null);
      });
  };

  return (
    <>
      <h1 className="title is-2 mb-4 has-text-centered">Your Todos✒️</h1>

      <div className="box">
        <div
          className="is-flex-desktop is-justify-content-space-between mb-4 "
          style={{ gap: '50px' }}
        >
          <Formik
            initialValues={{ title: '' }}
            onSubmit={({ title }, formikHelpers) => {
              formikHelpers.setSubmitting(true);
              isLoading(true);
              todosService
                .addTodo({ title })
                .then(() => {
                  formikHelpers.resetForm();
                  fetchData();
                })
                .catch((e) => {
                  throw new Error(e);
                })
                .finally(() => {
                  formikHelpers.setSubmitting(false);
                  isLoading(false);
                });
            }}
          >
            {() => (
              <Form className="mb-4">
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <Field
                      validate={validate.name}
                      className="input is-fullwidth"
                      type="text"
                      name="title"
                      placeholder="New Todo"
                      data-cy="title-todos-page"
                    />
                  </div>
                  <div className="control">
                    <button
                      type="submit"
                      className={cn('button is-primary', {
                        'is-loading': loading,
                      })}
                      data-cy="addTodoButton-todos-page"
                    >
                      Add Todo
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

          <div style={{ flex: 1 }}>
            <Formik initialValues={{ name: search }}>
              {() => (
                <Form
                  className="mb-4"
                  onChange={(e) => setSearch(e.target.value)}
                >
                  <div className="field">
                    <div className="control">
                      <Field
                        className="input"
                        type="text"
                        name="title"
                        placeholder="Search"
                        data-cy="search-todos-page"
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="control" style={{ minWidth: '120px' }}>
            <div className="select">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option>All</option>
                <option>In progress</option>
                <option>Finished</option>
              </select>
            </div>
          </div>
        </div>

        <div data-cy="todoContainer-todos-page">
          {finallTodos.map((todo) => (
            <div
              key={todo.id}
              data-cy="todoBox-todos-page"
              className={cn(
                'box mb-2 is-flex is-align-items-center is-justify-content-space-between',
                {
                  'has-background-danger-light': todo.status,
                  'has-background-success-light': !todo.status,
                }
              )}
            >
              <button
                data-cy="todoButton-todos-page"
                className={cn('button', {
                  'is-danger': todo.status,
                  'is-success': !todo.status,
                  'is-loading': todo.id === loadingTodo,
                })}
                onClick={() => {
                  toggleTodo(todo.id);
                }}
              >
                {todo.status ? 'Undo' : 'Done'}
              </button>
              <h2
                className="title is-4"
                data-cy="todoTitle-todos-page"
                style={{
                  textDecoration: todo.status ? 'line-through' : 'none',
                }}
              >
                {todo.title}
              </h2>

              <button
                data-cy="todoDeleteButton-todos-page"
                className={cn('button is-danger is-small', {
                  'is-loading': todo.id === loadingId,
                })}
                onClick={() => deleteTodo(todo.id)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
