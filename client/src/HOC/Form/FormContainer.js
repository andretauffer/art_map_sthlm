import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

let user = "";

export default Component => {
  const Container = ({ uploadState, uploadUpdate, ...props }) => {
    console.log(props);
    const { title, latitude, longitude, images } = uploadState;

    return (
      <Component
        uploadState={uploadState}
        uploadState={uploadState}
        {...props}
      />
    );
  };

  return Container;
};
