import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import addMarker from "../../Views/Map/Map";

let user = "";
let imgSrc = "";

export default Component => {
  const Container = ({ uploadState, uploadUpdate, fetcher, ...props }) => {
    const { name, latitude, longitude, images } = uploadState;

    function getImage(e) {
      const preview = document.querySelector("#preview");
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = function() {
        imgSrc = reader.result;
        uploadUpdate({
          type: "add-image",
          value: reader.result
        });
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    }

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
