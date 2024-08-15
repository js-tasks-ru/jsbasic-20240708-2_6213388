import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this._createRibbonMenu();
    this._initEventListeners();
  }

  _createRibbonMenu() {
    const ribbonItems = this.categories.map(category => {
      return `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`;
    }).join('');

    const ribbonTemplate = `
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </button>
        <div class="ribbon__inner">
          ${ribbonItems}
        </div>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `;

    return createElement(ribbonTemplate);
  }

  _initEventListeners() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    const rightArrow = this.elem.querySelector('.ribbon__arrow_right');

    rightArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    leftArrow.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = ribbonInner.scrollLeft;
      let scrollWidth = ribbonInner.scrollWidth;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        leftArrow.classList.remove('ribbon__arrow_visible');
      } else {
        leftArrow.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        rightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        rightArrow.classList.add('ribbon__arrow_visible');
      }
    });

    this.elem.querySelectorAll('.ribbon__item').forEach(item => {
      item.addEventListener('click', (event) => {
        event.preventDefault();

        this.elem.querySelector('.ribbon__item_active')?.classList.remove('ribbon__item_active');

        item.classList.add('ribbon__item_active');

        const customEvent = new CustomEvent('ribbon-select', {
          detail: item.dataset.id,
          bubbles: true
        });
        this.elem.dispatchEvent(customEvent);
      });
    });
  }
}

