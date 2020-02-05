import { act } from "react-dom/test-utils";
import Image from "../../imgs/login.png";

import {
  getImages,
  readFile,
  notification,
  postRequest,
  parseLocation
} from "./FormContainer";

jest.spyOn(window, "alert").mockImplementation(() => {});
jest.spyOn(notification, "message").mockImplementation(() => {});

let files = [];
beforeEach(() => {
  files = [];
});
afterEach(() => {
  jest.clearAllMocks();
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
describe("The postRequest function", () => {
  it("should call notification for success", async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    await postRequest({ name: "test item" });
    expect(notification.message).toHaveBeenCalledTimes(1);
    expect(notification.message).toHaveBeenCalledWith("succesful post");
  });
  it("fires error notification when empty form is submited", done => {
    postRequest();
    expect(notification.message).toHaveBeenCalledTimes(1);
    expect(notification.message).toHaveBeenCalledWith(
      "Please fill in the name field"
    );
    done();
  });
  it("fires error notification when empty name is submited", async () => {
    const mockFailedPromise = Promise.reject("Rejected request");

    jest.spyOn(global, "fetch").mockImplementation(() => mockFailedPromise);

    await postRequest({ name: "aa" }).catch();
    expect(notification.message).toHaveBeenCalledTimes(1);
    expect(notification.message).toHaveBeenCalledWith("Rejected request");
  });
});
describe("The parseLocation function", () => {
  it("should return a street name when there is only name", () => {
    const call = parseLocation("Aspnasvagen");
    expect(call.street).toBe("ASPNASVAGEN");
  });
  it("should return a street name when there is only name without extra spaces", () => {
    const call = parseLocation("Aspnasvagen ");
    expect(call.street).toBe("ASPNASVAGEN");
  });
  it("should return a street name and number without extra spaces", () => {
    const call = parseLocation("Aspnasvagen 38   23123");
    expect(call.street).toBe("ASPNASVAGEN");
    expect(call.number).toBe("38");
  });
  it("should return the full street name and number without extra spaces", () => {
    const call = parseLocation("avenida carlos moreira lima 588");
    expect(call.street).toBe("AVENIDA CARLOS MOREIRA LIMA");
    expect(call.number).toBe("588");
  });
});
