/// <reference types="Cypress" />

import { format } from 'date-fns';

context('Actions', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});

	it('Should render without crashing', () => {
		cy.get('.fc-toolbar').should('exist');
		cy.get('.fc-view').should('exist');
	});

	it('Should have updatable props', () => {
		cy.findByText('Sat').should('exist');
		cy.findByText('toggle weekends').click();
		cy.findByText('Sat').should('not.exist');
	});

	it('Should accept a callback', () => {
		const date = new Date();
		const formatedDate = format(date, 'yyyy-MM-dd');

		cy.get(`.fc-day[data-date=${formatedDate}]`).click();
		cy.findByText('New Event').should('exist');
	});

	it('Should expose an API', () => {
		cy.get('.fc-view').should('exist');
		cy.findByText('go to a date in the past').click();
		cy.findByText('January 2000').should('exist');
	});
});
