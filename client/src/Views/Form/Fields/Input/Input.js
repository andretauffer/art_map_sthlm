import React, { useEffect, useState } from "react";
import StyledInput from "../Styles/InputStyle";
import StyledLabel from "../Styles/InputLabelStyle";
import StyledContainer from "../Styles/StyledContainer";
import StyledBackground from "../Styles/StyledBackground";
import StyledSelection from "../Styles/StyledSelection";
import TextArea from "../Styles/TextAreaStyle";

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
  optionsList,
  extend,
  clearOptions = () => {},
  ...props
}) => {
  const [active, setActive] = useState(false);

  return (
    <StyledContainer>
      {!active && (
        <StyledLabel
          {...{
            className: `label-${className}`
          }}
        >
          {label}
        </StyledLabel>
      )}
      <StyledBackground
        {...{ width, active, extend: !!optionsList || extend }}
      />
      {type === "textarea" ? (
        <TextArea
          onFocus={() => setActive(true)}
          onBlur={() => {
            clearOptions() && clearOptions();
            setActive(false);
          }}
          {...{
            rows,
            active,
            accept,
            name,
            type,
            id,
            value,
            placeholder,
            extend: active && extend
          }}
          className={`input-${className}`}
          {...props}
        />
      ) : (
        <StyledInput
          onFocus={() => setActive(true)}
          onBlur={() => {
            clearOptions();
            setActive(false);
          }}
          {...{
            rows,
            active,
            accept,
            name,
            type,
            id,
            value,
            placeholder,
            extend
          }}
          className={`input-${className}`}
          {...props}
        />
      )}
      {active && optionsList && (
        <StyledSelection>
          {optionsList.map((option, i) => (
            <p
              key={option.postalCode + i}
            >{`${option.street} ${option.city} ${option.postalCode}`}</p>
          ))}
        </StyledSelection>
      )}
    </StyledContainer>
  );
};
