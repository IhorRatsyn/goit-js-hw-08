import throttle from 'lodash.throttle';

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  // Відстеження події input і збереження значень у локальному сховищі
  form.addEventListener('input', throttle(function () {
    const formData = {
      email: emailInput.value,
      message: messageInput.value
    };

    // Зберігання у локальному сховищі
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }, 500)); // Використання lodash.throttle для оновлення не частіше, ніж раз на 500 мілісекунд

  // Перевірка та заповнення форми при завантаженні сторінки
  const storedFormData = localStorage.getItem('feedback-form-state');

  if (storedFormData) {
    const parsedData = JSON.parse(storedFormData);
    emailInput.value = parsedData.email;
    messageInput.value = parsedData.message;
  }

  // Очищення сховища та виведення даних при сабміті форми
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
      email: emailInput.value,
      message: messageInput.value
    };

    // Очищення локального сховища
    localStorage.removeItem('feedback-form-state');

    // Виведення у консоль об'єкта з полями email та message та їхніми значеннями
    console.log(formData);

    // Очищення полів форми
    emailInput.value = '';
    messageInput.value = '';
  });
});

