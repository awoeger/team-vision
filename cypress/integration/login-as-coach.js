describe('Can login as coach', () => {
  it('Can login as coach, create new team, go to team, can create event, can access all team pages', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy="header-login-link"]').click();
    cy.get('[data-cy="login-username"]').type('user_coach_test');
    cy.get('[data-cy="login-password"]').type('triA1-PA55w0rd1');
    cy.contains('LOGIN').click();
    cy.get('[data-cy="create-new-team"]').click();
    cy.get('[data-cy="create-new-team-teamname"]').type('Test Team');
    cy.get('[data-cy="create-new-team-sporttype"]').type('Test Sport');
    cy.get('[data-cy="create-new-team-date"]').type('xx/yyyy');
    cy.contains('CREATE NEW TEAM').click();
  });
});
