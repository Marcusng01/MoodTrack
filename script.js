const day = ["Sun","Mon", "Tue", "Wed","Thu","Fri","Sat"];
var months = ["January", "February", "March", "April", "May",
  "June", "July", "August", "September", "October", "November", "December"];
var colors = ["rgb(241, 212, 212)","rgb(184, 9, 207)","rgb(86, 115, 248)",
"rgb(253, 215, 75)","rgb(253, 66, 100)","rgb(58, 58, 68)","rgb(212, 212, 212)"];
const d = new Date();

var monthIndex = d.getMonth();
var year = d.getFullYear();

const header = document.querySelector(".header");
const headerCurrentDate = header.querySelector("p");
headerCurrentDate.textContent = d.toDateString();

const headerMonth = header.querySelector("h1");
headerMonth.textContent = months[monthIndex];

const headerYear = header.querySelector("h5");
headerYear.textContent = year;

const dates = document.querySelector(".dates");

function greyDatesFront(month,year){
  const tempDate = new Date();
  tempDate.setMonth(month);
  tempDate.setFullYear(year);
  tempDate.setDate(1);
  firstDay = tempDate.getDay();
  if (firstDay == 0)
    firstDay = 7;
  tempDate.setDate(0);
  lastDate = tempDate.getDate();
  var i;
  for ( i= lastDate - firstDay + 2  ; i<= lastDate ; i++){
    var div = document.createElement("div");
    div.innerText = i;
    div.style.color = "grey";
    dates.append(div);
  }
}
greyDatesFront(monthIndex,year);

function currentDatesMiddle(month,year){
  const tempDate = new Date();
  tempDate.setMonth(month);
  tempDate.setFullYear(year);
  if(month != 11){
    tempDate.setMonth(month+1);
  }
  else{
    tempDate.setFullYear(year)
    tempDate.setMonth(0);
  }
  tempDate.setDate(0);
  lastDate = tempDate.getDate();
  var i;
  for ( i= 1  ; i<= lastDate ; i++){
    var div = document.createElement("div");
    div.innerHTML = i;
    var dateKey = i.toString()+monthIndex+year;
    savedBackgroundColor = localStorage.getItem(dateKey);
    if(savedBackgroundColor==null)
      div.style.backgroundColor = colors[0];
    else
      div.style.backgroundColor = colors[localStorage.getItem(dateKey)];
    console.log(div);
    dates.append(div);
    
  }
}
currentDatesMiddle(monthIndex,year);

function greyDatesBack(month,year){
  const tempDate = new Date();
  tempDate.setMonth(month);
  tempDate.setFullYear(year);

  tempDate.setDate(1);
  firstDay = tempDate.getDay();
  if (firstDay == 0) 
    firstDay = 7;
  if(month != 11){
    tempDate.setMonth(month+1);
  }
  else{
    tempDate.setFullYear(year)
    tempDate.setMonth(0);
  }
  tempDate.setDate(0);
  lastDate = tempDate.getDate();

  var i;
  for ( i= 1  ; i<= 43 - firstDay - lastDate ; i++){
    var div = document.createElement("div");
    div.innerText = i;
    div.style.color = "grey";
    dates.append(div);
  }
}
greyDatesBack(monthIndex,year);

function moodTrack(){
  var div = document.querySelector(".dates").querySelectorAll("div");
  var i;
  for(i=0;i<42;i++)
  {
    div[i].addEventListener("click", e=>{
      var j;
      for( j=0 ; j<7 ; j++){
        if (e.target.style.backgroundColor == colors[j])
          break
      }
      if(j==6)
        j=-1;
      var dateDiv = e.target;
      dateDiv.style.backgroundColor = colors[j+1];
      var dateKey = dateDiv.textContent+monthIndex+year;
      localStorage.setItem(dateKey,j+1);
      if(j+1==0)
        localStorage.removeItem(dateKey);
    })
    div[i].addEventListener('contextmenu', e=>{
      e.preventDefault();
      var j;
      for( j=0 ; j<7 ; j++){
        if (e.target.style.backgroundColor == colors[j])
          break
      }
      if(j==0)
        j=7;
      var dateDiv = e.target;
      dateDiv.style.backgroundColor = colors[j-1];
      var dateKey = dateDiv.textContent+monthIndex+year;
      localStorage.setItem(dateKey,j-1);
      if(j-1==0)
        localStorage.removeItem(dateKey);
    })
}
}
moodTrack();

const headerArrows = header.querySelectorAll("span");
headerArrows[0].addEventListener("click", e=>{
  if (monthIndex > 0)
    monthIndex = monthIndex -1;
  else
  {
    year -= 1;
    monthIndex = 11
    headerYear.textContent = year;
  }
  headerMonth.textContent = months[monthIndex];
  var dates = document.querySelector(".dates");
  dates.innerHTML = "";
  greyDatesFront(monthIndex,year);
  currentDatesMiddle(monthIndex,year);
  greyDatesBack(monthIndex,year);
  moodTrack();
})

headerArrows[1].addEventListener("click", e=>{
  if (monthIndex < 11)
    monthIndex = monthIndex +1;
  else
  {
    year += 1;
    monthIndex = 0
    headerYear.textContent = year;
  }
  headerMonth.textContent = months[monthIndex];
  var dates = document.querySelector(".dates");
  dates.innerHTML = "";
  greyDatesFront(monthIndex,year);
  currentDatesMiddle(monthIndex,year);
  greyDatesBack(monthIndex,year);
  moodTrack();
})


