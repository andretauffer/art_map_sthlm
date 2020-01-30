import React from "react";
import styled from "styled-components";
import { BigShapes } from "../Styles/ShapesContour";

const FormSize = styled.svg`
  width: 250px;
  height: 350px;
  transform: scale(2);
`;

export default () => (
  <FormSize xmlns="http://www.w3.org/2000/svg">
    <g>
      <BigShapes
        stroke-dasharray="5,5"
        id="svg_4"
        d="m23,8.4375l203,-0.4375l14,263l-230,59l13,-321.5625z"
        stroke-width="7"
        stroke="#9bb0db"
        fill="#7AD6CA"
      />
    </g>
  </FormSize>
);
