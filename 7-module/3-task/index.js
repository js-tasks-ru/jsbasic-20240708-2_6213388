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
  }

  onClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    const value = Math.round(leftRelative * segments);

    this.value = value;

    const valuePercents = (value / segments) * 100;

    this.elem.querySelector('.slider__thumb').style.left = `${valuePercents}%`;
    this.elem.querySelector('.slider__progress').style.width = `${valuePercents}%`;

    this.elem.querySelector('.slider__value').textContent = this.value;
    this.updateActiveStep();

    const customEvent = new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }
}

