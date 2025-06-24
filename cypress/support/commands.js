/// <reference types="cypress" />

import HabitsPageObject from "./pages/habits.pageObject copy";
import SignInPageObject from "./pages/signIn.pageObject";
import TodosPageObject from "./pages/todos.pageObject";

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

//User for testing
const SignInPage = new SignInPageObject();
const HabitsPage = new HabitsPageObject();
const TodosPage = new TodosPageObject();
const email = "cevok33220@cristout.com";
const password = "123123";

Cypress.Commands.add("getByDataCy", (selector) => {
  cy.get(`[data-cy^="${selector}"]`);
});

Cypress.Commands.add("login", () => {
  SignInPage.typeEmail(email);
  SignInPage.typePassword(password);

  SignInPage.clickLoginButton();
});

Cypress.Commands.add("addHabit", (title) => {
  HabitsPage.typeTitle(title);
  HabitsPage.clickButttonAddHabit();
});
Cypress.Commands.add("addTodo", (title) => {
  TodosPage.typeTitle(title);
  TodosPage.clickButttonAddTodo();
});
