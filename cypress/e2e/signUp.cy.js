import { faker } from "@faker-js/faker";
import SignUpPageObject from "../support/pages/signUp.pageObject";

const SignUpPage = new SignUpPageObject();

describe("SignUp Page", () => {
  beforeEach(() => {
    SignUpPage.visit();
  });
  it("user can sign-up", () => {
    SignUpPage.typeName(faker.person.firstName());
    SignUpPage.typeEmail(faker.internet.email());
    SignUpPage.typePassword("test123123");

    SignUpPage.clickSubmitButton();
    cy.get(".title").should("contain", "Check your email");
    cy.get("p").should(
      "contain",
      "We have sent you an email with the activation link"
    );
  });
});
