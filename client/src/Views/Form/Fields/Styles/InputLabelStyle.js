import styled from "styled-components";

export default styled.p`
  font-size: 1em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 5px 10px;
  display: ${props => (props.active ? "none" : "block")};
`;
