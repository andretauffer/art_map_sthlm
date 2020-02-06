import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Image from "../../imgs/login.png";

import Form from "./Form";
import Services from "../../Services/HOC";

const {
  FormHOCs: {
    FormContainer: { notification }
  }
} = Services;

jest.spyOn(notification, "message").mockImplementation(() => {});
jest.spyOn(notification, "message").mockImplementation(() => {});

describe("The form component", () => {
  it("renders all the children", () => {
    const { container } = render(<Form />);
    const header = container.firstChild.firstChild;
    const inputList = container.querySelector(".form-inputs");
    const formShape = container.querySelector(".form-shape");

    expect(container.children.length).toBe(1);
    expect(container.firstChild.children.length).toBe(3);
    expect(inputList.children.length).toBe(6);
    expect(formShape.children.length).toBe(2);
  });
  it("doesn't allow submit without a title", () => {
    const { container } = render(<Form uploadState={{ name: "" }} />);
    const submitBtn = container.querySelector("#submit-btn");
    expect(submitBtn).toBeDisabled();
  });
});

describe("The preview component", () => {
  let arryofImages = [];

  beforeEach(() => {
    arryofImages = [Image];
  });

  it("renders nothing when no images were loaded", () => {
    const { container } = render(<Form />);
    const previewGrid = container.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(0);
  });
  it("renders one image when one image is loaded", () => {
    const { container } = render(
      <Form uploadState={{ images: arryofImages }} />
    );
    const previewGrid = container.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(1);
  });
  it("renders nine images when nine images are loaded", () => {
    for (let i = 0; i < 8; i++) {
      arryofImages.push(Image);
    }
    const { container } = render(
      <Form uploadState={{ images: arryofImages }} />
    );
    const previewGrid = container.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(9);
  });
  it("renders nine images when more than nine images are loaded", () => {
    for (let i = 0; i < 12; i++) {
      arryofImages.push(Image);
    }
    const { container } = render(
      <Form uploadState={{ images: arryofImages }} />
    );
    const previewGrid = container.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(9);
  });
});
