import React from 'react';

function LoggedIn(props) {
  return (
    <div id="logged-in-page" className="logged-in-page">
      <div className="form-container">
        <InsertForm />
      </div>
      <button className="reveal-btn toggle-light" onClick={() => toggleHide('gallery')}>Show Gallery</button>
      <div className="gallery-container">
        <Gallery />
      </div>
    </div>
  );
}
