const { Client } = require("pg");
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

  client.query("SELECT NOW()", (err, res) => {
    console.log(err, res);
    client.end();
  });

  return {
    getItems() {
      return;
    },

    getItem() {
      return;
    }
  };
};
