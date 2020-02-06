import { act } from "react-dom/test-utils";
import Image from "../../imgs/login.png";

import {
  getImages,
  readFile,
  notification,
  postRequest,
  getAdresses,
  parseLocation,
  parseResponse
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
describe("The getAdresses function", () => {
  it("should return data for success", async () => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    jest.spyOn(global, "fetch").mockImplementation(() => mockFetchPromise);

    const response = await getAdresses({ street: "test street", number: "2" });
    expect(response).not.toBeFalsy();
  });
  it("fires error notification when only number is supplied", done => {
    getAdresses({ number: "2" });
    expect(notification.message).toHaveBeenCalledTimes(1);
    //change to red message under field
    expect(notification.message).toHaveBeenCalledWith(
      "Please add a street name field"
    );
    done();
  });
  it("fires error notification when called without params", done => {
    getAdresses({});
    expect(notification.message).toHaveBeenCalledTimes(1);
    //change to red message under field
    expect(notification.message).toHaveBeenCalledWith(
      "Please use alphanumeric characters"
    );
    done();
  });
  it("fires error notification when server error", async () => {
    const mockFailedPromise = Promise.reject("Rejected request");

    jest.spyOn(global, "fetch").mockImplementation(() => mockFailedPromise);

    await getAdresses({ street: "error handling" }).catch();
    expect(notification.message).toHaveBeenCalledTimes(1);
    expect(notification.message).toHaveBeenCalledWith("Rejected request");
  });
});
describe("The parseLocation function", () => {
  it("should return a street name when there is only name", () => {
    const call = parseLocation("TestLocation");
    expect(call.street).toBe("TESTLOCATION");
  });
  it("should return a street name when there is only name without extra spaces", () => {
    const call = parseLocation("TestLocation ");
    expect(call.street).toBe("TESTLOCATION");
  });
  it("should return a street name and number without extra spaces", () => {
    const call = parseLocation("TestLocation 38   23123");
    expect(call.street).toBe("TESTLOCATION");
    expect(call.number).toBe("38");
  });
  it("should return the full street name and number without extra spaces", () => {
    const call = parseLocation("test this location 523");
    expect(call.street).toBe("TEST THIS LOCATION");
    expect(call.number).toBe("523");
  });
});
describe("The parseResponse function", () => {
  it("should return an object when only street is provided", () => {
    const call = parseResponse([{ street: "TestLocation 3" }]);
    expect(call[0]).toHaveProperty("street", "TestLocation 3");
    expect(call[0]).toHaveProperty("city", undefined);
    expect(call[0]).toHaveProperty("postalCode", undefined);
    expect(call[0]).toHaveProperty("geocode", undefined);
    expect(Object.keys(call[0])).toHaveLength(4);
  });
  it("should return an object when only city is provided", () => {
    const call = parseResponse([{ adminArea5: "Test City" }]);
    expect(call[0]).toHaveProperty("street", undefined);
    expect(call[0]).toHaveProperty("city", "Test City");
    expect(call[0]).toHaveProperty("postalCode", undefined);
    expect(call[0]).toHaveProperty("geocode", undefined);
    expect(Object.keys(call[0])).toHaveLength(4);
  });
  it("should return an object when only postalCode is provided", () => {
    const call = parseResponse([{ postalCode: "177 30" }]);
    expect(call[0]).toHaveProperty("street", undefined);
    expect(call[0]).toHaveProperty("city", undefined);
    expect(call[0]).toHaveProperty("postalCode", "177 30");
    expect(call[0]).toHaveProperty("geocode", undefined);
    expect(Object.keys(call[0])).toHaveLength(4);
  });
  it("should return an object when only latLng is provided", () => {
    const call = parseResponse([
      { latLng: { lat: 59.427963, lng: 17.845074 } }
    ]);
    expect(call[0]).toHaveProperty("street", undefined);
    expect(call[0]).toHaveProperty("city", undefined);
    expect(call[0]).toHaveProperty("postalCode", undefined);
    expect(call[0]).toHaveProperty("geocode.lat", 59.427963);
    expect(call[0]).toHaveProperty("geocode.lng", 17.845074);
    expect(Object.keys(call[0])).toHaveLength(4);
  });
  it("should return an object when everything is provided", () => {
    const call = parseResponse([
      {
        street: "TestLocation 3",
        adminArea5: "Test City",
        postalCode: "177 30",
        latLng: { lat: 59.427963, lng: 17.845074 }
      }
    ]);
    expect(call[0]).toHaveProperty("street", "TestLocation 3");
    expect(call[0]).toHaveProperty("city", "Test City");
    expect(call[0]).toHaveProperty("postalCode", "177 30");
    expect(call[0]).toHaveProperty("geocode.lat", 59.427963);
    expect(call[0]).toHaveProperty("geocode.lng", 17.845074);
    expect(Object.keys(call[0])).toHaveLength(4);
  });
});
