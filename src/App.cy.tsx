import React from "react";
import App from "./App";
import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add("mount", mount);

describe("<App />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<App />);
  });
});
