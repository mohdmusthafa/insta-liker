window.require = require;

const ansiToHtml = require("ansi-to-html");
const convert = new ansiToHtml();
const $ = require('jquery');
const axios = require('axios');


const appConfigs = JSON.parse(localStorage.getItem('APP_CONFIG'));
const API_URL = `http://${appConfigs.API_HOST}:${appConfigs.API_PORT}/api`;
window.API_URL = API_URL

var eventList = document.getElementById("logs-list");
var evtSource = new EventSource("/logs");

const serverStatusIcon = document.getElementsByClassName("server-status-icon")[0];
const serverStatusText = document.getElementById("server-status-text");

evtSource.onopen = () => {
  console.log('connected')
  serverStatusText.innerText = "Connected";
  serverStatusIcon.style.backgroundColor = "#228b22";
}

evtSource.onmessage = function (e) {
  console.log("received event");
  console.log(e);

  const messageHTML = convert.toHtml(e.data)
  var newElement = document.createElement("li");

  newElement.innerHTML = messageHTML;
  newElement.tabIndex = 1;
  eventList.appendChild(newElement);
  $('li').last().focus()
};

evtSource.onerror = function (e) {
  console.log(e);
  serverStatusText.innerText = "Not Connected";
  serverStatusIcon.style.backgroundColor = "#de1738";
};

console.log(evtSource);

const resetLoginButton = document.getElementsByClassName("reset-login")[0];
const stopServerButton = document.getElementsByClassName("stop-server")[0];

resetLoginButton.addEventListener('click', async () => {
    await axios.delete('/api/login')
})

stopServerButton.addEventListener('click', async () => {
  await axios.get('/api/stop-server')
})