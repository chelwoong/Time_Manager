
// get events
var checkEvents = [];
chrome.storage.sync.get(null, (all) => {
  console.log(all)
  for (date in all) {
    checkEvents.push({
      title: all[date],
      start: date,
    })
  }
  console.log('get all',checkEvents)
})

// set events
$(Calendar = () => {
  console.log('$Calnedar', checkEvents)
  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    // put your options and callbacks here
    eventSources: [
      // your event source
      {
        // any other event sources...
        events: checkEvents,
        color: '#FFB400',     // an option!
        textColor: '#FFF', // an option!
      }
    ],
  })
});