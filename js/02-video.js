import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player(document.getElementById('vimeo-player'));

player.on('timeupdate', throttle(async function(event) {
  const currentTime = await player.getCurrentTime();
  localStorage.setItem('videoplayer-current-time', currentTime);
}, 1000)); // оновлення не частіше, ніж раз на секунду

// Встановлення часу відтворення після перезавантаження сторінки
document.addEventListener('DOMContentLoaded', async function() {
  const storedTime = localStorage.getItem('videoplayer-current-time');
  if (storedTime !== null) {
    await player.setCurrentTime(parseFloat(storedTime));
  }
});
