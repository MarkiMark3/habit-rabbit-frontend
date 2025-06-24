import { faker } from "@faker-js/faker";
import TodosPageObject from "../support/pages/todos.pageObject";

const TodosPage = new TodosPageObject();

describe("Todos page", () => {
  let title;
  beforeEach(() => {
    title = faker.person.bio();
    TodosPage.visit();
    cy.login();
    cy.addTodo(title);
  });

  it("Should add new todo", () => {
    TodosPage.titleTodo.should("contain", title);
  });

  it("Should complete the habit", () => {
    TodosPage.toggleTodoByTitle(title);
    TodosPage.findTodoBox(title).should(
      "have.class",
      "has-background-danger-light"
    );
  });

  it("Should complete the todo and then undo it", () => {
    TodosPage.toggleTodoByTitle(title);
    TodosPage.findTodoBox(title).should(
      "have.class",
      "has-background-danger-light"
    );
    TodosPage.toggleTodoByTitle(title);
    TodosPage.findTodoBox(title).should(
      "have.class",
      "has-background-success-light"
    );
  });

  it("Should delete a todo", () => {
    TodosPage.deleteTodoByTitle(title);
    TodosPage.getTodoByTitle().should("not.exist");
  });

  it("Should find a todo", () => {
    TodosPage.typeSearch(title);
    TodosPage.findTodoBox(title).should("exist");
    cy.get('[data-cy="todoContainer-todos-page"]').should("have.length", 1);
  });
});
