var day = new Date();
var dayOfWeek = day.getDay();
var currentTime = day.getHours();

console.log(currentTime);
console.log(dayOfWeek)

switch(dayOfWeek) {
  case 1:
    console.log("Monday")
    if (currentTime >=6 && currentTime <= 11) {
      console.log ("Monday morning")
    } else if (currentTime >= 12 && currentTime <= 16) {
      console.log("Monday afternoon")
    } else if (currentTime >= 17 && currentTime <= 19) {
      console.log("Monday evening")
    } else if (currentTime >= 20 && currentTime <= 23) {
      console.log("Monday night")
    } else {
      console.log("Shouldn't you be sleeping?")
    }
    break;
  case 2:
    console.log("Tuesday")
    if (currentTime >=6 && currentTime <= 11) {
      console.log ("Tuesday morning")
    } else if (currentTime >= 12 && currentTime <= 16) {
      console.log("Tuesday afternoon")
    } else if (currentTime >= 17 && currentTime <= 19) {
      console.log("Tuesday evening")
    } else if (currentTime >= 20 && currentTime <= 23) {
      console.log("Tuesday night")
    } else {
      console.log("Shouldn't you be sleeping?")
    }
    break;
  case 3:
    console.log("Wednesday")
    if (currentTime >=6 && currentTime <= 11) {
      console.log ("Wednesday morning")
    } else if (currentTime >= 12 && currentTime <= 16) {
      console.log("Wednesday afternoon")
    } else if (currentTime >= 17 && currentTime <= 19) {
      console.log("Wednesday evening")
    } else if (currentTime >= 20 && currentTime <= 23) {
      console.log("Wednesday night")
    }
    break;
  case 4:
    console.log("Thursday")
    if (currentTime >=6 && currentTime <= 11) {
      console.log ("Thursday morning")
    } else if (currentTime >= 12 && currentTime <= 16) {
      console.log("Thursday afternoon")
    } else if (currentTime >= 17 && currentTime <= 19) {
      console.log("Thursday evening")
    } else if (currentTime >= 20 && currentTime <= 23) {
      console.log("Thursday night")
    } else {
      console.log("Shouldn't you be sleeping?")
    }
    break;
  case 5:
    console.log("Friday")
    if (currentTime >=6 && currentTime <= 11) {
      console.log ("Friday morning")
    } else if (currentTime >= 12 && currentTime <= 16) {
      console.log("Friday afternoon")
    } else if (currentTime >= 17 && currentTime <= 19) {
      console.log("Friday evening")
    } else if (currentTime >= 20 && currentTime <= 23) {
      console.log("Friday night")
    } else {
      console.log("Shouldn't you be sleeping?")
    }
    break;
  case 6:
    if (currentTime >=6 && currentTime <= 11) {
      console.log ("Saturday morning")
    } else if (currentTime >= 12 && currentTime <= 16) {
      console.log("Saturday afternoon")
    } else if (currentTime >= 17 && currentTime <= 19) {
      console.log("Saturday evening")
    } else if (currentTime >= 20 && currentTime <= 23) {
      console.log("Saturday night")
    } else {
      console.log("Shouldn't you be sleeping?")
    }
    break;
  case 7:
    if (currentTime >=6 && currentTime <= 11) {
      console.log ("Sunday morning")
    } else if (currentTime >= 12 && currentTime <= 16) {
      console.log("Sunday afternoon")
    } else if (currentTime >= 17 && currentTime <= 19) {
      console.log("Sunday evening")
    } else if (currentTime >= 20 && currentTime <= 23) {
      console.log("Sunday night")
    } else {
      console.log("Shouldn't you be sleeping?")
    }
    break;
  default:
    console.log(error)
};

