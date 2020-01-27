import React from "react";
import HOC from "../../HOC/HOC";
import addMarker from "../Map/Map";
import Fields from "./Fields/Fields";
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
    <div className="input-page toggle-light">
      <Input
        id="image"
        type="file"
        name="images"
        accept=".png, .jpeg, .jpg"
        onChange={getImage}
        className="add-form images"
        label="Images"
      />
      <div />
      <Input
        id="name"
        type="text"
        value={name}
        label="Name  "
        className="add-form"
        onChange={e =>
          uploadUpdate({ type: "input", field: "name", value: e.target.value })
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
      {images.length > 0 &&
        images.map(img => (
          <img id="preview" src={img} alt="Image preview..." />
        ))}
    </div>
  );
}

export default HOC.Composer(
  FormContainer,
  withFormState,
  withFetch
)(InsertForm);
