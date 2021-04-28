const categoryContainer = document.querySelector('.categoryContainer');
if (categoryContainer) {
  categoryContainer.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.className === 'button-category') {
      const categoryId = e.target.dataset.id;
      const response = await fetch('/fillyourorder') // отправляем fetch на получение оставшейся формы
      const result = await response.text(); // получаем html text для формы по оформлению заказа
      categoryContainer.innerHTML = result; // заменяем содержимое целиком
      document.querySelector('#categoryId').value = categoryId;
    }
  })
}
