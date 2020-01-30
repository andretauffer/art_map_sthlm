import React from "react";
import { Icon, IconBackground } from "./NavBarStyle";
import { Circle } from "../../Styles/ShapesContour";

export default ({ className, active, positionTop, positionLeft, onClick }) => (
  <Icon {...{ className, active, positionTop, positionLeft, onClick }}>
    <IconBackground {...{ active }}>
      <Circle {...{ active }} />
    </IconBackground>
  </Icon>
);
