/// <reference types="cypress" />

const BASE_URL = `http://localhost:3000`;

const admin = {
  email: 'admin@bukapedia.com',
  password: 'admin123',
};

const user = {
  email: 'mor_2314',
  password: '83r5^_',
};

Cypress.Commands.add('loginAsAdmin', () => {
  // visit login page
  cy.visit(BASE_URL + '/login');

  // type in admin email and password field
  cy.get('[data-testid="login-email"]').type(admin.email);
  cy.get('[data-testid="login-password"]').type(admin.password);

  // click login button
  cy.get('[data-testid="login-button"]').click();
});

Cypress.Commands.add('loginAsUser', () => {
  // spying on POST login
  cy.intercept('POST', 'https://fakestoreapi.com/auth/login').as('loginAsUser');

  // visit login page
  cy.visit(BASE_URL + '/login');

  // type in user email and password field
  cy.get('[data-testid="login-email"]').type(user.email);
  cy.get('[data-testid="login-password"]').type(user.password);

  // click login button
  cy.get('[data-testid="login-button"]').click();

  // wait on POST /login call
  cy.wait('@loginAsUser');
});
