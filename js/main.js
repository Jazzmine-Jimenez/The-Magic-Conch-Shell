
var $startButton = document.querySelector('.get-started-button');
var $homePage = document.querySelector('.home-page');
var $mainPage = document.querySelector('.main-page');
var $activityPage = document.querySelector('.activity-page');
var $conchButton = document.querySelector('.conch-button');
var $activityList = document.querySelector('.activity-row');
var $homeIcon = document.querySelectorAll('.go-home');
var $searchIcon = document.querySelectorAll('.go-search');

$startButton.addEventListener('click', function (event) {
  $homePage.className = 'home-page hidden';
  $mainPage.className = 'main-page';
  $activityPage.className = 'activity-page hidden';

});

$conchButton.addEventListener('click', function (event) {
  $homePage.className = 'home-page hidden';
  $mainPage.className = 'main-page hidden';
  $activityPage.className = 'activity-page';
  getBoredData('');
  getBoredData('');
  getBoredData('');
});

document.addEventListener('click', function (event) {
  if (event.target === $searchIcon[1]) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page';
    $activityPage.className = 'activity-page hidden';
  }
  if (event.target === $homeIcon[0]) {
    $homePage.className = 'home-page';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page hidden';
  }
  if (event.target === $homeIcon[1]) {
    $homePage.className = 'home-page';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page hidden';
  }

});

function getBoredData(name) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://www.boredapi.com/api/activity/' + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    renderingActivities(xhr.response);
  });
  xhr.send();
}

function renderingActivities(model) {
  var divElement = document.createElement('div');

  // Title
  var activityTitle = document.createElement('h3');
  activityTitle.textContent = model.activity;
  divElement.appendChild(activityTitle);

  // Difficulty Level
  var difficultyLevel = document.createElement('p');
  difficultyLevel.className = 'activity-description';
  difficultyLevel.textContent = 'Difficulty: ';
  difficultyLevel.appendChild(circleLevel(model.accessibility));
  activityTitle.appendChild(difficultyLevel);

  // Category
  var category = document.createElement('p');
  category.className = 'activity-description';
  category.textContent = 'Category: ' + model.type;
  difficultyLevel.appendChild(category);

  // Participants
  var participants = document.createElement('p');
  participants.className = 'activity-description';
  participants.textContent = 'Participants needed: ';
  participants.appendChild(numOfParticipants(model.participants));
  category.appendChild(participants);

  var hrElement = document.createElement('hr');
  divElement.appendChild(hrElement);

  $activityList.appendChild(divElement);

  return divElement;
}

function circleLevel(decimal) {
  var circleSpan = document.createElement('span');
  var number = decimal * 10;
  for (var i = 0; i < number; i++) {
    var circleClosed = document.createElement('i');
    circleClosed.className = 'fas fa-circle';
    circleSpan.appendChild(circleClosed);
  }
  for (var n = 10; n > number; n--) {
    var circleOpen = document.createElement('i');
    circleOpen.className = 'far fa-circle';
    circleSpan.appendChild(circleOpen);
  }
  return circleSpan;
}

function numOfParticipants(number) {
  var personSpan = document.createElement('span');
  var i = 0;
  while (i < number) {
    var personIcon = document.createElement('i');
    personIcon.className = 'fas fa-user';
    personSpan.appendChild(personIcon);
    i++;
  }
  return personSpan;
}
