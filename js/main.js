var $homePage = document.querySelector('.home-page');
var $mainPage = document.querySelector('.main-page');
var $activityPage = document.querySelector('.activity-page');
var $levelPage = document.querySelector('.level-page');
var $categoryPage = document.querySelector('.category-page');
var $participantsPage = document.querySelector('.participants-page');
var $startButton = document.querySelector('.get-started-button');
var $conchButton = document.querySelectorAll('.conch-button');
var $homeIcon = document.querySelector('.go-home');
var $searchIcon = document.querySelector('.go-search');
var $searchButton = document.querySelectorAll('.search-button');
var $levelButton = document.querySelector('.level-button');
var $categoryButton = document.querySelector('.categories-button');
var $participantsButton = document.querySelector('.participants-button');
var $activityList = document.querySelector('.activity-row');

$startButton.addEventListener('click', function (event) {
  $homePage.className = 'home-page hidden';
  $mainPage.className = 'main-page';
  $activityPage.className = 'activity-page hidden';
  $levelPage.className = 'level-page hidden';
  $participantsPage.className = 'participants-page hidden';
  gsap.from($conchButton, { duration: 10, y: 30, x: 5, ease: 'bounce', scale: 1.3 });
});

document.addEventListener('click', function (event) {
  if (event.target === $searchIcon) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page';
    $activityPage.className = 'activity-page hidden';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page hidden';
  } else if (event.target === $homeIcon) {
    $homePage.className = 'home-page';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page hidden';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page hidden';
  } else if (event.target === $conchButton[0]) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page hidden';
    $activityList.innerHTML = '';
    getBoredData('');
  } else if (event.target === $conchButton[1]) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page hidden';
    $activityList.innerHTML = '';
    var $range = document.forms[0];
    var rangeInput = $range.elements.level.valueAsNumber;
    getBoredData('?accessibility=' + rangeInput);
  } else if (event.target === $conchButton[2]) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page hidden';
    $activityList.innerHTML = '';
    var $category = document.forms[1];
    var categoryInput = $category.elements.category.value;
    getBoredData('?type=' + categoryInput);
  } else if (event.target === $conchButton[3]) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page hidden';
    $activityList.innerHTML = '';
    var $participants = document.forms[2];
    var participantsInput = $participants.elements.participants.value;
    getBoredData('?participants=' + participantsInput);
  } else if (event.target === $levelButton) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page hidden';
    $levelPage.className = 'level-page';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page hidden';
  } else if (event.target === $categoryButton) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page hidden';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page';
    $participantsPage.className = 'participants-page hidden';
  } else if (event.target === $participantsButton) {
    $homePage.className = 'home-page hidden';
    $mainPage.className = 'main-page hidden';
    $activityPage.className = 'activity-page hidden';
    $levelPage.className = 'level-page hidden';
    $categoryPage.className = 'category-page hidden';
    $participantsPage.className = 'participants-page';
  }

  for (var n = 0; n < $searchButton.length; n++) {
    if (event.target === $searchButton[n]) {
      $homePage.className = 'home-page hidden';
      $mainPage.className = 'main-page';
      $activityPage.className = 'activity-page hidden';
      $levelPage.className = 'level-page hidden';
      $categoryPage.className = 'category-page hidden';
      $participantsPage.className = 'participants-page hidden';
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
