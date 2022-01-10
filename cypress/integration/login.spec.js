/// <reference types="cypress" />

describe('Login Page', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const BASE_URL = `http://localhost:3000`;
  const ADMIN_TOKEN = '432681789120328';

  /* ---------------------------------- Unauthenticated --------------------------------- */
  context('Unauthenticated', () => {
    it('should be redirected to /login when visiting protected page ', function () {
      // visit protected page
      cy.visit(BASE_URL + '/admin/sales');
      // should be redirected to /login
      cy.url().should('include', '/login');

      // visit protected page
      cy.visit(BASE_URL + '/admin/products');
      // should be redirected to /login
      cy.url().should('include', '/login');

      // token should NOT be present in localstorage
      expect(localStorage.getItem('token')).to.be.null;

      // UI should reflect this user is in login page
      cy.get('[data-testid="login-title"]').should(
        'contain',
        'Login to your account',
      );
      cy.get('[data-testid="login-button"]').should('contain', 'Submit');
    });

    /* ---------------------------- ERROR - invalid email / password / empty it ---------------------------- */
    it('should be ERROR - invalid email / password / empty it', function () {
      const user = {
        email: 'aaaaaaaaaaaaaaaa',
        password: 'aaaaaaaaaaaaaaaa',
      };

      // type in email and password field
      cy.get('[data-testid="login-email"]').type(user.email);
      cy.get('[data-testid="login-password"]').type(user.password);

      // click login button
      cy.get('[data-testid="login-button"]').click();

      // UI should reflect there is an errors
      cy.get('.Toastify__toast-body')
        .should('be.visible')
        .and('contain', 'Wrong Username/Email or Password!');

      // clear email and password field
      cy.get('[data-testid="login-email"]').clear();
      cy.get('[data-testid="login-password"]').clear();
    });
  });

  /* ---------------------------------- Already authenticated --------------------------------- */
  context('Authenticated', () => {
    it('should be redirected to /admin/products when visiting /login as a ADMIN', function () {
      // login as ADMIN
      cy.loginAsAdmin();

      // then, navigate back to /login
      cy.visit(BASE_URL + '/login');

      // should be redirected to /admin/products
      cy.url().should('include', '/admin/products');

      // ADMIN token should be present in local storage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.eq(ADMIN_TOKEN);
      });

      // UI should reflect this admin being logged in
      cy.get('[data-testid="admin-products"]').should(
        'contain',
        'Update Product',
      );

      // UI should reflect there is an errors
      cy.get('.Toastify__toast-body')
        .should('be.visible')
        .and('contain', 'You are already logged in as admin');
    });

    it('should be redirected to / when visiting /login as a USER', function () {
      // login as USER
      cy.loginAsUser();

      // USER token should be present in local storage
      cy.window().then((win) => {
        expect(win.localStorage.getItem('token')).to.match(
          /eyJr389hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/,
        );
      });

      // UI should reflect this user being logged in
      cy.get('[data-testid="home-heading"]').should('contain', 'Products List');
    });
  });
});
