import React from "react";
import StyledInput from "../Styles/InputStyle";
import StyledLabel from "../Styles/InputLabelStyle";
import StyledRow from "../Styles/StyledRow";

export default ({
  id,
  type,
  name,
  accept,
  value,
  label,
  placeholder,
  className,
  ...props
}) => (
  <StyledRow>
    <StyledLabel className={className}>{label}</StyledLabel>
    <StyledInput
      placeholder={placeholder}
      value={value}
      id={id}
      type={type}
      name={name}
      accept={accept}
      className={`input ${className}`}
      {...props}
    />
  </StyledRow>
);
