import React from "react";
import StyledInput from "./InputStyle";

export default ({
  id,
  type,
  name,
  accept,
  onChange,
  value,
  onBlur,
  placeholder,
  className
}) => (
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
);
