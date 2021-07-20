describe('Can login as coach', () => {
  it('Can login as coach, create new team, go to team, can create event, can access all team pages', () => {
    cy.visit('http://localhost:3000/');
    // Login as coach
    cy.get('[data-cy="header-login-link"]').click();
    cy.get('[data-cy="login-username"]').type('user_coach_test');
    cy.get('[data-cy="login-password"]').type('triA1-PA55w0rd1');
    cy.contains('LOGIN').click();
    // Create new team
    cy.get('[data-cy="create-new-team"]').click();
    cy.get('[data-cy="create-new-team-teamname"]').type('Test Team');
    cy.get('[data-cy="create-new-team-sporttype"]').type('Test Sport');
    cy.get('[data-cy="create-new-team-date"]').type('xx/yyyy');
    cy.get('[data-cy="create-new-team-button"]').click();
    cy.get('[data-cy="go-to-team"]').click();
    // Create Training
    cy.contains('CREATE EVENT').click();
    cy.get('[data-cy="event-event-type"]').select('Training');
    cy.get('[data-cy="event-start-date"]').type('01.01.1111');
    cy.get('[data-cy="event-meeting-time"]').type('11:11');
    cy.get('[data-cy="event-start-time"]').type('12:12');
    cy.get('[data-cy="event-end-time"]').type('13:13');
    cy.get('[data-cy="event-location"]').type('Test Location');
    cy.get('[data-cy="event-description"]').type('Test Test Test');
    cy.contains('CREATE EVENT').click();
    cy.contains('SEE EVENT DETAILS').click();
    cy.contains('EXERCISES').click();
    cy.contains('TEAM MEMBERS').click();
  });
});
