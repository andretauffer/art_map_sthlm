import React, { useEffect } from "react";
import Services from "../../Services/HOC";
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
    FormContainer: {
      getImages,
      readFile,
      notification,
      postRequest,
      getAdresses,
      parseLocation,
      parseResponse
    },
    withFormState
  }
} = Services;
const { Input } = Fields;

function InsertForm({ uploadUpdate, uploadState }) {
  const {
    name,
    location,
    images,
    description,
    geolocation,
    adressOptions
  } = uploadState;

  let delaySearch;

  const onChangeAddImage = e => {
    const images = [];
    const queue = getImages(e.target.files, 9 - images.length);
    queue.forEach(i => images.push(readFile(i)));
    Promise.all(images).then(value => {
      uploadUpdate({ method: "addImage", value });
    });
  };

  const onTypeSearch = e => {
    clearTimeout(delaySearch);
    uploadUpdate({
      method: "input",
      field: "location",
      value: e.target.value
    });
  };

  const fieldActive = className =>
    document.querySelector(`.${className}`) === document.activeElement;

  const onClickSubmit = async () => {
    let response = [];
    name
      ? (response = await postRequest({ name, location, images }))
      : notification.message("Please select a name first");

    response && uploadUpdate({ method: "reset" });
  };
  useEffect(() => {
    const element = document.querySelector(".input-name");
    element.focus();
  }, []);

  useEffect(() => {
    if (!!location)
      delaySearch = setTimeout(async () => {
        let value = await getAdresses(parseLocation(location));
        uploadUpdate({
          method: "input",
          field: "adressOptions",
          value: parseResponse(value)
        });
      }, 3000);
  }, [location]);

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
            className="images"
            label="Images"
            multiple
          />
          <Input
            id="name"
            type="text"
            value={name}
            label="Name  "
            className="name"
            active={value => fieldActive(value)}
            placeholder="The event or image title"
            onChange={e =>
              uploadUpdate({
                method: "input",
                field: "name",
                value: e.target.value
              })
            }
          />
          <Input
            id="location"
            type="text"
            value={location}
            label="Location  "
            placeholder="Street name and number"
            className="location"
            onChange={onTypeSearch}
          />
          <div>
            {adressOptions &&
              fieldActive("input-location") &&
              adressOptions.map((adress, i) => (
                <p
                  key={adress.postalCode + i}
                >{`${adress.street} ${adress.city} ${adress.postalCode}`}</p>
              ))}
          </div>
          <Input
            id="description"
            type="textarea"
            value={description}
            label="description"
            rows="5"
            className="description"
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
              className="request-button"
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

export default withFormState(InsertForm);
