var mitt = require("mitt");

var sum = 0;
var total = 0;
var eventObj = mitt();

console.log(eventObj);


eventObj.on("ev1", () => {
  sum++;
  console.log("ev1 trigger");
});

eventObj.on("ev2", () => {
  sum++;
  console.log("ev2 trigger");
});

eventObj.on("ev3", () => {
  sum++;
  console.log("ev3 trigger");
});


eventObj.on('*',(name)=>{
    console.log('just a log', name);
})

eventObj.emit("ev1");
eventObj.emit("ev2");
eventObj.emit("ev3");
