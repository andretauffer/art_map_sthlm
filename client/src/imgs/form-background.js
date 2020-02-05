import React from "react";
import styled from "styled-components";
import { BigShapes } from "../Styles/ShapesContour";

const FormSize = styled.svg`
  position: fixed;
  top: 300px;
  left: 500px;
  width: 580px;
  height: 400px;
  transform: scale(4, 2.5);
  animation: var(--move-form-background);

  @media only screen and (max-width: 700px) {
    /* transform: scale(2.4, 2.8); */
  }
`;

export default () => (
  <FormSize xmlns="http://www.w3.org/2000/svg">
    <g>
      <BigShapes
        stroke-dasharray="5,5"
        id="svg_4"
        d="m0,9.4375l580,24.5625l0,342l-580,15l0,-381.5625z"
        stroke-width="7"
        stroke="#9bb0db"
        fill="#7AD6CA"
      />
    </g>
  </FormSize>
);
