export const getImages = (files, slots) => {
  let queue = [];
  if (files.length > 9 || slots === 0 || files.length > slots) {
    alert("Maximum of 9 images per publication");
  }
  if (slots && files.length > 0) {
    const condition = slots > files.length ? files.length : slots;
    for (let i = 0; i < condition; i++) {
      queue.push(files[i]);
    }
  }
  return queue;
};

export const readFile = image => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(image);
  })
    .then(data => data)
    .catch(() => {
      throw new Error("Could not read image file");
    });
};

export default {
  getImages,
  readFile
};
