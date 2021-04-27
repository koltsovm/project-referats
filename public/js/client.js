const chooseCategory = document.querySelector('.categoryContainer');
if (chooseCategory) {
  chooseCategory.addEventListener('click', async (e) => {
    e.preventDefault();
    // const category = e.target категория которая была выбрана
    const response = await fetch('/fillyourorder') // отправляем fetch на получение оставшейся формы
    const result = await response.text(); // получаем html text для формы по оформлению заказа
    chooseCategory.innerHTML = result; // заменяем содержимое целиком
  })
}
