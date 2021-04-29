const customer = document.getElementById('flexRadioDefault1');
const executor = document.getElementById('flexRadioDefault2');
const categoriesBlock = document.getElementById('categories');
const submitButton = document.getElementById('submitButton');
const passwordArea = document.getElementById('password');
const repeatPasswordArea = document.getElementById('passwordRepeat');
const passwordError = document.getElementById('passwordError');
const aboutBlock = document.getElementById('aboutBlock');

submitButton.addEventListener('click', (event) => {
  if (passwordArea.value !== repeatPasswordArea.value) {
    event.preventDefault();
    passwordError.hidden = false;
  }
});

customer.addEventListener('click', () => {
  categoriesBlock.hidden = true;
  aboutBlock.hidden = true;
});

executor.addEventListener('click', () => {
  categoriesBlock.hidden = false;
  aboutBlock.hidden = false;
});
