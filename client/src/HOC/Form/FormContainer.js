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
      if (files.length > 1) {
        for (let i = 1; i < files.length; i++) {
          queue.push(files[i]);
        }
      }
      readFile(files[0]);
    };

    const readFile = file => {
      const reader = new FileReader();

      reader.onloadend = function() {
        uploadUpdate({
          type: "add-image",
          value: reader.result
        });
        if (queue.length > 0) {
          readFile(queue[0]);
          queue.shift();
        }
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    // useEffect(() => reader === 0 && readFile(queue[0]), [reader]);

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
