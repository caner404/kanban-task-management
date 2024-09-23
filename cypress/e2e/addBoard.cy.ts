describe('add a board', () => {
  it('creates an empty board', () => {
    cy.visit('/');

    // Fill out the form
    cy.get('button[name=addBoardBtn]').click();
    cy.get('input[name=boardName]').type('Moonlight Sun');
    cy.get('[data-testid="columns.0.columnName"]').type('Todo');
    cy.get('[data-testid="columns.1.columnName"]').type('Doing');

    // Click the sign-in button
    cy.get('button[name=addBoardFormBtn]').click();

    // UI should display the user's task list
    cy.get('h1').should('contain', 'Moonlight Sun');
  });
});
