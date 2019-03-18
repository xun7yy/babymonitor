var mostRecentTime=0;
console.log("mostRecentTime" + mostRecentTime);
var d = new Date();
console.log("d" + d);
if (d.getTime() - mostRecentTime < 500) {

}
console.log(d.getTime() - mostRecentTime);
mostRecentTime = d.getTime();
console.log("mostRecentTime" + mostRecentTime);
console.log(d.getTime() - mostRecentTime);
while(d.getTime() - mostRecentTime < 500){

}