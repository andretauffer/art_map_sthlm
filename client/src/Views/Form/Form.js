import React from "react";
import styled from "styled-components";
import HOC from "../../HOC/HOC";
import addMarker from "../Map/Map";
import Fields from "./Fields/Fields";
import FormBackground from "../../imgs/form-background";
import PreviewBackground from "../../imgs/preview-background";
import {
  FormWrapper,
  FormPlacer,
  FormShape,
  FormInputs,
  Previews,
  ImagePreview,
  PreviewBox,
  DeleteButton,
  ButtonBackground
} from "./FormStyles";
import { CircleSmaller } from "../../Styles/ShapesContour";

const {
  FormHOCs: { FormContainer, withFormState },
  CommonLogic: { withFetch }
} = HOC;
const { Input } = Fields;

function InsertForm({ uploadUpdate, uploadState, getImage, postRequest }) {
  const { name, longitude, latitude, images, description } = uploadState;

  return (
    <FormWrapper>
      <FormPlacer>
        <FormShape>
          <FormBackground />
        </FormShape>
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
                method: "input",
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
                method: "input",
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
                method: "input",
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
                method: "input",
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
        <FormShape>
          <PreviewBackground />
          <Previews>
            {images.length > 0 &&
              images.map((img, i) => (
                <PreviewBox>
                  <ButtonBackground
                    onClick={() =>
                      uploadUpdate({ method: "removeImage", value: i })
                    }
                  >
                    <CircleSmaller />
                  </ButtonBackground>
                  <DeleteButton
                    onClick={() =>
                      uploadUpdate({ method: "removeImage", value: i })
                    }
                  >
                    x
                  </DeleteButton>
                  <ImagePreview
                    key={i}
                    id="preview"
                    src={img}
                    alt="Image preview..."
                  />
                </PreviewBox>
              ))}
          </Previews>
        </FormShape>
      </FormPlacer>
    </FormWrapper>
  );
}

export default HOC.Composer(
  FormContainer,
  withFormState,
  withFetch
)(InsertForm);
