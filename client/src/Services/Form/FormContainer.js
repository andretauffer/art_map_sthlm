export const getImages = (files, slots) => {
  let queue = [];
  if (files.length > 9 || slots === 0 || files.length > slots) {
    notification.message("Maximum of 9 images per publication");
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

export const notification = { message: m => alert(m) };

export const postRequest = obj => {
  return !!(obj && obj.name)
    ? fetch("/api/items", { method: "POST", body: obj })
        .then(res => notification.message("succesful post"))
        .catch(error => notification.message(error))
    : notification.message("Please fill in the name field");
};

export const getAdresses = location => {
  const { street, number } = location;
  console.log("street", street);
  return !!street
    ? fetch(`/api/items/adress?street=${street}&number=${number}`)
        .then(data => data.json())
        .catch(error => notification.message(error))
    : notification.message("Please fill in the location field");
};

export const parseResponse = response => {
  let parsed = [];
  response.forEach(adress => {
    console.log(adress);
    const street = adress.street;
    const city = adress.adminArea5;
    const postalCode = adress.postalCode;
    const geocode = adress.latLng;
    parsed.push({ street, city, postalCode, geocode });
  });
  return parsed;
};

export const parseLocation = location => {
  const street = location.toUpperCase().match(/([A-Z]+\s*)+/g)
    ? location
        .toUpperCase()
        .match(/([A-Z]+\s*)+/g)[0]
        .trim()
    : null;
  const number = location.match(/[0-9]+/g) ? location.match(/[0-9]+/g)[0] : 0;
  return { street, number };
};

export default {
  getImages,
  readFile,
  notification,
  postRequest,
  getAdresses,
  parseLocation,
  parseResponse
};
