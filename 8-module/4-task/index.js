import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    const existingCartItem = this.cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      existingCartItem.count += 1;
      this.onProductUpdate(existingCartItem);
    } else {
      const newCartItem = { product: product, count: 1 };
      this.cartItems.push(newCartItem);
      this.onProductUpdate(newCartItem);
    }
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(item => item.product.id === productId);

    if (cartItem) {
      cartItem.count += amount;

      if (cartItem.count === 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0);
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="product">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${count}</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>`);
  }

  renderOrderForm() {
    return createElement(`
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>
        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
          <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
          <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
        </div>
        <div class="cart-form__group">
          <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
        </div>
        <div class="cart-buttons">
          <div class="cart-buttons__buttons btn-group">
            <div class="cart-buttons__info">
              <span class="cart-buttons__info-text">total</span>
              <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
            </div>
            <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
          </div>
        </div>
      </form>`);
  }

  async renderModal() {
    const modal = new Modal();
    modal.setTitle('Your order');

    let modalBody = document.createElement('div');

    this.cartItems.forEach(item => {
      modalBody.append(this.renderProduct(item.product, item.count));
    });

    modalBody.append(this.renderOrderForm());
    modal.setBody(modalBody);

    modal.open();

    modalBody.addEventListener('click', async (event) => {
      if (event.target.closest('.cart-counter__button_plus')) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      }

      if (event.target.closest('.cart-counter__button_minus')) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      }
    });

    document.querySelector('.cart-form').addEventListener('submit', (event) => this.onSubmit(event));
  }

  async onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      let modalBody = document.querySelector('.modal__body');

      let productCount = modalBody?.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`);
      let productPrice = modalBody?.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`);
      let infoPrice = modalBody?.querySelector(`.cart-buttons__info-price`);

      if (cartItem.count === 0) {
        modalBody?.querySelector(`[data-product-id="${cartItem.product.id}"]`)?.remove();
      } else {
        if (productCount) productCount.innerHTML = cartItem.count;
        if (productPrice) productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
      }

      if (infoPrice) infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      if (this.isEmpty()) {
        document.querySelector('.modal')?.remove();
        document.body.classList.remove('is-modal-open');
      }
    }
  }


  async onSubmit(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const form = document.querySelector('.cart-form');
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.classList.add('is-loading'); // Добавляем класс is-loading

    const formData = new FormData(form); // Формируем данные для отправки

    try {
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const modal = document.querySelector('.modal');

        if (modal) {
          const modalTitle = modal.querySelector('.modal__title');
          const modalBody = modal.querySelector('.modal__body');

          if (modalTitle) {
            modalTitle.textContent = 'Success!';
          }

          if (modalBody) {
            modalBody.innerHTML = `
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `;
          }

          // Очищаем корзину и обновляем иконку корзины
          this.cartItems = [];
          this.cartIcon.update(this);
        }
      }
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    } finally {
      submitButton.classList.remove('is-loading'); // Убираем класс is-loading
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
