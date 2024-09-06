import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');

    this.innerElem = document.createElement('div');
    this.innerElem.classList.add('products-grid__inner');
    this.elem.append(this.innerElem);

    this.updateGrid();
  }

  updateGrid() {
    this.innerElem.innerHTML = '';

    for (let product of this.products) {
      if (this.isProductFiltered(product)) {
        let productCard = new ProductCard(product);
        this.innerElem.append(productCard.elem);
      }
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.updateGrid();
  }

  isProductFiltered(product) {
    if (this.filters.noNuts && product.nuts) {
      return false;
    }

    if (this.filters.vegeterianOnly && !product.vegeterian) {
      return false;
    }

    if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) {
      return false;
    }

    if (this.filters.category && product.category !== this.filters.category) {
      return false;
    }

    return true;
  }
}

