import styled from "styled-components";

export default styled.input`
  position: absolute;
  height: 30px;
  width: 95%;
  margin: 0 10px;
  border: none;
  text-indent: 10px;
  background-color: transparent;
  outline: none;
  bottom: 10px;

  :focus {
    border-bottom: 5px solid var(--global-emerald-green);
  }

  &.error {
    border: 1px solid red;
  }
`;
