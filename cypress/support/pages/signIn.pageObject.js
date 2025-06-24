import PageObject from "../PageObject";

class SignInPageObject extends PageObject {
  url = "/login";

  get emailField() {
    return cy.getByDataCy("email-login");
  }
  get passwordField() {
    return cy.getByDataCy("password-login");
  }

  get butttonLogin() {
    return cy.getByDataCy("button-login");
  }

  get username() {
    return cy.getByDataCy("username-home-page");
  }

  typeEmail(email) {
    this.emailField.type(email);
  }
  typePassword(pass) {
    this.passwordField.type(pass);
  }

  clickLoginButton() {
    this.butttonLogin.click();
  }
}

export default SignInPageObject;
