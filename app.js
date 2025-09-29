const latitude = 34.352;
const longitude = 62.204;
const method = 2; // ISNA method

const url = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=${method}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const fajrTime = data.data.timings.Fajr;
    const suhriTime = subtractMinutes(fajrTime, 15); // Suhri ends 15 min before Fajr
    console.log("Fajr:", fajrTime);
    console.log("Suhri ends at:", suhriTime);
    document.getElementById('time1').innerHTML=suhriTime;
    
  });

 fetch(url)
  .then(response => response.json())
  .then(data => {
    const dhuhrTime = data.data.timings.Dhuhr;
    console.log("Dhuhr (Zohar) time:", dhuhrTime);
    document.getElementById('time2').innerHTML=dhuhrTime;
  });

fetch(url)
  .then(response => response.json())
  .then(data => {
    const asrTime = data.data.timings.Asr;
    console.log("Asr time:", asrTime);
    document.getElementById('time3').innerHTML=asrTime;
  });

  fetch(url)
  .then(response => response.json())
  .then(data => {
    const maghribTime = data.data.timings.Maghrib;
    console.log("Maghrib time:", maghribTime);
    document.getElementById('time4').innerHTML=maghribTime;
  });

  fetch(url)
  .then(response => response.json())
  .then(data => {
    const ishaTime = data.data.timings.Isha;
    console.log("Isha (Hesha) time:", ishaTime);
        document.getElementById('time5').innerHTML=ishaTime;
  });



function subtractMinutes(timeStr, minutesToSubtract) {
  let [hours, minutes] = timeStr.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes - minutesToSubtract;
  if (totalMinutes < 0) totalMinutes += 1440;
  let newHours = Math.floor(totalMinutes / 60);
  let newMinutes = totalMinutes % 60;
  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}






function updateClock(){
    const now =new Date();
    let hours = now.getHours();
    const meridiem = hours >=12 ? "PM" : "AM";
    hours =hours% 12 || 12;
    hours =hours.toString().padStart(2, 0);
    const minutes =now.getMinutes().toString().padStart(2,0);
    const seconds =now.getSeconds().toString().padStart(2,0);
    const timeStarting = `${hours}: ${minutes}: ${seconds} ${meridiem}`;
    document.getElementById('clock').textContent = timeStarting;
}

updateClock();
setInterval(updateClock,1000);