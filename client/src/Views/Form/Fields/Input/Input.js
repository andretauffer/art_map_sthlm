import React from "react";
import StyledInput from "../Styles/InputStyle";
import StyledLabel from "../Styles/InputLabelStyle";
import StyledRow from "../Styles/StyledRow";

export default ({
  id,
  type,
  name,
  accept,
  onChange,
  value,
  label,
  onBlur,
  placeholder,
  className
}) => (
  <StyledRow>
    <StyledLabel className={className}>{label}</StyledLabel>
    <StyledInput
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      value={value}
      id={id}
      type={type}
      name={name}
      accept={accept}
      className={`input ${className}`}
    />
  </StyledRow>
);
