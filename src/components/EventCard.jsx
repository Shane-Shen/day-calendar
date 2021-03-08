import React from "react";
import Styled from "styled-components";
import moment from "moment";

import { HEIGHT_PER_MINUTE, CALENDAR_START_TIME, EVENT_CARD_COLORS } from "../constants";

const CardWrapper = Styled.div`
  background:${(props) => props.color};
  position:absolute;
  top:${(props) => props.top}px;
  left:${(props) => props.left}%;
  height:${(props) => props.height}px;
  width:${(props) => props.width}%;
  padding:5px;
  box-sizing:border-box;
  overflow:scroll;
  ::-webkit-scrollbar {
    display: none;
  };
  -ms-overflow-style: none; 
  scrollbar-width: none; 
`;

const StartTime = Styled.div`
  font-size:10px;
  font-weight:600;
`;

const Content = Styled.div`
  font-size:10px;
  word-break:break-word;
`;

export const EventCard = ({ event, index, eventNum }) => {
  const { startTime, endTime, content, preConcurrentIndex, nextConcurrentIndex } = event;

  const top = startTime.diff(moment(CALENDAR_START_TIME, ["HH:mm"]), "minutes") * HEIGHT_PER_MINUTE;
  const height = endTime.diff(startTime, "minutes") * HEIGHT_PER_MINUTE;

  const width = ((nextConcurrentIndex - preConcurrentIndex - 1) * 100) / eventNum;
  const left = ((preConcurrentIndex + 1) * 100) / eventNum;

  return (
    <>
      <CardWrapper left={left} width={width} top={top} height={height} color={EVENT_CARD_COLORS[index % 10]}>
        <StartTime>
          {startTime.format("h:mm A")} ~ {endTime.format("h:mm A")}
        </StartTime>
        <Content>{content}</Content>
      </CardWrapper>
    </>
  );
};
