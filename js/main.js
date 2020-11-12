var $homePage = document.querySelector('.home-page');
var $mainPage = document.querySelector('.main-page');
var $activityPage = document.querySelector('.activity-page');
var $levelPage = document.querySelector('.level-page');
var $startButton = document.querySelector('.get-started-button');
var $conchButton = document.querySelectorAll('.conch-button');
var $homeIcon = document.querySelectorAll('.go-home');
var $searchIcon = document.querySelectorAll('.go-search');
var $searchButton = document.querySelectorAll('.search-button');
var $levelButton = document.querySelector('.level-button');
var $activityList = document.querySelector('.activity-row');

$startButton.addEventListener('click', function (event) {
  $homePage.className = 'home-page hidden';
  $mainPage.className = 'main-page';
  $activityPage.className = 'activity-page hidden';
  $levelPage.className = 'level-page hidden';
  gsap.from($conchButton, { duration: 10, y: 40, x: 5, ease: 'bounce', scale: 1.5 });
});

document.addEventListener('click', function (event) {
  if (event.target === $conchButton[0]) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page';
    $levelPage.className = 'level-page hidden';
    $activityList.innerHTML = '';
    getBoredData('');
  }

  if (event.target === $conchButton[1]) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page';
    $levelPage.className = 'level-page hidden';
    $activityList.innerHTML = '';
    var $range = document.forms[0];
    var rangeInput = $range.elements.level.valueAsNumber;
    getBoredData('?accessibility=' + rangeInput);
  }

  if (event.target === $levelButton) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page hidden';
    $levelPage.className = 'level-page';
  }

  for (var i = 0; i < $searchButton.length; i++) {
    if (event.target === $searchButton[i]) {
      $homePage.className = 'home-page hidden';
      $mainPage.className = 'main-page';
      $activityPage.className = 'activity-page hidden';
      $levelPage.className = 'level-page hidden';
    }
  }
});

// ------Navbar Click Events-----------
document.addEventListener('click', function (event) {
  for (var i = 0; i < $searchIcon.length; i++) {
    if (event.target === $searchIcon[i]) {
      $homePage.className = 'home-page hidden';
      $mainPage.className = 'main-page';
      $activityPage.className = 'activity-page hidden';
      $levelPage.className = 'level-page hidden';
    }
    if (event.target === $homeIcon[i]) {
      $homePage.className = 'home-page';
      $mainPage.className = 'main-page hidden';
      $activityPage.className = 'activity-page hidden';
      $levelPage.className = 'level-page hidden';
    }
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
  var activityTitle = document.createElement('h2');
  activityTitle.className = 'activity-title';
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

  $activityList.appendChild(divElement);
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
