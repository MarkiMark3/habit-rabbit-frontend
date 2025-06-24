/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByDataCy(selector: string): Chainable<any>;
    addHabit(title: string): Chainable<any>;
    addTodo(title: string): Chainable<any>;
    login(): Chainable<any>;
  }
}
