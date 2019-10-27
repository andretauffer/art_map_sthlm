import React from 'react';
import Screenshot, { returnToGallery } from '../FX/CloseCard';
// import unhide from '../FX/Flow';


const state = { lastCard: null };

function Card(props) {
  return (
    <div className="card toggle-light" onClick={enlarge}>
      <img className="image" src={props.image} />
      <div className="info-container">
        <h4 className="title">{props.title}</h4>
        <p className="description">{props.description}</p>
        <p className="location">{props.location}</p>
      </div>
      <button className="close-card-btn" onClick={e => returnToGallery(e)}> x</button>
    </div>
  );
}

const cards = document.querySelectorAll('.card');


function enlarge(e) {
  const element = e.currentTarget;
  const sameClassElements = document.querySelectorAll('.card');
  element.classList.add('big');
  element.lastChild.style.display = 'block';
  // unhide(element, sameClassElements);
  if (state.lastCard !== null || state.lastCard !== undefined) {
  }
  state.lastCard = e;
}


export default Card;
