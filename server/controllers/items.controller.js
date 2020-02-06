const {
  items: { insertImage, insertItem, insertRelation, getByLocation }
} = require("../api");

const postItem = async (req, res) => {
  console.log("the req", req);
  const { name, images, latitude, longitude } = req.body;
  const imagesIds = images.map((img, index) =>
    insertImage({ name: `${name}(${index})`, data: img })
  );
  const ids = await Promise.all(imagesIds).then(response => response);
  const itemId = await insertItem({ name, latitude, longitude });
  return ids.map(imageId => insertRelation({ itemId, imageId }));
};

const getAdresses = async (req, res) => {
  const { street, number } = req.query;
  // console.log("the stuff", street, number);
  const response = await getByLocation(street, number);
  console.log(response.results[0].locations, response.results[0]);
  // return response.results[0].locations;
  res.status(200).json(response.results[0].locations);
};

const getAllItems = (req, res) => {
  console.log("got here", req);
};

module.exports = {
  postItem,
  getAdresses
};
