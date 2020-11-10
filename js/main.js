
const $mainPage = document.querySelector('.main-page');
const $activityPage = document.querySelector('.activity-page');
const $conchButton = document.querySelector('.conch-button');

$conchButton.addEventListener('click', function (event) {
  $mainPage.className = 'main-page hidden';
  $activityPage.className = 'activity-page';
});
