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
    adressOptions,
    type,
    keywords,
    startDate,
    endDate,
    url
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
    <FormWrapper className="form-wrapper">
      {/* <Header className="form-header">Title</Header> */}
      <FormBackground />
      <FormPlacer>
        {/* <FormShape>
          <FormBackground />
        </FormShape> */}
        <FormInputs className="form-inputs toggle-light">
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
            {...{ optionsList: adressOptions }}
          />
          <Input
            id="type"
            type="text"
            value={type}
            label="Type  "
            placeholder="Select type"
            className="type"
            onChange={onTypeSearch}
            {...{ optionsList: adressOptions }}
          />
          <Input
            id="keywords"
            type="text"
            value={keywords}
            label="Keywords  "
            placeholder="Nice, awesome, vibrant..."
            className="keywords"
            onChange={onTypeSearch}
            {...{ optionsList: adressOptions }}
          />
          <Input
            id="start_date"
            type="date"
            value={startDate}
            label="Start date  "
            placeholder="starts in"
            className="start_date"
          />
          <Input
            id="end_date"
            type="date"
            value={endDate}
            label="End date  "
            placeholder="ends in"
            className="end_date"
          />
          <Input
            id="url"
            type="text"
            value={url}
            label="Url "
            placeholder="Put here the url to your amazing website!"
            className="url"
          />
          <Input
            id="description"
            type="textarea"
            value={description}
            label="description"
            rows="5"
            className="description"
            extend={true}
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
    </FormWrapper>
  );
}

{
  /* <FormPlacer>
        <FormShape className="form-shape">
          <PreviewBackground />
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
      </FormPlacer> */
}

export default withFormState(InsertForm);
