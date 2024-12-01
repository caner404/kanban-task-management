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

    cy.get('[data-testid="column-1"]').contains('Not Started');
    cy.get('[data-testid="column-2"]').contains('In Progress');
    cy.get('[data-testid="column-3"]').contains('Finished');
    cy.get('[data-testid="board-header-name"]').contains('Moonspring Risen');
  });
});
