
// intervals will run the specified function every 
const interval = setInterval(() => {
    console.log("Interval of 1 second.");
  }, "1000");



console.log("Set Interval global function will continually execute a function after a specified sleep time in milliseconds.");


//wait for awhile to let the interval run a few times before stopping it from running anymore
const timeout = setTimeout(() => {
  clearInterval(interval)
  console.log("clearInterval function will stop the specified interval timeout from executing ad infinitum");
}, "10000");


