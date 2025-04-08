const hackButton = document.querySelector("#hackButton");
const dataElement = document.querySelector("#dataStolen");
const upgrade1 = document.querySelector("#upgrade1");
const upgrade1text = document.querySelector("#upgrade1cost");
const upgrade2 = document.querySelector("#upgrade2");
const upgrade2text = document.querySelector("#upgrade2cost");
const hackButtontext = document.querySelector("#dataperclick");

let dataStolen = 0;
let datapersecond = 0;
let lastTimestamp = 0;
let dataperclick = 1;
let upgrade1cost = 10;
let upgrade2cost = 10;

const message = (text) => {
  const list = document.querySelector("#messages");
  const listItems = list.querySelectorAll("li");
  if (listItems.length >= 5) {
    listItems[0].remove();
  }
  const li = document.createElement("li");
  li.textContent = text;
  list.appendChild(li);
};

hackButton.addEventListener("click", () => {
  dataStolen += dataperclick;
  dataElement.textContent = dataStolen;
});

upgrade1.addEventListener("click", () => {
  if (dataStolen < upgrade1cost) {
    message("Du har inte råd");
    return;
  }
  dataStolen -= upgrade1cost;
  upgrade1cost = Math.round(upgrade1cost*1.2);
  upgrade1text.textContent = upgrade1cost;
  message("Uppgradering köpt, nya prylar");
  datapersecond += 1;
  
});
upgrade2.addEventListener("click", () => {
    if (dataStolen < upgrade2cost) {
        message("Du har inte råd");
        return;
    }
    dataStolen -= upgrade2cost
    upgrade2cost = Math.round(upgrade2cost*1.2);
    upgrade2text.textContent = upgrade2cost;
    message("Uppgradering köpt, nya prylar");
    dataperclick += 1;
    hackButtontext.textContent = dataperclick;
})


const step = (timestamp) => {
  if (datapersecond > 0) {
    dataElement.textContent = dataStolen + " (" + datapersecond + "/s)";
  } else {
    dataElement.textContent = dataStolen;
  }
    
  
  if (timestamp - lastTimestamp >= 1000) {
    lastTimestamp = timestamp;
    dataStolen += datapersecond;
  }

  requestAnimationFrame(step);
};

requestAnimationFrame(step);
