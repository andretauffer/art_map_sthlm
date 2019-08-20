import React, { useEffect, useState} from 'react';
import { isArray } from 'util';
import Card from './Card';

let store = 'No item available at the moment';

function Gallery() {
  const [gallery, setGallery] = useState([]);
  let count = 0;

  useEffect(() => {
    
      fetch('/api/getList')
      .then(res => res.json())
      .then(list => {
        console.log(list);
        setGallery( list );
      })
  
  }, [])
  // getData();
  // if (Array.isArray(store)) {
    return (
      <div className="gallery">
        {gallery.length ? (
          <div>
            {/* {gallery.map( el => {
              return <div> {el} </div>
            })} */}
        {
          gallery.map((el) => {
            console.log(gallery);
            console.log(el);
            count += 1;
            // return <Card key={count} image={el.imageRef} title={el.title} description={el.description} location={el.location} />;
            return <Card key={count} title={el}></Card>
          })
        }
        </div>
        ) : (
          <div>
            {console.log(gallery)}
          <h3>Nothing in the galleries right now</h3>
        </div>
      )
    }
      </div>
    );
  // }
  // return (
  //   <div> No item </div>
  // );
}

export function getData() {
  const savedData = localStorage.getItem('db');
  console.log('heeere', store);
  if (savedData) {
    store = JSON.parse(savedData).items;
    console.log('heeere', store);
    return store;
  }
}

export default Gallery;
