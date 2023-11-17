import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player(document.getElementById('vimeo-player'));

player.on('timeupdate', throttle(function (event) {
  const currentTime = player.getCurrentTime().then((time) => {
    localStorage.setItem('videoplayer-current-time', time);
  });
}, 1000)); // оновлення не частіше, ніж раз на секунду

// Встановлення часу відтворення після перезавантаження сторінки
document.addEventListener('DOMContentLoaded', function () {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime !== null) {
    player.setCurrentTime(parseFloat(storedTime));
  }
});
