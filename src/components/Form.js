// import low from 'lowdb';
// import LocalStorage from 'lowdb/adapters/LocalStorage';
import React from 'react';
import addMarker from './Map';

// const adapter = new LocalStorage('db');
// const db = low(adapter);
let imgSrc = '';

function InsertForm(props) {
  return (
    <div className="input-page toggle-light">
      <form className="input-form" value="x">
        <label className="images" htmlFor="image">
          Images
          <input id="image" type="file" name="images" accept="image/" onChange={getImage} />
        </label>
        <div />
        <label htmlFor="title">
Title
          <input id="title" type="text" value={props.title} />
        </label>
        <label htmlFor="longitude">
Longitude
          <input id="longitude" type="text" />
        </label>
        <label htmlFor="latitude">
Latitude
          <input id="latitude" type="text" />
        </label>
        <p>Description</p>
        <textarea id="desc" rows="5" className="description" />
        <div className="buttons-container">
          <button id="submit-btn" type="button" value="send" onClick={captureData}>Add to the list</button>
        </div>
        <img id="preview" src="" alt="Image preview..." hidden />
      </form>
    </div>

  );
}

function getImage() {
  const preview = document.querySelector('#preview');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    imgSrc = reader.result;
    preview.removeAttribute('hidden');
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
}

function captureData() {
  const title = document.querySelector('#title').value;
  const longitude = Number(document.querySelector('#longitude').value);
  const latitude = Number(document.querySelector('#latitude').value);
  const desc = document.querySelector('#desc').value;
  let item;
  addMarker(title, longitude, latitude);

  if (imgSrc !== '') {
    item = {
      imageRef: imgSrc, title, longitude, latitude, description: desc,
    };

    // db.get('items')
    //   .push(item)
    //   .write();

    document.querySelector('#image').value = '';
    document.querySelector('#preview').setAttribute('hidden', true);
    document.querySelector('#title').value = '';
    document.querySelector('#longitude').value = '';
    document.querySelector('#latitude').value = '';
    document.querySelector('#desc').value = '';
  }

  return item;
}

// db.defaults({ items: [] })
//   .write();

export default InsertForm;
