var goToWeekly = function(){
  window.location.href = './templates/weekly.html'
}

var goToDaily = function(){
  window.location.href = './templates/daily.html'
}

var goBackToMonthly = function(){
  window.location.href = '../index.html'
}

var goToAddEventPage = function(){
  window.location.href = './templates/addEvents.html'
}

var eventDetailDrawer = document.getElementById('eventDetailDrawer');
var drawerClose = document.getElementById('drawerClose');

var openDrawer = function(){
  eventDetailDrawer.style.transform = 'translateX(-100%)';
}

drawerClose.onclick = function() {
  eventDetailDrawer.style.transform = 'translateX(100%)';
}

var addEventModal = document.getElementById('myModal');
var addEventButton = document.getElementById('addEventButton');
var closeButtons = document.getElementsByClassName('close')[0];
var modalClose = document.getElementById('modalClose');

addEventButton.onclick = function() {
  addEventModal.style.display = 'block';
}

modalClose.onclick = function() {
  addEventModal.style.display = 'none';
}

addEventModal.onclick = function() {
  if(!$(event.target).is('.modal-content'))
  {
    addEventModal.style.display = 'none';
  }
}

var calendarTemplate = '';
var nowDate = new Date();
var nowMonth = nowDate.getMonth();
var nowDateNumber = nowDate.getDate();
var nowDay = nowDate.getDay();
var nowYear = nowDate.getFullYear();
var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentDateNumber = currentDate.getDate();
var currentDay = currentDate.getDay();
var currentYear = currentDate.getFullYear();
var monthNamesArray = new Array();

var decrementMonth = function (month, isDecrementingCurrentMonth) {
  if(month == 0){
    month = 11;
    currentYear--;
  }
  else{
    month--;
  }
  return month;
}

var incrementMonth = function (month, isIncrementingCurrentMonth) {
  if(month == 11){
    month = 0;
    currentYear++;
  }
  else{
    month++;
  }
  return month;
}

monthNamesArray[0] = 'January';
monthNamesArray[1] = 'February';
monthNamesArray[2] = 'March';
monthNamesArray[3] = 'April';
monthNamesArray[4] = 'May';
monthNamesArray[5] = 'June';
monthNamesArray[6] = 'July';
monthNamesArray[7] = 'August';
monthNamesArray[8] = 'September';
monthNamesArray[9] = 'October';
monthNamesArray[10] = 'November';
monthNamesArray[11] = 'December';
document.getElementById('captionText').textContent = monthNamesArray[currentMonth] + ' ' + currentYear;

var switchToPreviousMonth = function () {
  calendarTemplate = '';
  currentMonth = decrementMonth(currentMonth);
  generateMonthlyCalendar(currentMonth, currentYear)
  document.getElementById('captionText').textContent = monthNamesArray[currentMonth] + ' ' + currentYear;
}

var switchToNextMonth = function () {
  calendarTemplate = '';
  currentMonth = incrementMonth(currentMonth);
  generateMonthlyCalendar(currentMonth, currentYear);
  document.getElementById('captionText').textContent = monthNamesArray[currentMonth] + ' ' + currentYear;
}

var generateMonthlyCalendar = function(month, year){
  calendarTemplate = calendarTemplate + '<table class="table table-bordered" cellspacing="0" style="width:100%">';
  calendarTemplate = calendarTemplate + '<tr class="tableHeadingsRow"><th class="col-md-1"></th>';
  calendarTemplate = calendarTemplate + '<th>Sun</th><th>Mon</th><th>Tues</th><th>Wed</th><th>Thur</th><th>Fri</th><th>Sat</th></tr>';
  calendarTemplate = calendarTemplate + '<tr><td><button onClick="goToWeekly()">Week 1</button></td>';

  var dateObjectIndex = new Date(year, month, 1);
  var dayIndex = dateObjectIndex.getDay();
  var weekIndex = 1;
  var blankDayIndex;
  for(blankDayIndex = 0; blankDayIndex < dayIndex; blankDayIndex++){
    calendarTemplate = calendarTemplate + '<td></td>';
  }

  var monthIndex = month;
  var dateNumIndex = 1;
  for(dateNumIndex = 1; monthIndex == month; dateNumIndex++){
    dateObjectIndex = new Date(year, month, dateNumIndex);
    monthIndex = dateObjectIndex.getMonth();
    if(monthIndex == month){
      calendarTemplate = calendarTemplate + '<td onClick="openDrawer()">'+ dateNumIndex +'</td>';
      if(dayIndex < 6){
        dayIndex++;
      }
      else{
        weekIndex++;
        calendarTemplate = calendarTemplate + '</tr><tr><td><button onClick="goToWeekly()">Week '+weekIndex+'</button></td>';
        dayIndex = 0;
      }
    }
  }
  for(; dayIndex <= 6; dayIndex++){
    calendarTemplate = calendarTemplate + '<td></td>';
  }
  calendarTemplate = calendarTemplate + '</tr>';
  document.getElementById('calendarContent').innerHTML = calendarTemplate;
}
generateMonthlyCalendar(currentMonth, currentYear);
