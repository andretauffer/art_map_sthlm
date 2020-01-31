import { act } from "react-dom/test-utils";
import Image from "../../imgs/login.png";

import { getImages, queue, clearQueue, readFile } from "./FormContainer";

let files = [];
beforeEach(() => {
  files = [];
  clearQueue();
});

describe("The getImage function", () => {
  it("Should get single image and send to queue", () => {
    act(() => {
      files.length = 1;
      getImages(files, 9);
    });
    expect(queue.length).toBe(1);
  });
  it("Should get nine images and send to queue", () => {
    act(() => {
      files.length = 9;
      getImages(files, 9);
    });
    expect(queue.length).toBe(9);
  });
  it("Should get only nine images out of 20 and send to queue", () => {
    act(() => {
      files.length = 20;
      getImages(files, 9);
    });
    expect(queue.length).toBe(9);
  });
  it("Should get only 5 images out of 20 and send to queue", () => {
    act(() => {
      files.length = 20;
      getImages(files, 5);
    });
    expect(queue.length).toBe(5);
  });
  it("Should get only 3 images and send to queue when there are 6 slots", () => {
    act(() => {
      files.length = 3;
      getImages(files, 6);
    });
    expect(queue.length).toBe(3);
  });
});
