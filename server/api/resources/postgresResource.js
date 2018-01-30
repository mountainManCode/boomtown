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
          client.end();
        });
      });
    },

    getItem(id) {
      return;
    },
    getTags() {
      return;
    },
    createItem(id) {
      return;
    },
    updateItem(id) {
      return;
    }
  };
};
