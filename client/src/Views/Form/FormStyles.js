import styled from "styled-components";

export const FormWrapper = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 700px) {
    flex-flow: column nowrap;
  }
`;

export const Header = styled.h1``;

export const FormPlacer = styled.div`
  position: relative;
  width: 550px;
  height: 850px;
`;

export const FormShape = styled.div`
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  @media only screen and (max-width: 700px) {
    animation: var(--move-form-background);
  }
`;

export const FormInputs = styled.div`
  position: absolute;
  top: 38%;
  left: 43%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 0 auto;
  margin-top: 1em;
  padding: 1em 1em 1em 1em;
  height: auto;
  border-radius: 5px;
  border: 0;
  font-size: 20px;
  width: 400px;
  font-size: 10px;
  @media only screen and (max-width: 700px) {
    width: 300px;
    left: 50%;
  }
`;

export const Previews = styled.div`
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(3, 33%);
  grid-template-rows: repeat(3, 33%);
  grid-gap: 5px;
  margin: 0 auto;
  margin-top: 1em;
  height: 350px;
  border-radius: 5px;
  border: 0;
  width: 350px;
  font-size: 10px;
`;

export const PreviewBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ButtonBackground = styled.svg`
  position: absolute;
  right: 0;
  top: 0;
  fill: var(--global-white-color);
  height: 50px;
  width: 50px;
`;

export const DeleteButton = styled.div`
  content: "x";
  position: absolute;
  top: 5px;
  right: 16px;
  font-size: 2rem;
  z-index: 10;
  cursor: pointer;
  color: var(--global-dark-color);
  font-weight: 900;
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  text-align: center;
  align-self: center;
  margin: 0 auto;
`;

export const Button = styled.button``;

export const ButtonsContainer = styled.div`
  margin-top: 150px;
`;
