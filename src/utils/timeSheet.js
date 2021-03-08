import moment from "moment";

import { CALENDAR_START_TIME, CALENDAR_END_TIME, MINUTES_PER_GRID } from "../constants";

export const timeSheet = (() => {
  const timeSheet = [];
  let startTime = moment(CALENDAR_START_TIME, ["HH:mm"]);
  let endTime = moment(CALENDAR_END_TIME, ["HH:mm"]);
  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeSheet.push(currentTime.format("HH:mm"));
    currentTime = currentTime.add(MINUTES_PER_GRID, "minutes");
  }

  return timeSheet;
})();
