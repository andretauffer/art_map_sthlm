import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import addMarker from "../../Views/Map/Map";

let user = "";

export default Component => {
  const Container = ({ uploadState, uploadUpdate, fetcher, ...props }) => {
    const { name, latitude, longitude, images } = uploadState;

    let queue = [];

    const getImage = e => {
      const files = e.target.files;
      if (files.length > 9 || images.length === 9) {
        alert("Maximum of 9 images per publication");
      }
      if (images.length < 9) {
        if (files.length > 1) {
          for (let i = 1; i < 9 - images.length; i++) {
            if (i < 9) queue.push(files[i]);
          }
        }
        readFile(files[0]);
      }
    };

    const readFile = file => {
      const reader = new FileReader();

      reader.onloadend = function() {
        uploadUpdate({
          method: "addImage",
          value: reader.result
        });
        if (queue.length > 0 && images.length < 9) {
          readFile(queue[0]);
          queue.shift();
        }
      };

      if (file && images.length < 9) {
        reader.readAsDataURL(file);
      }
    };

    const postRequest = () =>
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

    return (
      <Component
        {...{ uploadState, uploadUpdate, getImage, postRequest }}
        {...props}
      />
    );
  };

  return Container;
};
