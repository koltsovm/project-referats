const categoryContainer = document.querySelector('#category-container');
// const body = document.querySelector('body');

// console.log('what is body', body)
// console.log('categoryC', categoryContainer);
if (categoryContainer) {
  categoryContainer.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.className === 'button-category') {
      console.log('e.target', e.target.className);
      const categoryId = e.target.dataset.id;
      console.log('categoryId', categoryId);
      const response = await fetch('orders/fillyourorder') // отправляем fetch на получение оставшейся формы
      const result = await response.text(); // получаем html text для формы по оформлению заказа
      console.log('result', result);
      console.log('categoryCont', categoryContainer);
      categoryContainer.innerHTML = result; // заменяем содержимое целиком
      document.querySelector('#categoryId').value = categoryId;
    }
  })
}
