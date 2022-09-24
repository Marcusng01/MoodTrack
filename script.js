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
const save = document.getElementById("save");
save.style.display = "none";
const error = document.getElementById("error");
const legend = document.querySelector(".legend");
const notes = document.querySelector(".notes");
const defaultNote = "Write Something Here"

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
    div.classList.add("default");
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
    tempDate.setMonth(0);
  }
  tempDate.setDate(0);
  lastDate = tempDate.getDate();
  var i;
  for ( i= 1  ; i<= lastDate ; i++){
    var div = document.createElement("div");
    div.setAttribute("id",i);
    div.innerHTML = i;
    var dateKey = i.toString()+monthIndex+year;
    var savedStatus = localStorage.getItem(dateKey);
    if(savedStatus!=null)
      div.classList.add(savedStatus);
    else
      div.classList.add("default");
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
    div.classList.add("default");
  }
}
greyDatesBack(monthIndex,year);

function legendTrack(){
  var i;
  var legendDiv = legend.querySelectorAll("div");
  
  for(i=0;i<6;i++){
    legendDiv[i].addEventListener("click", e=>{
      var lastDiv = sessionStorage.getItem("lastClicked");
      if(sessionStorage.getItem("lastClicked") != null ){
        var div = document.getElementById(lastDiv.toString());
        div.style.backgroundColor = null;
        var dateKey = div.textContent+monthIndex+year;
        var currStatus = e.target.textContent.toLowerCase();
        var dateStatus = localStorage.getItem(dateKey);
        if(dateStatus!=null)
        {
          div.classList.remove(dateStatus);
          localStorage.removeItem(dateKey);
        }
        div.classList.add(currStatus);
        localStorage.setItem(dateKey,currStatus);
        save.innerHTML = "Save";
        //set session storage last clicked to null?
      }
    })
  }
  legendDiv[i].addEventListener("click",e=>{
    var div = document.getElementById(sessionStorage.getItem("lastClicked").toString());
    div.style.opacity = null;
    sessionStorage.removeItem("lastClicked");
    save.style.display ="none";
    error.style.display = "none";
    legend.style.cursor = null;

    notes.style.display = "none";
    var dateKeyNote = div.textContent+monthIndex+year+"n";
    if (notes.value != defaultNote){
      if(notes.value == "")
        localStorage.removeItem(dateKeyNote,notes.value);
      else
        localStorage.setItem(dateKeyNote,notes.value);
    }

  })
}
legendTrack();

function moodTrack(){
  var div = dates.querySelectorAll("div");
  var i;
  for(i=0;i<42;i++)
  {
    div[i].addEventListener("mouseover",e=>{
      var dateKeyNote = e.target.textContent+monthIndex+year+"n";
      if(localStorage.getItem(dateKeyNote)!=null && e.target.style.color != "grey" && sessionStorage.getItem("lastClicked")==null){ //if there is a saved note for the date, and the date is valid, and you are not editing anything rn,
        notes.style.display = "block";                                                                                              //Show the saved note for that date
        notes.value = localStorage.getItem(dateKeyNote);
      }

    })
    div[i].addEventListener("mouseleave",e=>{
      if(save.style.display == "none"){
        notes.style.display = "none";
      }
    })
    div[i].addEventListener("click", e=>{
      if(sessionStorage.getItem("lastClicked")!=null){              //if you click on another date while editing one date.
        var lastId = sessionStorage.getItem("lastClicked")
        var oldDiv = document.getElementById(lastId.toString());
        var dateKeyNote = oldDiv.textContent+monthIndex+year+"n";
        oldDiv.style.opacity = null;                                //The last div opaque again
        sessionStorage.removeItem("lastClicked");                   //Remove it from lastclicked
        save.style.display = "none";
        error.style.display = "none";
        legend.style.cursor = null;
        notes.style.display = "none";
        if (notes.value != defaultNote){                            // If the note has been changed
          if(notes.value == "")                                     // to "", remove it from storage
            localStorage.removeItem(dateKeyNote,notes.value);   
          else                                                      // to something else, re-save the note
            localStorage.setItem(dateKeyNote,notes.value);  
        }
      }
      if(e.target.id != "" && e.target.id != lastId){               //If you click on the valid black dates of the month,
        sessionStorage.setItem("lastClicked",e.target.id);          //set last clicked to id of div
        e.target.style.opacity = 0.65; 
        save.style.display = "block";
        //save.innerHTML = "Cancel";
        legend.style.cursor = "pointer";
        notes.style.display = "block";

        var dateKeyNote = e.target.textContent+monthIndex+year+"n";
        if(localStorage.getItem(dateKeyNote)==null)
        {
          notes.placeholder= defaultNote; //Used to be notes.value = defaultNote
          notes.value = null;
        }
        else
          notes.value = localStorage.getItem(dateKeyNote);
                                                                    // Make it so that you have something in session storage that saves wether you are currently editing something or not
      }
    })
    div[i].addEventListener('contextmenu', e=>{
      e.preventDefault();
      var div = e.target;
      var dateKey = div.textContent+monthIndex+year;
      var dateStatus = localStorage.getItem(dateKey);
      if(dateStatus!=null)
      {
        div.classList.remove(dateStatus);
        localStorage.removeItem(dateKey);
        
      }
      div.classList.add("default");
      localStorage.removeItem(dateKeyNote,notes.value);
    })
  }
}
moodTrack();


const headerArrows = header.querySelectorAll("span");
headerArrows[0].addEventListener("click", e=>{
  if(save.style.display == "none"){
    if (monthIndex > 0)
      monthIndex = monthIndex -1;
    else
    {
      year -= 1;
      monthIndex = 11
      headerYear.textContent = year;
    }
    headerMonth.textContent = months[monthIndex];
    dates.innerHTML = "";
    greyDatesFront(monthIndex,year);
    currentDatesMiddle(monthIndex,year);
    greyDatesBack(monthIndex,year);
    moodTrack();
  }
  else{
    error.style.display = "block";
  }
})

headerArrows[1].addEventListener("click", e=>{
  if(save.style.display == "none"){
    if (monthIndex < 11)
      monthIndex = monthIndex +1;
    else
    {
      year += 1;
      monthIndex = 0
      headerYear.textContent = year;
    }
    headerMonth.textContent = months[monthIndex];
    dates.innerHTML = "";
    greyDatesFront(monthIndex,year);
    currentDatesMiddle(monthIndex,year);
    greyDatesBack(monthIndex,year);
    moodTrack();
  }
  else{
    error.style.display = "block";
  }
})

