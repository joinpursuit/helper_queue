// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add("loginAdmin", () => {
  cy.visit("http://localhost:3000/");
  // must export CYPRESS_ADMIN_EMAIL AND CYPRESS_ADMIN_PASSWORD for successful tests
  cy.get("input[placeholder='Email']").type(Cypress.env("ADMIN_EMAIL"));
  cy.get("input[placeholder='Password']").type(Cypress.env("ADMIN_PASSWORD"));
  cy.contains("Login").click();
  cy.contains("Student Queue");
  cy.contains("Log Out");
});
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
