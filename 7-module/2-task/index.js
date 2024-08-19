import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.initEventListeners();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('modal');
    this.elem.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    `;
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
    document.removeEventListener('keydown', this.handleEscClose);
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    const body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.appendChild(node);
  }

  initEventListeners() {
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());

    this.handleEscClose = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    };
    document.addEventListener('keydown', this.handleEscClose);
  }
}

