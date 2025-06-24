import PageObject from "../PageObject";

class HabitsPageObject extends PageObject {
  url = "/habits";

  get titleField() {
    return cy.getByDataCy("title-habits-page");
  }
  get titleHabit() {
    return cy.getByDataCy("habitTitle-habit-page");
  }
  get habitBox() {
    return cy.getByDataCy("habitBox-habits-page");
  }

  get butttonAddHabit() {
    return cy.getByDataCy("addHabitButton-habits-page");
  }
  get butttonHabit() {
    return cy.getByDataCy("habitButton-habits-page");
  }

  typeTitle(title) {
    this.titleField.type(title);
  }
  getHabitByTitle(title) {
    return cy.contains('[data-cy="habitTitle-habit-page"]', title);
  }
  deleteHabitByTitle(title) {
    return this.habitBox
      .contains('[data-cy="habitTitle-habit-page"]', title)
      .parents('[data-cy="habitBox-habits-page"]')
      .find('[data-cy="habitDeleteButton-habits-page"]')
      .click();
  }
  toggleHabitByTitle(title) {
    return this.habitBox
      .contains('[data-cy="habitTitle-habit-page"]', title)
      .parents('[data-cy="habitBox-habits-page"]')
      .find('[data-cy="habitButton-habits-page"]')
      .click();
  }
  findHabitBox(title) {
    return this.habitBox
      .contains('[data-cy="habitTitle-habit-page"]', title)
      .parents('[data-cy="habitBox-habits-page"]');
  }
  clickButttonAddHabit() {
    this.butttonAddHabit.click();
  }
  clickButttonHabit() {
    this.butttonHabit.click();
  }
}

export default HabitsPageObject;
