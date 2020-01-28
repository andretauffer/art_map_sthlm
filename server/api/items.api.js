const { pool } = require("../db");

const insertItem = item =>
  pool
    .query(
      "INSERT INTO items (name, latitude, longitude, user_id) VALUES ($1, $2, $3, $4) RETURNING id",
      [item.name, item.latitude, item.longitude, item.user_id]
    )
    .then(data => data.rows[0].id);

const insertImage = image =>
  pool
    .query(
      "INSERT INTO images (name, data, user_id) VALUES ($1, $2, $3) RETURNING id ",
      [image.name, image.data, image.user_id]
    )
    .then(data => data.rows[0].id);

const insertRelation = relation =>
  pool.query("INSERT INTO items_images (item_id, image_id) VALUES ($1, $2)", [
    relation.itemId,
    relation.imageId
  ]);

module.exports = {
  insertItem,
  insertImage,
  insertRelation
};
