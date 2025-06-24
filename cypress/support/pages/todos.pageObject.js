import PageObject from "../PageObject";

class TodosPageObject extends PageObject {
  url = "/todos";

  get titleField() {
    return cy.getByDataCy("title-todos-page");
  }
  get titleTodo() {
    return cy.getByDataCy("todoTitle-todos-page");
  }
  get todoBox() {
    return cy.getByDataCy("todoBox-todos-page");
  }
  get todoSearchField() {
    return cy.getByDataCy("search-todos-page");
  }

  get butttonAddTodo() {
    return cy.getByDataCy("addTodoButton-todos-page");
  }

  typeSearch(title) {
    this.todoSearchField.type(title);
  }

  typeTitle(title) {
    this.titleField.type(title);
  }
  getTodoByTitle(title) {
    return cy.contains('[data-cy="todoTitle-todos-page"]', title);
  }
  deleteTodoByTitle(title) {
    return this.todoBox
      .contains('[data-cy="todoTitle-todos-page"]', title)
      .parents('[data-cy="todoBox-todos-page"]')
      .find('[data-cy="todoDeleteButton-todos-page"]')
      .click();
  }
  toggleTodoByTitle(title) {
    return this.todoBox
      .contains('[data-cy="todoTitle-todos-page"]', title)
      .parents('[data-cy="todoBox-todos-page"]')
      .find('[data-cy="todoButton-todos-page"]')
      .click();
  }
  findTodoBox(title) {
    return this.todoBox
      .contains('[data-cy="todoTitle-todos-page"]', title)
      .parents('[data-cy="todoBox-todos-page"]');
  }
  clickButttonAddTodo() {
    this.butttonAddTodo.click();
  }
  clickButttonTodo() {
    this.butttonAddTodo.click();
  }
}

export default TodosPageObject;
