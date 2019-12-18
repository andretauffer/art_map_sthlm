import React from "react";
import StyledTextArea from "../Styles/TextAreaStyle";
import StyledLabel from "../Styles/InputLabelStyle";

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
  className,
  rows
}) => (
  <StyledLabel>
    {label}
    <StyledTextArea
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      value={value}
      id={id}
      type={type}
      name={name}
      accept={accept}
      className={`input ${className}`}
      rows={rows}
    />
    {console.log("rowsss", rows)}
  </StyledLabel>
);
