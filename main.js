getCurrentTime(); 

//  selecting dom elements
let selectMenu = document.querySelectorAll("select");
let setAlarmButton = document.getElementById("buton1");
let content = document.querySelector(".content");

var isAlarmSet = false;
let finalAlarmTime;
let ringtone = new Audio("./files/ringtone.mp3");

// eventlisteners: 
setAlarmButton.addEventListener("click", setAlarm);

// declaring options for each select
for(let i=12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`
    console.log(option);
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=59; i >= 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}

for(let i=2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}

// All Functions:

// getting the current time and display it 
function getCurrentTime() {

    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let ampm = hour <= 12 ? "AM" : "PM";

    hour = hour % 12; // for am-pm
    hour = hour == 12 ? '00' : hour;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    var time = document.getElementsByTagName("h1")[0];
    time.innerText = `${hour}:${minute}:${second} ${ampm}`
    setTimeout(getCurrentTime,10); 

    return `${hour}:${minute} ${ampm}`;
}

function setAlarm() {

    if(isAlarmSet) {
        finalAlarmTime = "";
        ringtone.pause();
        content.classList.remove("disable");
        setAlarmButton.textContent = 'Set Alarm';

        return isAlarmSet = false; 
    }

    let alarmTime = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(alarmTime);

    if( alarmTime.includes('Hour') || alarmTime.includes('Minute') ||alarmTime.includes('AM/PM')) {
        return alert("Please select a valid time to set the alarm...");
    }

    isAlarmSet = true;
    finalAlarmTime = alarmTime;
    content.classList.add("disable");
    setAlarmButton.textContent = 'Clear Alarm';

    setInterval( () => {
        if(finalAlarmTime == getCurrentTime()) {
            console.log("alarm çalıyor")
            ringtone.play();
            ringtone.loop = true;    
        }
    },1000);
    
}


