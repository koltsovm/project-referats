const categoryContainer = document.querySelector('#category-container');
const formContainer = document.querySelector('#form-container');
// const body = document.querySelector('body');

// console.log('what is body', body)
// console.log('categoryC', categoryContainer);
if (categoryContainer) {
  const contEvent = categoryContainer.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.className.includes('button-category')) {
      const categoryId = e.target.dataset.id;
      const categoryTitle = e.target.dataset.title;
      console.log('categoryId', categoryId);
      const response = await fetch('orders/fillyourorder'); // отправляем fetch на получение оставшейся формы
      const result = await response.text(); // получаем html text для формы по оформлению заказа
      // categoryContainer.removeEventListener('click', contEvent);
      // categoryContainer.innerHTML = null; // заменяем содержимое целиком
      // e.stopPropagation();
      formContainer.innerHTML = result;

      document.querySelector('#category').value = categoryTitle;
      document.querySelector('#category-id').value = categoryId;
      // document.querySelector('#category-id').name = categoryTitle
    }
  });
}

// код для добавления отзыва на страницу к исполнителю
const form = document.querySelector('#forFeedback');
const feedbackTextArea = document.querySelector('.feedbackTextArea');
const buttonFeedback = document.querySelector('.buttonFeedback');
const fbContainer = document.querySelector('#feedbackContainer');
const paragrafFB = document.querySelector('#paragrafFB');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.querySelector('.hidden').value;
    const feedback = event.target.feedbackTextArea.value;
    const email = event.target.datamail.value;
    const rating = event.target.rating.value;
    // console.log(email);
    const response = await fetch(`/executors/${id}`, { // вытащить юзернейм
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, feedback, email, id }),
    });
    console.log('response +++++++', response);
    if (response.status === 200) {
      const result = await response.json();
      console.log('result client ------->', result);
      paragrafFB.style.visibility = ' inherit';
      const newParagraf = document.createElement('p');
      newParagraf.innerText += result.fbFromJson;
      fbContainer.appendChild(newParagraf);
      // fbContainer.innerText += result;
      // form.style.visibility = 'hidden';
      form.hidden = true;
    } else {
      console.log('erooor!', response.status);
    }
  });
}
