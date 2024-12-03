/// <reference types="cypress" />

describe('board', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should edit a board after opening the edit modal and saving ', () => {
    cy.get('[data-testid="board-menu"]').click();
    cy.contains('Edit board').click();

    cy.get('#board-name').clear();
    cy.get('#board-name').type('Moonspring Risen');

    cy.get('[data-testid="status.0.statusName"]').clear();
    cy.get('[data-testid="status.0.statusName"]').type('Not Started');

    cy.get('[data-testid="status.1.statusName"]').clear();
    cy.get('[data-testid="status.1.statusName"]').type('In Progress');

    cy.get('[data-testid="status.2.statusName"]').clear();
    cy.get('[data-testid="status.2.statusName"]').type('Finished');

    cy.get('[data-testid="saveBoardButton"]').click();

    cy.get('[data-testid="column-1"]').should('contain', 'Not Started');
    cy.get('[data-testid="column-2"]').should('contain', 'In Progress');
    cy.get('[data-testid="column-3"]').should('contain', 'Finished');
    cy.get('[data-testid="board-header-name"]').should(
      'contain',
      'Moonspring Risen',
    );
  });

  it('should delete a board ', () => {
    cy.get('[data-testid="board-menu"]').click();
    cy.contains('Delete board').click();
    cy.get('[data-testid="deleteBoardBtn"]').click();

    cy.get('[data-testid="board-header-name"]').should(
      'not.be',
      'Plattform Launch',
    );
  });
});
