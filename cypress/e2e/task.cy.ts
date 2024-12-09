/// <reference types="cypress" />

describe('task', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should edit a task', () => {
    cy.get('[data-testid="column-1"] [data-testid="task-1"]').first().click();
    cy.get("[data-testid='task-menu-trigger']").click();
    cy.contains(/edit task/i).click();

    cy.get('#task-title').clear();
    cy.get('#task-title').type('Build UI for onboarding flow V2');

    cy.get('#task-description').type(
      'this is a random text i copied from the internet wohooo',
    );

    cy.get('[data-testid="subTasks.1.subTask"]').clear();
    cy.get('[data-testid="subTasks.1.subTask"]').type(
      'Happy Birthday page for our Boss',
    );

    cy.get('[data-testid="subTasks.2.subTask"]').clear();
    cy.get('[data-testid="subTasks.2.subTask"]').type(
      'Authentication for our bros from sweden',
    );

    cy.get('[data-testid="submitTaskFormBtn"]').click();
  });

  it('should delete a task', () => {
    cy.get('[data-testid="column-1"] [data-testid="task-1"]').click();
    cy.get("[data-testid='task-menu-trigger']").click();
    cy.contains(/delete task/i).click();

    cy.get("[data-testid='deleteDialogBtn']").click();

    cy.get('[data-testid="column-1"] [data-testid="task-1"]')
      .contains('Build UI for onboarding flow')
      .should('not.exist');
  });
});
