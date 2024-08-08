

function initCarousel() {
  let carousel = document.querySelector('.carousel__inner');
  let carouselItems = document.querySelectorAll('.carousel__slide');
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let currentIndex = 0;
  let totalItems = carouselItems.length;

  leftArrow.style.display = 'none';
  const slideWidth = carousel.clientWidth;

  rightArrow.addEventListener('click', (event) => {

    currentIndex++;
    let offset = -slideWidth * currentIndex;
    carousel.style.transform = `translateX(${offset}px)`;
    if (currentIndex === totalItems - 1) {
      rightArrow.style.display = 'none';
    }
    if (currentIndex > 0) {
      leftArrow.style.display = '';
    }

  });

  leftArrow.addEventListener('click', (event) => {
    currentIndex--;
    let offset = -slideWidth * currentIndex;
    carousel.style.transform = `translateX(${offset}px)`;

    if (currentIndex === 0) {
      leftArrow.style.display = 'none';
    }
    if (currentIndex < totalItems - 1) {
      rightArrow.style.display = '';
    }
  });

}

