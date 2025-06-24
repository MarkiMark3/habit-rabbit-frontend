import SignInPageObject from "../support/pages/signIn.pageObject";

const SignInPage = new SignInPageObject();
const user = "TestUser";
const email = "cevok33220@cristout.com";
const password = "123123";

describe("Sign-in Page", () => {
  beforeEach(() => {
    SignInPage.visit();
  });
  it("should let user to login", () => {
    cy.login();
    SignInPage.username.should("contain", user);
  });

  it("Should not let user to login with wrong email", () => {
    SignInPage.typeEmail("WRONGEMAIL@gmail.com");
    SignInPage.typePassword(password);

    SignInPage.clickLoginButton();
    cy.get(".notification").should("exist").should("contain", "Not found");
  });

  it("Should not let user to login with wrong password", () => {
    SignInPage.typeEmail(email);
    SignInPage.typePassword("WRONGPASSWORD");

    SignInPage.clickLoginButton();
    cy.get(".notification")
      .should("exist")
      .should("contain", "Invalid email or password");
  });
});
