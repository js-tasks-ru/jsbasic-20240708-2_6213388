export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
    this.initEventListeners();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = 'slider';

    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 0%;"></div>
      <div class="slider__steps">
        ${'<span></span>'.repeat(this.steps)}
      </div>
    `;

    this.updateActiveStep();
  }

  updateActiveStep() {
    const steps = this.elem.querySelectorAll('.slider__steps span');
    steps.forEach(step => step.classList.remove('slider__step-active'));
    steps[this.value].classList.add('slider__step-active');
  }

  initEventListeners() {
    this.elem.addEventListener('click', (event) => this.onClick(event));

    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.addEventListener('pointerdown', (event) => this.onPointerDown(event));

    thumb.ondragstart = () => false; // Отключаем встроенный браузерный Drag-and-Drop
  }

  onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const value = Math.round(leftRelative * segments);

    this.setValue(value);
    this.generateChangeEvent();
  }

  onPointerDown(event) {
    event.preventDefault();

    const thumb = this.elem.querySelector('.slider__thumb');
    this.elem.classList.add('slider_dragging');

    const onPointerMove = (event) => {
      const left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      if (leftRelative < 0) leftRelative = 0;
      if (leftRelative > 1) leftRelative = 1;

      const leftPercents = leftRelative * 100;

      thumb.style.left = `${leftPercents}%`;
      this.elem.querySelector('.slider__progress').style.width = `${leftPercents}%`;

      const segments = this.steps - 1;
      const value = Math.round(leftRelative * segments);

      this.updateValueDisplay(value);
    };

    const onPointerUp = () => {
      const segments = this.steps - 1;
      const value = Math.round(parseFloat(thumb.style.left) / 100 * segments);

      this.setValue(value);
      this.generateChangeEvent();

      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

      this.elem.classList.remove('slider_dragging');
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }

  setValue(value) {
    this.value = value;
    const segments = this.steps - 1;
    const valuePercents = (value / segments) * 100;

    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;
    this.elem.querySelector('.slider__value').textContent = this.value;
    this.updateActiveStep();
  }

  updateValueDisplay(value) {
    this.elem.querySelector('.slider__value').textContent = value;
  }

  generateChangeEvent() {
    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }
}

