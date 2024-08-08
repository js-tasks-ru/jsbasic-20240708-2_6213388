function toggleText() {
  let buttonText = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  buttonText.addEventListener('click', (event) => {
    text.hidden = !text.hidden;
  });
}
