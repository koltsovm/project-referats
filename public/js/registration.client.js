const customer = document.getElementById('flexRadioDefault1');
const executor = document.getElementById('flexRadioDefault2');
const categoriesBlock = document.getElementById('categories');
const submitButton = document.getElementById('submitButton');
const passwordArea = document.getElementById('password');
const repeatPasswordArea = document.getElementById('passwordRepeat');
const passwordError = document.getElementById('passwordError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const aboutBlock = document.getElementById('aboutBlock');
const inputEmail = document.getElementById('exampleInputEmail1');
const inputPhone = document.getElementById('exampleInputPhone');

submitButton.addEventListener('click', (event) => {
  if (passwordArea.value !== repeatPasswordArea.value) {
    event.preventDefault();
    passwordError.hidden = false;
  }

  // Валидация E-mail
  const regExEmail = /^[\w]{1}[\w\.]*@[\w-]+\.[a-z]{2,4}$/gm;
  const validEmail = regExEmail.test(inputEmail.value);
  if (!validEmail) {
    event.preventDefault();
    emailError.hidden = false;
  }

  if (validEmail) {
    emailError.hidden = true;
  }

  // Валидация номера телефона
  const regExPhone = /^\d[\d\(\)\ -]{4,14}\d$/;
  const validPhone = regExPhone.test(inputPhone.value);
  if (!validPhone) {
    event.preventDefault();
    phoneError.hidden = false;
  }

  if (validPhone) {
    phoneError.hidden = true;
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
