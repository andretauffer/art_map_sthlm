import styled from "styled-components";

export default styled.textarea`
  position: absolute;
  height: ${props => (props.extend ? "160px" : "30px")};
  width: 95%;
  margin: 0 10px;
  border: none;
  text-indent: 10px;
  background-color: transparent;
  outline: none;
  bottom: -130px;
  z-index: 10;

  :focus {
    border-bottom: 5px solid var(--global-emerald-green);
  }
`;
