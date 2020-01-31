import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Image from "../../imgs/login.png";

import Form from "./Form";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("The form component", () => {
  it("renders all the children", () => {
    act(() => {
      render(<Form />, container);
    });
    const header = container.firstChild.firstChild;
    const inputList = document.querySelector(".form-inputs");
    const formShape = document.querySelector(".form-shape");

    expect(header.textContent).toBe("Title");
    expect(container.children.length).toBe(1);
    expect(container.firstChild.children.length).toBe(3);
    expect(inputList.children.length).toBe(6);
    expect(formShape.children.length).toBe(2);
  });
});

describe("The preview component", () => {
  let arryofImages = [Image];

  it("renders nothing when no images were loaded", () => {
    act(() => {
      render(<Form />, container);
    });
    const previewGrid = document.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(0);
  });
  it("renders one image when one image is loaded", () => {
    act(() => {
      render(<Form uploadState={{ images: arryofImages }} />, container);
    });
    const previewGrid = document.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(1);
  });
  it("renders nine images when nine images are loaded", () => {
    for (let i = 0; i < 8; i++) {
      arryofImages.push(Image);
    }
    act(() => {
      render(<Form uploadState={{ images: arryofImages }} />, container);
    });
    const previewGrid = document.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(9);
  });
  it("renders nine images when more than nine images are loaded", () => {
    for (let i = 0; i < 12; i++) {
      arryofImages.push(Image);
    }
    act(() => {
      render(<Form uploadState={{ images: arryofImages }} />, container);
    });
    const previewGrid = document.querySelector(".preview-grid");

    expect(previewGrid.children.length).toBe(9);
  });
});
