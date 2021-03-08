import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

import { CALENDAR_START_TIME, CALENDAR_END_TIME, EVENT_NUMBER, EVENT_MIN_DURATION, EVENT_CONTENT } from "../constants";

export const randomEventGenerator = () => {
  const EVENT_EARLIEST_START_TIME = moment(CALENDAR_START_TIME, ["HH:mm"]);
  const EVENT_LATEST_START_TIME = moment(CALENDAR_END_TIME, ["HH:mm"]).subtract(EVENT_MIN_DURATION, "minutes");
  const EVENT_LATEST_END_TIME = moment(CALENDAR_END_TIME, ["HH:mm"]);
  const EVENT_START_TIME_RANDOM_RANGE = EVENT_LATEST_START_TIME.diff(EVENT_EARLIEST_START_TIME, "minutes");

  let eventContentCloned = _.cloneDeep(EVENT_CONTENT);

  let randomEvents = [];

  while (randomEvents.length < EVENT_NUMBER) {
    let eventStartRandomMins = Math.floor(Math.random() * EVENT_START_TIME_RANDOM_RANGE);
    let eventStartTime = EVENT_EARLIEST_START_TIME.clone().add(eventStartRandomMins, "minutes");

    let EVENT_MAX_DURATION = EVENT_LATEST_END_TIME.diff(eventStartTime, "minutes");
    let eventDurationRandom = Math.floor(Math.random() * EVENT_MAX_DURATION);
    let eventDuration = Math.max(eventDurationRandom, EVENT_MIN_DURATION);
    let eventEndTime = eventStartTime.clone().add(eventDuration, "minutes");

    if (EVENT_LATEST_END_TIME.diff(eventEndTime, "minutes") >= 0) {
      // add random and unique content
      let randomInt = Math.floor(Math.random() * eventContentCloned.length);
      let content = eventContentCloned.splice(randomInt, 1)[0];

      let id = uuidv4();
      randomEvents.push({ id: id, startTime: eventStartTime, endTime: eventEndTime, content });
    }
  }

  // console.log(randomEvents);
  return randomEvents;
};
