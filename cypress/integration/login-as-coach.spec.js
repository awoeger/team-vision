describe('Can login as coach', () => {
  it('Can login as coach, create new team, go to team, can create event, can access all team pages', () => {
    cy.visit('http://localhost:3000/');
    // Login as coach
    cy.get('[data-cy="header-login-link"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-cy="login-username"]').type('user_coach_test');
    cy.get('[data-cy="login-password"]').type('triA1-PA55w0rd1');
    cy.get('[data-cy="login-button"]').click();
    cy.get('[data-cy="your-profile"]').click();
    cy.wait(10000);
    cy.url().should('include', '/profiles/user_coach_test');

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
    cy.get('[data-cy="event-start-date"]').type('2022-01-01');
    cy.get('[data-cy="event-end-date"]').type('2022-01-01');
    cy.get('[data-cy="event-meeting-time"]').type('11:11');
    cy.get('[data-cy="event-start-time"]').type('12:12');
    cy.get('[data-cy="event-end-time"]').type('13:13');
    cy.get('[data-cy="event-location"]').type('Test Location');
    cy.get('[data-cy="event-description"]').type('Test Test Test');
    cy.get('[data-cy="create-new-event"]').click();

    // Go to single event
    cy.contains('EXERCISES').click();
    cy.contains('TEAM BASE').click();

    // Logout as coach
    cy.get('[data-cy="header-logout-link"]').click();
    cy.url().should('include', '/logout');

    // SWITCHING PROFILES
    // Login as player
    cy.get('[data-cy="header-login-link"]').click({ force: true });
    cy.url().should('include', '/login');
    cy.get('[data-cy="login-username"]').type('user_player_test');
    cy.get('[data-cy="login-password"]').type('triA1-PA55w0rd2');
    cy.get('[data-cy="login-button"]').click();
    cy.get('[data-cy="your-profile"]').click();
    cy.wait(10000);
    cy.url().should('include', '/profiles/user_player_test');

    // Send player request
    cy.get('[data-cy="join-a-team"]').click();
    cy.get('[data-cy="player-request-teamChoice"]').select('Test Team');
    cy.get('[data-cy="player-request-position"]').type('Test position');
    cy.get('[data-cy="player-request-playingTime"]').type('xx/yyyy');
    cy.get('[data-cy="player-request-experience"]').select('Beginner');
    cy.get('[data-cy="player-request-message"]').type('Test Message');
    cy.get('[data-cy="send-request"]').click();
    cy.url().should('include', '/profiles/user_player_test');

    // Logout as player
    cy.get('[data-cy="header-logout-link"]').click();
    cy.url().should('include', '/logout');

    // SWITCHING PROFILES
    // Login as coach
    cy.get('[data-cy="header-login-link"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-cy="login-username"]').type('user_coach_test');
    cy.get('[data-cy="login-password"]').type('triA1-PA55w0rd1');
    cy.get('[data-cy="login-button"]').click();
    cy.get('[data-cy="your-profile"]').click();
    cy.wait(10000);
    cy.url().should('include', '/profiles/user_coach_test');

    // Go to team
    cy.get('[data-cy="go-to-team"]').click();

    // Decline player request
    cy.contains('TEAM MEMBERS').click();
    cy.get('[data-cy="decline-player-request"]').click();

    // Delete event
    cy.contains('TEAM BASE').click();
    cy.get('[data-cy="delete-event"]').click({ force: true });

    // Delete team
    cy.get('[data-cy="your-profile"]').click();
    cy.get('[data-cy="delete-team"]').click();

    // Logout as coach
    cy.get('[data-cy="header-logout-link"]').click();
    cy.url().should('include', '/logout');
  });
});
