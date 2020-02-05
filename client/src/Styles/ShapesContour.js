import React from "react";
import styled from "styled-components";

const Shape = styled.path`
  stroke: var(--global-dark-color);
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

const InputShape = styled.rect`
  stroke: ${props =>
    props.active ? "var(--global-emerald-green)" : "var(--global-white-color)"};
  stroke-dasharray: 7;
  stroke-width: 7px;
  stroke-miterlimit: 10;
  stroke-linejoin: miter;
  fill: var(--global-white-color);
  animation: ${props => (props.active ? "var(--move-offset)" : null)};
  width: 98%;
  :hover {
    stroke: var(--global-emerald-green);
    animation: var(--move-offset);
  }
  @media only screen and (max-width: 700px) {
    width: 95%;
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
    /* transform: scale(0.5); */
    animation: var(--move-form-background);
  }
`;

const CircleShape = styled.circle`
  stroke: var(--global-light-blue);
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
  fill: ${props => (props.active ? "var(--global-white-color)" : "")};
  stroke: ${props => (props.active ? "var(--global-dark-color)" : "")};
  animation: ${props => (props.active ? "var(--move-offset)" : "")};
  @media only screen and (max-width: 700px) {
  }
`;

const SmallerCircle = styled.circle`
  margin: 0 auto;
  :hover {
    fill: var(--global-white-color);
  }
  @media only screen and (max-width: 700px) {
    fill: ${props => (props.active ? "var(--global-white-color)" : "")};
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
export const CircleSmaller = ({ ...props }) => (
  <SmallerCircle cx="25" cy="25" r="20" {...props} />
);
export const InputRectangle = ({ ...props }) => <InputShape {...props} />;
