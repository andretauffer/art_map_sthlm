import React from "react";
import styled from "styled-components";
import { BigShapes } from "../Styles/ShapesContour";

const FormSize = styled.svg`
  width: 250px;
  height: 350px;
  transform: scale(2.5);
`;

export default () => (
  <FormSize xmlns="http://www.w3.org/2000/svg">
    <g>
      <BigShapes
        stroke-dasharray="5,5"
        id="svg_4"
        d="m5,5.4375l176,8.5625c0,0.4375 38,308.4375 35,309.4375c-3,1 -213,26 -213,25.5625c0,0.4375 -1,-1.5625 2,-343.5625z"
        stroke-width="7"
        stroke="#9bb0db"
        fill="#7AD6CA"
      />
    </g>
  </FormSize>
);
