const customer = document.getElementById('flexRadioDefault1');
const executor = document.getElementById('flexRadioDefault2');
const categoriesBlock = document.getElementById('categories');
const submitButton = document.getElementById('submitButton');
const passwordArea = document.getElementById('password');
const repeatPasswordArea = document.getElementById('passwordRepeat');
const passwordError = document.getElementById('passwordError');
const aboutBlock = document.getElementById('aboutBlock');

function validEmail() {
  const regExEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  const inputEmail = document.getElementById('exampleInputEmail1').value;
  const valid = regExEmail.test(inputEmail);
  if (valid) output = 'Адрес эл. почты введен правильно';
  else output = 'Адрес электронной почты введен неправильно!';
  document.getElementById('messageForFalseEmail').innerText = output;
  return valid;
}

function validPhone() {
  const regExPhone = /^\d[\d\(\)\ -]{4,14}\d$/;
  const inputPhone = document.getElementById('exampleInputPhone').value;
  const valid = regExPhone.test(inputPhone);
  if (valid) output = 'Номер телефона введен правильно';
  else output = 'Номер телефона введен неправильно!';
  document.getElementById('messageForFalsePhone').innerText = output;
  return valid;
}

submitButton.addEventListener('click', (event) => {
  validEmail();
  validPhone();
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
