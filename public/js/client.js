const categoryContainer = document.querySelector('#category-container');
const formContainer = document.querySelector('#form-container');

if (categoryContainer) {
  categoryContainer.addEventListener('click', async (e) => {
    e.preventDefault();
    if (e.target.className.includes('button-category')) {
      const categoryId = e.target.dataset.id;
      const categoryTitle = e.target.dataset.title;
      console.log('categoryId', categoryId);
      const response = await fetch('orders/fillyourorder'); // отправляем fetch на получение оставшейся формы
      const result = await response.text(); // получаем html text для формы по оформлению заказа

      formContainer.innerHTML = result;

      document.querySelector('#category').value = categoryTitle;
      document.querySelector('#category-id').value = categoryId;
    }
  });
}

// код для добавления отзыва на страницу к исполнителю
const form = document.querySelector('#forFeedback');
const fbContainer = document.querySelector('#feedbackContainer');
const paragrafFB = document.querySelector('#paragrafFB');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = document.querySelector('.hidden').value;
    const feedback = event.target.feedbackTextArea.value;
    const email = event.target.datamail.value;
    const rating = event.target.rating.value;
    const response = await fetch(`/executors/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, feedback, email, id }),
    });
    if (response.status === 200) {
      const result = await response.json();
      paragrafFB.style.visibility = ' inherit';
      const newParagraf = document.createElement('p');
      newParagraf.innerText += result.fbFromJson;
      fbContainer.appendChild(newParagraf);

      form.hidden = true;
    } else {
      console.log('erooor!', response.status);
    }
  });
}
