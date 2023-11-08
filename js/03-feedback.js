import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackKey = 'feedback-form-state';

// Функція для зберігання даних у локальне сховище
const saveToLocalStorage = throttle(() => {
  const data = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem(feedbackKey, JSON.stringify(data));
}, 500); // Оновлення не частіше, ніж раз на 500 мілісекунд

// Перевірка стану сховища при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem(feedbackKey);
  if (storedData) {
    const { email, message } = JSON.parse(storedData);
    emailInput.value = email;
    messageInput.value = message;
  }
});

// Відстеження події input і зберігання даних у локальне сховище
form.addEventListener('input', saveToLocalStorage);

// Обробка події сабміту форми
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const dataToSubmit = {
    email: emailInput.value,
    message: messageInput.value
  };

  // Очищення полів форми та сховища
  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem(feedbackKey);

  // Виведення даних у консоль
  console.log('Submitted Data:', dataToSubmit);
});

