'use strict';

var d = new Date();
var Today = moment().format('YYYY[-]MM[-]DD');
chrome.storage.sync.get([Today],(res)=>{
  console.log('get Today:',res[Today])
  if(!res[Today]){
    chrome.storage.sync.set({ [Today]: 0});
  }
})

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({ text: 'ON' });
  chrome.alarms.create({ delayInMinutes: minutes });
  chrome.storage.sync.set({ minutes: minutes });
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({ text: '' });
  chrome.alarms.clearAll();
  window.close();
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('60min').addEventListener('click', setAlarm);
document.getElementById('30min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
