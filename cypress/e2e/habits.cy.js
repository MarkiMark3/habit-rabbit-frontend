import HabitsPageObject from "../support/pages/habits.pageObject copy";
import { faker } from "@faker-js/faker";

const HabitsPage = new HabitsPageObject();

describe("Habits page", () => {
  let title;
  beforeEach(() => {
    title = faker.person.bio();
    HabitsPage.visit();
    cy.login();
    cy.addHabit(title);
  });

  it("Should add new habit", () => {
    HabitsPage.titleHabit.should("contain", title);
  });

  it("Should complete the habit", () => {
    HabitsPage.toggleHabitByTitle(title);
    HabitsPage.findHabitBox(title).should(
      "have.class",
      "has-background-success-light"
    );
  });

  it("Should complete the habit and then undo it", () => {
    HabitsPage.toggleHabitByTitle(title);
    HabitsPage.findHabitBox(title).should(
      "have.class",
      "has-background-success-light"
    );
    HabitsPage.toggleHabitByTitle(title);
    HabitsPage.findHabitBox(title).should(
      "not.have.class",
      "has-background-success-light"
    );
  });

  it("Should delete a habit", () => {
    HabitsPage.deleteHabitByTitle(title);
    HabitsPage.getHabitByTitle().should("not.exist");
  });
});
