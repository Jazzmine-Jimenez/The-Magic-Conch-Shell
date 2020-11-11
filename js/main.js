
var $mainPage = document.querySelector('.main-page');
var $activityPage = document.querySelector('.activity-page');
var $conchButton = document.querySelector('.conch-button');

$conchButton.addEventListener('click', function (event) {
  $mainPage.className = 'main-page hidden';
  $activityPage.className = 'activity-page';
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
  var hrElement = document.createElement('hr');

  // Title
  var activityTitle = document.createElement('h3');
  activityTitle.textContent = model.activity;
  hrElement.appendChild(activityTitle);

  // Difficulty Level
  var difficultyLevel = document.createElement('p');
  difficultyLevel.textContent = 'Difficulty: ';
  difficultyLevel.appendChild(circleLevel(model.accessibility));
  activityTitle.appendChild(difficultyLevel);

  // Category
  var category = document.createElement('p');
  category.textContent = 'Category: ' + model.type;
  difficultyLevel.appendChild(category);

  // Participants
  var participants = document.createElement('p');
  participants.textContent = 'Participants ';
  participants.appendChild(numOfParticipants(model.participants));
  category.appendChild(participants);

  return hrElement;
}

function circleLevel(decimal) {
  var circleSpan = document.createElement('span');
  var number = decimal * 10;
  for (var i = 0; i < number; i++) {
    var circleClosed = document.createElement('i');
    circleClosed.className = 'fas fa-search search-icon';
    circleSpan.appendChild(circleClosed);
  }
  for (var n = 10; n > number; n--) {
    var circleOpen = document.createElement('i');
    circleOpen.className = 'far fa-search search-icon';
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
