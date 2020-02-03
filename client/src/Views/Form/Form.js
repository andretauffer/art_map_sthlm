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
    FormContainer: { getImages, readFile, notification, postRequest },
    withFormState
  },
  CommonLogic: { withFetch }
} = Services;
const { Input } = Fields;

function InsertForm({ uploadUpdate, uploadState, fetcher }) {
  const { name, longitude, latitude, images, description } = uploadState;

  const onChangeAddImage = e => {
    const images = [];
    const queue = getImages(e.target.files, 9 - images.length);
    queue.forEach(i => images.push(readFile(i)));
    Promise.all(images).then(value => {
      uploadUpdate({ method: "addImage", value });
    });
  };

  const onClickSubmit = () => {
    name
      ? postRequest({ name, latitude, longitude, images }).then(() =>
          uploadUpdate({ method: "reset" })
        )
      : notification.message("Please select a name first");
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
            onChange={onChangeAddImage}
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
              onClick={onClickSubmit}
              disabled={!name}
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
            {images &&
              images.length > 0 &&
              images.map(
                (img, i) =>
                  i < 9 && (
                    <PreviewBox key={i}>
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
