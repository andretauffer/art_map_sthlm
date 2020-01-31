let queue = [];

// export const getImages = (e, images) => {
//   const files = e.target.files;
//   if (files.length > 9 || images.length === 9) {
//     alert("Maximum of 9 images per publication");
//   }
//   if (images.length < 9) {
//     if (files.length > 1) {
//       for (let i = 1; i < 9 - images.length; i++) {
//         if (i < 9) queue.push(files[i]);
//       }
//     }
//     readFile(files[0], images);
//   }
// };

export const getImages = (e, slots) => {
  const files = e.target.files;
  if (files.length > 9 || slots === 0 || files.length > slots) {
    alert("Maximum of 9 images per publication");
  }
  if (slots && files.length > 0) {
    for (let i = 0; i < slots; i++) {
      queue.push(files[i]);
    }
  }
  return queue;
};

export const readFile = setState => {
  const reader = new FileReader();
  console.log(queue);

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
