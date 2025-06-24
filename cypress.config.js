import { defineConfig } from "cypress";
import { faker } from "@faker-js/faker";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        generateUser() {
          const name = faker.person.firstName();
        },
      });
    },
  },
});
