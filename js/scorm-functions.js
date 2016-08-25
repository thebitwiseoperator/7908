//creating shortcut for less verbose code
var scorm = pipwerks.SCORM;

function init() {
	//Specify SCORM 1.2:
	scorm.version = "1.2";
	show("Initializing course.");
    scorm.set("cmi.core.credit", "credit"); 
	var callSucceeded = scorm.init();
	show("Call succeeded? " + callSucceeded);
}

function send() {
	var field = document.getElementById("userText"),
		value = "Placeholder text";
	if(field.value !== null && field.value !== "") {
		value = field.value;
	}
	set('cmi.suspend_data', value);
}

function set(param, value) {
	show("Sending: '" + value +"'");
	var callSucceeded = scorm.set(param, value);
	show("Call succeeded? " + callSucceeded);
}

function get(param) {
	var value = scorm.get(param);
	show("Received: '" + value + "'");
}

function complete() {
	show("Setting course status to 'completed'.");
	var callSucceeded = scorm.set("cmi.core.lesson_status", "completed");
    scorm.set("cmi.core.lesson_status", "passed");
    scorm.set("cmi.core.score.raw", 100); 
    scorm.set("cmi.core.credit", "credit");    
	show("Call succeeded? " + callSucceeded);
}

function end() { 
	show("Terminating connection.");
	var callSucceeded = scorm.quit();
	show("Call succeeded? " + callSucceeded);
}

function show(msg) {
	var debugText = document.getElementById("debugText");
	if(debugText){
		debugText.innerHTML += msg +"<br/>";
	}
	//Can also show data using pipwerks.UTILS.trace
	pipwerks.UTILS.trace(msg);
}

window.onload = function () {
	init();
}

window.onunload = function () {
	end();
}