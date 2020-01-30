import React from "react";
import styled from "styled-components";
import { Path } from "../Styles/ShapesContour";

const Size = styled.svg`
  width: 310px;
  height: 300px;
`;

export default () => (
  <Size xmlns="http://www.w3.org/2000/svg">
    <g>
      <Path
        stroke-dasharray="5,5"
        id="svg_10"
        d="m28,13.4375l-17,184.5625l292,-117l-137.5,-33.78125l-137.5,-33.78125z"
        stroke-width="7"
        stroke="#9bb0db"
        fill="#7AD6CA"
      />
    </g>
  </Size>
);
