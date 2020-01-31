const {
  items: { insertImage, insertItem, insertRelation }
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

module.exports = {
  postItem
};
