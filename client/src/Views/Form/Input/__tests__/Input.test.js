import React, { useState } from "react";
import { create, act } from "react-test-renderer";
import InputField from "../Input";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

const withState = Component => () => {
  const [state, setState] = useState("");

  return <Component value={state} onChange={value => setState(value)} />;
};

const EnhancedInput = withState(InputField);

describe("Input component", () => {
  test("it shows the expected text when typed", () => {
    let component;
    act(() => {
      component = create(<EnhancedInput />);
    });
    const instance = component.root;
    const input = instance.findByType("input");
    act(() => input.props.onChange("test"));
    expect(input.props.value).toBe("test");
  });
});
