import React, { useState, useEffect } from "react";
import Styled from "styled-components";

import { TimeInterval, EventCard } from "../components";
import { timeSheet, randomEventGenerator, eventProcessor } from "../utils";
import { HEIGHT_PER_MINUTE, MINUTES_PER_GRID } from "../constants";

const Wrapper = Styled.div`
  width:700px;
`;

const Title = Styled.h2`
  text-align:center;
`;

const CalendarWrapper = Styled.div`
  position:relative;
`;

const EventWrapper = Styled.div`
  position:absolute;
  top:0px;
  left:80px;
  right:0px;
  bottom:${HEIGHT_PER_MINUTE * MINUTES_PER_GRID}px;
 
`;

const EventCanvas = Styled.div`
  position:absolute;
  top:0px;
  left:0px;
  bottom:0px;
  right:0px;
`;

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const randomEvents = randomEventGenerator();
    // processor
    const events = eventProcessor(randomEvents);
    setEvents(events);
  }, [setEvents]);

  return (
    <Wrapper>
      <Title>Day Calendar</Title>
      <CalendarWrapper>
        {timeSheet.map((i) => (
          <TimeInterval key={i} time={i} />
        ))}
        <EventWrapper>
          {events.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} eventNum={events.length} />
          ))}
        </EventWrapper>
      </CalendarWrapper>
    </Wrapper>
  );
};
