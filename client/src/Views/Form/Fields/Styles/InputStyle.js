import styled from "styled-components";

export default styled.input`
  min-height: 30px;
  min-width: 100px;
  max-width: 100%;
  border: none;
  border-radius: 10px;
  padding: 5px 5px;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.23);

  &.error {
    border: 1px solid red;
  }

  &.add-form {
    width: 100%;
  }

  &.description {
    height: 300%;
    transform: translateY(30%);
  }
`;
