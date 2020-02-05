import React, { useEffect, useState } from "react";
import StyledInput from "../Styles/InputStyle";
import StyledLabel from "../Styles/InputLabelStyle";
import StyledContainer from "../Styles/StyledContainer";
import StyledBackground from "../Styles/StyledBackground";

export default ({
  id,
  type,
  name,
  accept,
  value,
  label,
  placeholder,
  className,
  rows,
  width,
  ...props
}) => {
  const [active, setActive] = useState(false);

  return (
    <StyledContainer>
      <StyledLabel
        {...{
          className: `label-${className}`,
          active
        }}
      >
        {label}
      </StyledLabel>
      <StyledBackground {...{ width, active }} />
      <StyledInput
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        placeholder={placeholder}
        value={value}
        id={id}
        type={type}
        name={name}
        accept={accept}
        {...{ rows, active }}
        className={`input-${className}`}
        {...props}
      />
      {/* <StyledSelection /> */}
    </StyledContainer>
  );
};
