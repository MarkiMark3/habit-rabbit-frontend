import PageObject from "../PageObject";

class SignUpPageObject extends PageObject {
  url = "/sign-up";

  get nameField() {
    return cy.getByDataCy("name-sign-up");
  }
  get emailField() {
    return cy.getByDataCy("email-sign-up");
  }
  get passwordField() {
    return cy.getByDataCy("password-sign-up");
  }

  get butttonSubmit() {
    return cy.getByDataCy("submit-sign-up");
  }

  typeName(name) {
    this.nameField.type(name);
  }
  typeEmail(email) {
    this.emailField.type(email);
  }
  typePassword(pass) {
    this.passwordField.type(pass);
  }

  clickSubmitButton() {
    this.butttonSubmit.click();
  }
}

export default SignUpPageObject;
