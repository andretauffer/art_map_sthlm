import styled from "styled-components";

export const FormWrapper = styled.div`
  margin: 10% 2%;
  height: 80%;
  width: 96%;
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
  width: 40%;
`;

export const FormShape = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const FormInputs = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  margin: 0 auto;
  margin-top: 1em;
  padding: 1em 1em 1em 1em;
  height: 40vh;
  border-radius: 5px;
  border: 0;
  font-size: 20px;
  max-width: 400px;
  width: 400px;
  min-width: 300px;
  font-size: 10px;
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
