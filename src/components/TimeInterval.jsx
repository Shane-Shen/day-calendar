import moment from "moment";
import React from "react";
import Styled from "styled-components";

import { HEIGHT_PER_MINUTE, MINUTES_PER_GRID } from "../constants";

const Wrapper = Styled.div`
  border-top:${(props) => (props.on_hour ? "3px solid black" : "2px dashed black")};
  height:${HEIGHT_PER_MINUTE * MINUTES_PER_GRID}px;
  box-sizing:border-box;
`;

const TimeFont = Styled.div`
  font-size:14px;
  font-weight:${(props) => (props.on_hour ? 600 : 400)};
  width:80px;
  box-sizing:border-box;
  text-align:right;
  padding-right:5px;
  height:100%;
  display:flex;
  align-items:center;
  justify-content:flex-end;
  border-right:2px solid black;
`;

export const TimeInterval = ({ time }) => {
  const timeMoment = moment(time, ["HH:mm"]);
  const onHour = timeMoment.get("minutes") === 0;
  const timeFormat = timeMoment.format("h:mm A");

  return (
    <Wrapper on_hour={onHour}>
      <TimeFont on_hour={onHour}>{timeFormat}</TimeFont>
    </Wrapper>
  );
};
