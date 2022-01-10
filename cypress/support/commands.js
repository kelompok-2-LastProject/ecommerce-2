/// <reference types="cypress" />

const BASE_URL = `http://localhost:3000`;
const ADMIN_TOKEN = '432681789120328';
// const USER_TOKEN = 'eyJr389hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

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

  // set token manually
  cy.window().then((win) => {
    cy.log('set admin token to localStorage', ADMIN_TOKEN);
    win.localStorage.setItem('token', ADMIN_TOKEN);
  });
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
  cy.wait('@loginAsUser').then((interception) => {
    // set token manually
    cy.window().then((win) => {
      cy.log(
        'set user token to localStorage',
        interception.response.body.token,
      );
      win.localStorage.setItem('token', interception.response.body.token);
    });
  });
});
