import React from "react";
import Services from "../../Services/HOC";
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
  ButtonBackground,
  Header
} from "./FormStyles";
import { CircleSmaller } from "../../Styles/ShapesContour";

const {
  FormHOCs: {
    FormContainer: { getImages, readFile },
    withFormState
  },
  CommonLogic: { withFetch }
} = Services;
const { Input } = Fields;

function InsertForm({ uploadUpdate, uploadState, fetcher }) {
  const { name, longitude, latitude, images, description } = uploadState;

  const onClick = e => {
    getImages(e, 9 - images.length);
    readFile(value => uploadUpdate({ method: "addImage", value }));
  };

  const postRequest = () => {
    fetcher({
      path: "/api/items",
      method: "POST",
      object: { name, latitude, longitude, images }
    })
      .then(res => {
        console.log("notify success, reset state", res);

        //this should happen on map load
        addMarker(name, longitude, latitude);
      })
      .catch(error => console.log("notify error", error));
  };
  return (
    <FormWrapper>
      <Header className="form-header">Title</Header>
      <FormPlacer>
        <FormShape>
          <FormBackground />
        </FormShape>
        <FormInputs className="form-inputs toggle-light">
          <Input
            id="image"
            type="file"
            name="images"
            accept=".png, .jpeg, .jpg"
            onChange={onClick}
            className="add-form images"
            label="Images"
            multiple
          />
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
        <FormShape className="form-shape">
          <PreviewBackground />
          <Previews className="preview-grid">
            {images.length > 0 &&
              images.map(
                (img, i) =>
                  i < 9 && (
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
                  )
              )}
          </Previews>
        </FormShape>
      </FormPlacer>
    </FormWrapper>
  );
}

export default Services.Composer(withFormState, withFetch)(InsertForm);
