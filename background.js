'use strict';

// get Today
var Today = new Date();
var dd = Today.getDate();
var mm = Today.getMonth() + 1; //January is 0!
var yyyy = Today.getFullYear();

if (dd < 10) {
  dd = '0' + dd
}

if (mm < 10) {
  mm = '0' + mm
}

Today = yyyy + '-' + mm + '-' + dd;
console.log('Today', Today);

chrome.alarms.onAlarm.addListener(function() {
  chrome.browserAction.setBadgeText({text: ''});
  
  chrome.notifications.create({
      type:     'basic',
      iconUrl:  'bomb.png',
      title:    'Are you there?',
      message:  '',
      buttons: [
        {title: 'OK'}
      ],
      priority: 3});
});

chrome.notifications.onButtonClicked.addListener(function() {
  chrome.storage.sync.get(['minutes'], function(item) {
    chrome.browserAction.setBadgeText({text: 'ON'});
    // chrome.storage.sync.clear();
    chrome.storage.sync.get([Today], (res) => {
      console.log('res', res[Today]);
      if(item.minutes<30){
        return;
      } else {
        chrome.storage.sync.set({ [Today]: res[Today] + item.minutes/60 });
        console.log('add time:',res[Today]+ item.minutes / 60);
      }
    })
    chrome.alarms.create({delayInMinutes: item.minutes});
  });
});
