import React from "react";
import styled from "styled-components";
import { BigShapes } from "../Styles/ShapesContour";

const FormSize = styled.svg`
  width: 250px;
  height: 300px;
  transform: scale(2);
`;

export default () => (
  <FormSize xmlns="http://www.w3.org/2000/svg">
    <g>
      <BigShapes
        stroke-dasharray="5,5"
        id="svg_6"
        d="m5,24.4375l16,265.5625l181,5c0,0.4375 16,-291.5625 15,-290.5625c-1,1 -170,11 -212,20z"
        stroke-width="7"
        stroke="#9bb0db"
        fill="#7AD6CA"
      />
    </g>
  </FormSize>
);
