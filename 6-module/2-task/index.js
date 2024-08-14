
import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {

  constructor(product) {
    this.product = product;
    this.elem = this._createCard();
    this._addEventListeners();
  }

  _createCard() {
    const { name, price, image } = this.product;
    const imgPath = `/assets/images/products/${image}`;

    const cardTemplate = `
      <div class="card">
        <div class="card__top">
          <img src="${imgPath}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div> `;

    return createElement(cardTemplate);
  }
  _addEventListeners() {
    const button = this.elem.querySelector('.card__button');
    button.addEventListener('click', () => this._onAddButtonClick());
  }
  _onAddButtonClick() {
    const event = new CustomEvent('product-add', {
      detail: this.product.id,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }
}
