describe('Can register as coach', () => {
  it('Can click through landing page, register as coach', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('About');
    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-guide-link"]').click();
    cy.get('[data-cy="header-contact-link"]').click();
    cy.get('[data-cy="header-login-link"]').click();
    cy.contains('Register now').click();
    cy.get('[data-cy="registration-first-name"]').type('User Coach');
    cy.get('[data-cy="registration-last-name"]').type('Test');
    cy.get('[data-cy="registration-username"]').type('user_coach_test');
    cy.get('[data-cy="registration-email"]').type('user_coach_test@gmail.com');
    cy.get('[data-cy="registration-password"]').type('triA1-PA55w0rd1');
    cy.get('[data-cy="registration-role-coach"]').select('Coach');
    cy.contains('CREATE ACCOUNT').click();
  });
});
