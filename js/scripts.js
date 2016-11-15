// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//
//     global.$ = require("jquery")(window);
// });
//
// require('bootstrap');

var goToWeekly = function(){
  window.location.href = "./templates/weekly.html"
}

var goToDaily = function(){
  window.location.href = "./templates/daily.html"
}

var goBackToMonthly = function(){
  window.location.href = "../index.html"
}

var goToAddEventPage = function(){
  window.location.href = "./templates/addEvents.html"
}

var eventDetailDrawer = document.getElementById('eventDetailDrawer');
var drawerClose = document.getElementById("drawerClose");

var openDrawer = function(){
  eventDetailDrawer.style.transform = 'translateX(-100%)';
}

drawerClose.onclick = function() {
  console.log("Clicked");
  eventDetailDrawer.style.transform = 'translateX(100%)';
}

var addEventModal = document.getElementById('myModal');
var addEventButton = document.getElementById("addEventButton");
var closeButtons = document.getElementsByClassName("close")[0];
var modalClose = document.getElementById("modalClose");

addEventButton.onclick = function() {
  addEventModal.style.display = "block";
}

modalClose.onclick = function() {
  addEventModal.style.display = "none";
}

addEventModal.onclick = function() {
  if(!$(event.target).is('.modal-content'))
  {
    addEventModal.style.display = "none";
  }
}



// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
