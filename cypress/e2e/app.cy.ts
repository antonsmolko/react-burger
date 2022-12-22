import { API_INGREDIENTS_URL, API_ORDERS_URL, AUTH_USER_URL } from '../../src/config';

const ITEM_LIST_SELECTOR = '.item-list';
const DRAG_ITEM_BUN_SELECTOR = '[data-testid=drag-item-bun-0]';
const MODAL_ROOT_SELECTOR = '#modal-root';
const INGREDIENT_DETAILS_SELECTOR = `${MODAL_ROOT_SELECTOR} [data-testid=ingredient-details]`;
const ORDER_DRAG_ITEM_FIRST_SELECTOR = '[data-testid=order-drag-item-0]';
const ORDER_DRAG_ITEM_SECOND_SELECTOR = '[data-testid=order-drag-item-1]';
const DRAG_ITEM_MAIN_SELECTOR_BASE = 'data-testid=drag-item-main';

beforeEach(() => {
  cy.viewport(1920, 1080);
  cy.visit('/');

  cy.fixture('user-response.json').then((response) => {
    cy.intercept('GET', AUTH_USER_URL, response);
  });

  cy.fixture('ingredients-response.json').then((response) => {
    cy.intercept('GET', API_INGREDIENTS_URL, response);
  });
});
describe('dnd is work', () => {
  it('should be dnd item-list to constructor', () => {
    cy.get(DRAG_ITEM_BUN_SELECTOR)
      .trigger('dragstart')
      .trigger('dragleave');
    cy.get(ITEM_LIST_SELECTOR)
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.get(`[${DRAG_ITEM_MAIN_SELECTOR_BASE}-1]`)
      .trigger('dragstart')
      .trigger('dragleave');
    cy.get(ITEM_LIST_SELECTOR)
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend');

    cy.get(ITEM_LIST_SELECTOR).find(ORDER_DRAG_ITEM_FIRST_SELECTOR);
  });

  it('should be dnd into constructor', () => {
    cy.wrap([0, 1]).each((index) => {
      cy.get(`[${DRAG_ITEM_MAIN_SELECTOR_BASE}-${index}]`)
        .trigger('dragstart')
        .trigger('dragleave');
      cy.get(ITEM_LIST_SELECTOR)
        .trigger('dragenter')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend');
    });

    cy.get(ORDER_DRAG_ITEM_FIRST_SELECTOR)
      .invoke('text')
      .then((text) => {
        const firstElementTitle = text;

        cy.get(ORDER_DRAG_ITEM_SECOND_SELECTOR)
          .trigger('dragstart')
          .trigger('dragleave');
        cy.get(ORDER_DRAG_ITEM_FIRST_SELECTOR)
          .trigger('dragenter')
          .trigger('dragover')
          .trigger('drop')
          .trigger('dragend');

        cy.get(ORDER_DRAG_ITEM_SECOND_SELECTOR)
          .invoke('text')
          .then(text => {
            expect(text).to.include(firstElementTitle);
          });
      });
  });
});

describe('modal is work', () => {
  it('should be modal open', () => {
    cy.get(`${DRAG_ITEM_BUN_SELECTOR} p`)
      .invoke('text')
      .then((text) => {
        const modalText = text;

        cy.get(DRAG_ITEM_BUN_SELECTOR).click();

        cy.get(INGREDIENT_DETAILS_SELECTOR)
          .invoke('text')
          .then((text) => {
            expect(text).to.include(modalText);
          });
      });
  });

  it('should be modal close', () => {
    cy.get(DRAG_ITEM_BUN_SELECTOR).click();
    cy.get(INGREDIENT_DETAILS_SELECTOR);
    cy.get(`${MODAL_ROOT_SELECTOR} [data-testid=modal-close] > svg`).click();
    cy.get(INGREDIENT_DETAILS_SELECTOR).should('not.exist');
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
      cy.get(ITEM_LIST_SELECTOR)
        .trigger('dragenter')
        .trigger('dragover')
        .trigger('drop')
        .trigger('dragend');
    });

    cy.fixture('order-response.json').then((response) => {
      const { order } = response;
      cy.intercept('POST', API_ORDERS_URL, response);

      cy.get('[data-testid=order-form] button').click();

      cy.get(`${MODAL_ROOT_SELECTOR} [data-testid=order-details-number`).invoke('text').then((text) => {
        expect(text).to.include(order.number);
      });
    });
  });
});

export {};
