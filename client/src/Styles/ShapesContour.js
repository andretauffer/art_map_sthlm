import React from "react";
import styled from "styled-components";

const Shape = styled.path`
  stroke-dasharray: 7;
  stroke-width: 7px;
  stroke-miterlimit: 10;
  stroke-linejoin: miter;
  fill: var(--global-white-color);
  :hover {
    stroke: var(--global-dark-color);
    animation: var(--move-offset);
  }
`;

const FormShape = styled.path`
  stroke-dasharray: 7;
  stroke-width: 7px;
  stroke-miterlimit: 10;
  stroke-linejoin: miter;
  fill: var(--global-light-blue);
  animation: ${props => (props.active ? "var(--move-offset)" : "")};
  :hover {
    animation: var(--move-offset);
  }
  @media only screen and (max-width: 700%) {
    transform: scale(0.5);
  }
`;

const CircleShape = styled.circle`
  stroke: ${props => (props.active ? "black" : "var(--global-light-blue)")};
  stroke-dasharray: 7;
  stroke-width: 7px;
  stroke-miterlimit: 10;
  stroke-linejoin: miter;
  margin: 0 auto;
  transform: ${props => (props.transform ? props.transform : "")};
  :hover {
    fill: var(--global-white-color);
    stroke: var(--global-dark-color);
    animation: var(--move-offset);
  }
  @media only screen and (max-width: 700px) {
    fill: ${props => (props.active ? "var(--global-white-color)" : "")};
    stroke: ${props => (props.active ? "var(--global-dark-color)" : "")};
    animation: ${props => (props.active ? "var(--move-offset)" : "")};
  }
`;

export const Path = ({ ...props }) => <Shape {...props} />;
export const BigShapes = ({ ...props }) => <FormShape {...props} />;
export const Circle = ({ active, ...props }) => (
  <CircleShape
    cx={active ? "50" : "25"}
    cy={active ? "50" : "25"}
    r={active ? "40" : "20"}
    {...{ active }}
    {...props}
  />
);
