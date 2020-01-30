import React from "react";
import styled from "styled-components";
import HOC from "../../HOC/HOC";
import addMarker from "../Map/Map";
import Fields from "./Fields/Fields";
import FormBackground from "../../imgs/form-background";
import PreviewBackground from "../../imgs/preview-background";

const FormWrapper = styled.div`
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

const FormPlacer = styled.div`
  position: relative;
  width: 40%;
`;

const FormShape1 = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FormInputs = styled.div`
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

const Previews = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  margin: 0 auto;
  margin-top: 1em;
  padding: 1em 1em 1em 1em;
  height: 400px;
  border-radius: 5px;
  border: 0;
  width: 350px;
  font-size: 10px;
`;

const {
  FormHOCs: { FormContainer, withFormState },
  CommonLogic: { withFetch }
} = HOC;
const { Input } = Fields;

function InsertForm({ uploadUpdate, uploadState, getImage, postRequest }) {
  const {
    name,
    longitude,
    latitude,
    images,
    description,
    preview
  } = uploadState;

  return (
    <FormWrapper>
      <FormPlacer>
        <FormShape1>
          <FormBackground />
        </FormShape1>
        <FormInputs className="input-page toggle-light">
          <Input
            id="image"
            type="file"
            name="images"
            accept=".png, .jpeg, .jpg"
            onChange={getImage}
            className="add-form images"
            label="Images"
            multiple
          />
          <div />
          <Input
            id="name"
            type="text"
            value={name}
            label="Name  "
            className="add-form"
            onChange={e =>
              uploadUpdate({
                type: "input",
                field: "name",
                value: e.target.value
              })
            }
          />
          <Input
            id="longitude"
            type="text"
            value={longitude}
            label="Longitude "
            className="add-form"
            onChange={e =>
              uploadUpdate({
                type: "input",
                field: "longitude",
                value: e.target.value
              })
            }
          />
          <Input
            id="latitude"
            type="text"
            value={latitude}
            label="latitude "
            className="add-form"
            onChange={e =>
              uploadUpdate({
                type: "input",
                field: "latitude",
                value: e.target.value
              })
            }
          />
          <Input
            id="description"
            type="text"
            value={description}
            label="description"
            rows="5"
            className="add-form description"
            onChange={e =>
              uploadUpdate({
                type: "input",
                field: "description",
                value: e.target.value
              })
            }
          />
          <div className="buttons-container">
            <button
              id="submit-btn"
              type="button"
              value="send"
              onClick={postRequest}
            >
              Add to the list
            </button>
          </div>
        </FormInputs>
      </FormPlacer>
      <FormPlacer>
        <FormShape1>
          <PreviewBackground />
          <Previews>
            {images.length > 0 &&
              images.map(img => (
                <img id="preview" src={img} alt="Image preview..." />
              ))}
          </Previews>
        </FormShape1>
      </FormPlacer>
    </FormWrapper>
  );
}

export default HOC.Composer(
  FormContainer,
  withFormState,
  withFetch
)(InsertForm);
