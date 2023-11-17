import throttle from 'lodash/throttle'; // Змінила шлях для lodash

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const feedbackKey = 'feedback-form-state';

const saveToLocalStorage = throttle(() => {
  const data = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem(feedbackKey, JSON.stringify(data));
}, 500);

document.addEventListener('DOMContentLoaded', () => {
  const storedData = localStorage.getItem(feedbackKey);
  if (storedData) {
    const { email, message } = JSON.parse(storedData);
    emailInput.value = email;
    messageInput.value = message;
  }
});

form.addEventListener('input', saveToLocalStorage);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const dataToSubmit = {
    email: emailInput.value,
    message: messageInput.value
  };

  emailInput.value = '';
  messageInput.value = '';
  localStorage.removeItem(feedbackKey);

  console.log('Submitted Data:', dataToSubmit);
});

