const categoryContainer = document.querySelector('.categoryContainer');
if (categoryContainer) {
  categoryContainer.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.className.includes('button-category')) {
      const categoryId = e.target.dataset.id;
      const response = await fetch('/fillyourorder'); // отправляем fetch на получение оставшейся формы
      const result = await response.text(); // получаем html text для формы по оформлению заказа
      categoryContainer.innerHTML = result; // заменяем содержимое целиком
      document.querySelector('#categoryId').value = categoryId;
    }
  });
}

// код для добавления отзыва на страницу к исполнителю
const form = document.querySelector('#forFeedback');
const feedbackTextArea = document.querySelector('.feedbackTextArea');
const buttonFeedback = document.querySelector('.buttonFeedback');
const fbContainer = document.querySelector('#feedbackCantainer');
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
      form.style.visibility = 'hidden';
    } else {
      console.log('erooor!', response.status);
    }
  });
}
