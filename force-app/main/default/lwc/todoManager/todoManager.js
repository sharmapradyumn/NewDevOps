import { LightningElement,track } from 'lwc';

export default class TodoManager extends LightningElement {

//reactive properties for time and greeting
@track time = "8:22 AM";
@track greeting = "Good Morning Buddy";

//reactive list property to hold todo items
@track todos = [];

connectedCallback() {
  //get current time
  this.getTime();

  //fetch today's todos from server
  this.fetchTodos();

  //get time periodically after every minute
  setInterval(() => {
    this.getTime();
  }, 1000 * 1);
}

/**
 * Get time and parse in human readable format
 * It follows 12 hour format
 */
getTime() {
  const date = new Date(); /* creating object of Date class */
  const hour = date.getHours();
  const min = date.getMinutes();

  this.time = `${this.getHour(hour)}:${this.getDoubleDigit(
    min
  )} ${this.getMidDay(hour)}`;
  //get greeting (mornig/afternoon/evening/)
  this.setGreeting(hour);
}

//Convert 24 hours format to 12 hours format
getHour(hour) {
  return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
}

//convert single digit to double digit
getDoubleDigit(digit) {
  return digit < 10 ? "0" + digit : digit;
}

//return AM or PM based on current hour
getMidDay(hour) {
  return hour >= 12 ? "PM" : "AM";
}

//return greeting based on current hour
setGreeting(hour) {
  if (hour < 12) {
    this.greeting = "Good Morning (-:-)";
  } else if (hour >= 12 && hour < 17) {
    this.greeting = "Good Afternoon :)";
  } else {
    this.greeting = "Good Evening (:";
  }
}



}