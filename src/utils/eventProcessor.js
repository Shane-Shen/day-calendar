import _ from "lodash";

export const eventProcessor = (events) => {
  let eventsCloned = _.cloneDeep(events);

  //handle overlap cases
  for (let i = 0; i < eventsCloned.length; i++) {
    for (let j = i + 1; j < eventsCloned.length; j++) {
      if (
        eventsCloned[i].startTime.diff(eventsCloned[j].startTime, "minutes") === 0 &&
        eventsCloned[i].endTime.diff(eventsCloned[j].endTime, "minutes") === 0
      ) {
        let overlappedEvent = eventsCloned.splice(j, 1)[0];
        eventsCloned[i].content += "; " + overlappedEvent.content;
      }
    }
  }

  // sort events by startTime
  eventsCloned.sort((a, b) => {
    if (b.startTime.diff(a.startTime, "minutes") >= 0) {
      return -1;
    } else {
      return 1;
    }
  });
  // find the closest concurrent event
  eventsCloned.forEach((event, index, events) => {
    for (let i = index - 1; i >= 0; i--) {
      if (event.startTime.diff(events[i].endTime, "minutes") < 0) {
        event.preConcurrentIndex = i;
        break;
      }
    }

    if (!event.preConcurrentIndex && event.preConcurrentIndex !== 0) {
      event.preConcurrentIndex = -1;
    }
  });
  // post process
  eventsCloned.forEach((event, index, events) => {
    event.nextConcurrentIndex = events.findIndex((e) => e.preConcurrentIndex === index);
    if (event.nextConcurrentIndex === -1) {
      event.nextConcurrentIndex = events.length;
    }
  });

  // console.log("processor", eventsCloned);
  return eventsCloned;
};
