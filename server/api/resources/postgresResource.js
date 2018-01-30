const { Client } = require("pg");

module.exports = async app => {
  const client = new Client({
    user: app.get("PGUSER"),
    host: app.get("PGHOST"),
    database: app.get("PGDATABASE"),
    password: app.get("PGPASSWORD"),
    port: app.get("PGPORT")
  });

  await client.connect();

  return {
    getItems() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items", (err, res) => {
          resolve(res.rows);
        });
      });
    },

    getItem(id) {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items WHERE id = $1", [id], (err, res) => {
          resolve(res.rows);
        });
      });
    },
    getTags() {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT * FROM tags WHERE id = $1",
          [itemid],
          (err, res) => {
            resolve(res.rows);
          }
        );
      });
    },
    createItem(id) {
      return;
    },
    updateItem(id) {
      return;
    }
  };
};
