import { API_INGREDIENTS_URL, API_ORDERS_URL, AUTH_USER_URL } from '../../src/config';

beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit('http://localhost:3000');

  cy.fixture('user-response.json').then((response) => {
    cy.intercept('GET', AUTH_USER_URL, response);
  });

  cy.fixture('ingredients-response.json').then((response) => {
    cy.intercept('GET', API_INGREDIENTS_URL, response);
  });
});
describe('dnd is work', () => {
  it('should be dnd item-list to constructor', () => {
    cy.get('[data-testid=drag-item-bun-0]')
      .trigger('dragstart')
      .trigger('dragleave');
    cy.get('.item-list')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.get('[data-testid=drag-item-main-1]')
      .trigger('dragstart')
      .trigger('dragleave');
    cy.get('.item-list')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.get('.item-list').find('[data-testid=order-drag-item-0]');
  });

  it('should be dnd into constructor', () => {
    cy.wrap([0, 1]).each((index) => {
      cy.get(`[data-testid=drag-item-main-${index}]`)
        .trigger('dragstart')
        .trigger('dragleave');
      cy.get('.item-list')
        .trigger('dragenter')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend');
    });

    cy.get('.item-list [data-testid=order-drag-item-0]')
      .invoke('text')
      .then((text) => {
        const firstElementTitle = text;

        cy.get('.item-list [data-testid=order-drag-item-1]')
          .trigger('dragstart')
          .trigger('dragleave');
        cy.get('.item-list [data-testid=order-drag-item-0]')
          .trigger('dragenter')
          .trigger('dragover')
          .trigger('drop')
          .trigger('dragend');

        cy.get('.item-list [data-testid=order-drag-item-1]')
          .invoke('text')
          .then(text => {
            expect(text).to.include(firstElementTitle);
          });
      });
  });
});

describe('modal is work', () => {
  it('should be modal open', () => {
    const selector = '[data-testid=drag-item-bun-0]';

    cy.get(`${selector} p`)
      .invoke('text')
      .then((text) => {
        const modalText = text;

        cy.get(selector).click();

        cy.get('#modal-root [data-testid=ingredient-details')
          .invoke('text')
          .then((text) => {
            expect(text).to.include(modalText);
          });
      });
  });

  it('should be modal close', () => {
    cy.get('[data-testid=drag-item-bun-0]').click();
    cy.get('#modal-root [data-testid=ingredient-details');
    cy.get('#modal-root [data-testid=modal-close] > svg').click();
    cy.get('#modal-root [data-testid=ingredient-details').should('not.exist');
  });
});

describe('order process is work', () => {
  it('should be order create', () => {
    cy.wrap([
      ['bun', 0],
      ['sauce', 1],
      ['sauce', 1],
      ['main', 1],
      ['main', 3],
      ['main', 1],
    ]
    ).each((item) => {
      cy.get(`[data-testid=drag-item-${item[0]}-${item[1]}]`)
        .trigger('dragstart')
        .trigger('dragleave');
      cy.get('.item-list')
        .trigger('dragenter')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend');
    });

    cy.fixture('order-response.json').then((response) => {
      const { order } = response;
      cy.intercept('POST', API_ORDERS_URL, response);

      cy.get('[data-testid=order-form] button').click();

      cy.get('#modal-root [data-testid=order-details-number').invoke('text').then((text) => {
        expect(text).to.include(order.number);
      });
    });
  });
});

export {};
