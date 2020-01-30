import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  z-index: 100;
  top: 20px;
  left: 20px;
  fill: var(--global-white-color);
  @media only screen and (max-width: 700px) {
    top: -50px;
    left: -80px;
    transform: scale(0.7);
  }
`;

export const IconBackground = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  fill: var(--global-light-blue);
  height: ${props => (props.active ? "100px" : "50px")};
  width: ${props => (props.active ? "100px" : "50px")};
`;

export const Icon = styled.i`
  position: absolute;
  top: ${props => (props.active ? props.positionTop : props.positionTop)};
  left: ${props => (props.active ? props.positionLeft : props.positionLeft)};
  z-index: 10;
  padding: 8px;
  border-radius: 50%;
  color: var(--global-white-color);
  text-align: center;
  font-size: ${props => (props.active ? "2.2rem" : "1.6rem")};
  animation: ${props =>
    props.active ? "move-to-active 1s ease forwards" : ""};
  @keyframes move-to-active {
    0% {
      top: ${props => props.positionTop};
      left: ${props => props.positionLeft};
      transform: scale(0);
    }
    100% {
      top: 65px;
      left: 170px;
      transform: scale(1.2);
    }
  }
  :hover {
    color: var(--global-dark-color);
  }

  @media only screen and (max-width: 700px) {
    color: ${props => (props.active ? "var(--global-dark-color)" : "")};
  }
`;
