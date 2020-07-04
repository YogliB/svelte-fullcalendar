/// <reference types="Cypress" />

context('Actions', () => {
	beforeEach(() => {
		cy.visit('http://localhost:5000');
	});

	it('Should render without crashing', () => {
		cy.get('.fc-toolbar').should('exist');
		cy.get('.fc-view-harness').should('exist');
	});

	it('Should have updatable props', () => {
		cy.findByText('Sat').should('exist');
		cy.findByText('toggle weekends').click();
		cy.findByText('Sat').should('not.exist');
	});

	it('Should expose an API', () => {
		cy.findByText('go to a date in the past').click();
		cy.findByText('January 2000').should('exist');
	});
});
