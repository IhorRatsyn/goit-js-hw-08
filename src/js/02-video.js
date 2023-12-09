import { Player } from '@vimeo/player';
import throttle from 'lodash.throttle';

document.addEventListener("DOMContentLoaded", function () {
  // Отримання елемента iframe
  const iframe = document.getElementById('vimeo-player');

  // Ініціалізація Vimeo Player
  const vimeoPlayer = new Player(iframe);

  // Отримання поточного часу відтворення з локального сховища
  const savedTime = localStorage.getItem('videoplayer-current-time');

  // Перевірка, чи є збережений час відтворення
  if (savedTime) {
    // Встановлення збереженого часу відтворення
    vimeoPlayer.setCurrentTime(parseFloat(savedTime));
  }

  // Встановлення обробника події для відстеження оновлення часу відтворення
  vimeoPlayer.on('timeupdate', throttle(function(event) {
    // Оновлення часу в локальному сховищі
    localStorage.setItem('videoplayer-current-time', event.seconds.toString());
  }, 1000)); // Використання lodash.throttle для оновлення не частіше, ніж раз на секунду
});

