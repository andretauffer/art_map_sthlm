import { act } from "react-dom/test-utils";
import Image from "../../imgs/login.png";

import { getImages, readFile } from "./FormContainer";

jest.spyOn(window, "alert").mockImplementation(() => {});

let files = [];
beforeEach(() => {
  files = [];
});

describe("The getImage function", () => {
  it("Should get single image and send to queue", () => {
    files.length = 1;
    expect(getImages(files, 9).length).toBe(1);
  });
  it("Should get nine images and send to queue", () => {
    files.length = 9;
    expect(getImages(files, 9).length).toBe(9);
  });
  it("Should get only nine images out of 20 and send to queue", () => {
    files.length = 20;
    expect(getImages(files, 9).length).toBe(9);
  });
  it("Should get only 5 images out of 20 and send to queue", () => {
    files.length = 20;
    expect(getImages(files, 5).length).toBe(5);
  });
  it("Should get only 3 images and send to queue when there are 6 slots", () => {
    files.length = 3;
    expect(getImages(files, 6).length).toBe(3);
  });
});
describe("The readFile function", () => {
  let images = [];
  beforeEach(() => {
    images = [];
  });
  it("should return an image file encoded in base64 for valid image", async () => {
    await act(async () => {
      images.push(await readFile(new Blob([Image])));
    });
    expect(images.length).toBe(1);
  });
  it("should throw when undefined is passed down", () => {
    expect.assertions(1);
    return readFile().catch(error =>
      expect(error).toStrictEqual(new Error("Could not read image file"))
    );
  });
  it("should throw when null is passed down", () => {
    expect.assertions(1);
    return readFile(null).catch(error =>
      expect(error).toStrictEqual(new Error("Could not read image file"))
    );
  });
  it("should throw when string is passed down", () => {
    expect.assertions(1);
    return readFile("").catch(error =>
      expect(error).toStrictEqual(new Error("Could not read image file"))
    );
  });
});
