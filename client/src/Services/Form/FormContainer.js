export let queue = [];

export const clearQueue = () => {
  return (queue = []);
};

export const getImages = (files, slots) => {
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

export const readFile = setState => {
  const reader = new FileReader();

  reader.onloadend = function() {
    setState(reader.result);
    if (queue.length > 0) {
      readFile(setState);
    }
  };

  if (queue && queue.length > 0) {
    reader.readAsDataURL(queue[0]);
    queue.shift();
  }
};

export default {
  getImages,
  readFile
};
