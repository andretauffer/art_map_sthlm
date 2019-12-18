import React from "react";
import HOC from "../../HOC/HOC";
import addMarker from "../Map";
import Fields from "./Fields/Fields";
const { FormContainer, withFormState } = HOC.FormHOCs;
const { Input, TextArea } = Fields;

let imgSrc = "";

function InsertForm({ uploadUpdate, uploadState, props }) {
  const { title, longitude, latitude, images, description } = uploadState;
  return (
    <div className="input-page toggle-light">
      <Input
        id="image"
        type="file"
        name="images"
        accept="image/"
        onChange={getImage}
        className="add-form images"
        label="Images"
      />
      <div />
      <Input
        id="title"
        type="text"
        value={title}
        label="Title  "
        className="add-form"
        onChange={e => uploadUpdate({ field: "title", value: e.target.value })}
      />
      <Input
        id="longitude"
        type="text"
        value={longitude}
        label="Longitude "
        className="add-form"
        onChange={e =>
          uploadUpdate({ field: "longitude", value: e.target.value })
        }
      />
      <Input
        id="latitude"
        type="text"
        value={latitude}
        label="latitude "
        className="add-form"
        onChange={e =>
          uploadUpdate({ field: "latitude", value: e.target.value })
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
          uploadUpdate({ field: "description", value: e.target.value })
        }
      />
      <div className="buttons-container">
        <button
          id="submit-btn"
          type="button"
          value="send"
          onClick={captureData}
        >
          Add to the list
        </button>
      </div>
      <img id="preview" src="" alt="Image preview..." hidden />
    </div>
  );
}

function getImage() {
  const preview = document.querySelector("#preview");
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.onloadend = function() {
    preview.src = reader.result;
    imgSrc = reader.result;
    preview.removeAttribute("hidden");
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function captureData() {
  const title = document.querySelector("#title").value;
  const longitude = Number(document.querySelector("#longitude").value);
  const latitude = Number(document.querySelector("#latitude").value);
  const desc = document.querySelector("#desc").value;
  let item;
  addMarker(title, longitude, latitude);

  if (imgSrc !== "") {
    item = {
      imageRef: imgSrc,
      title,
      longitude,
      latitude,
      description: desc
    };

    // db.get('items')
    //   .push(item)
    //   .write();

    document.querySelector("#image").value = "";
    document.querySelector("#preview").setAttribute("hidden", true);
    document.querySelector("#title").value = "";
    document.querySelector("#longitude").value = "";
    document.querySelector("#latitude").value = "";
    document.querySelector("#desc").value = "";
  }

  return item;
}

// db.defaults({ items: [] })
//   .write();

export default HOC.Composer(FormContainer, withFormState)(InsertForm);
