import React from "react";
import styled from "styled-components";
import { InputRectangle } from "../../../../Styles/ShapesContour";

const InputSize = styled.svg`
  position: ${props => (props.poisition ? props.position : "absolute")};
  top: ${props => (props.top ? props.top : "0")};
  width: 100%;
  height: ${props => (props.extend ? "200px" : "60px")};
  z-index: ${props => (props.extend && props.active ? "2" : "1")};
`;

export default ({ active, extend }) => (
  <InputSize xmlns="http://www.w3.org/2000/svg" {...{ active, extend }}>
    <g overflow="visible">
      <InputRectangle
        fill="none"
        id="canvas_background"
        height={extend ? "190" : "50"}
        width="98%"
        y="5"
        x="5"
        {...{ active }}
      />
    </g>
  </InputSize>
);
