import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime)).catch(error => {
    console.error('Помилка відновлення часу:', error);
  });
}
player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem(STORAGE_KEY, data.seconds);
  }, 1000)
);
