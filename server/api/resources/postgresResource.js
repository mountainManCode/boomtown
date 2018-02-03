const { Client } = require("pg");

const tq = tags => tags.map((id, i) => `($1, $${i + 2})`).join(", ");

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
    getSharedItems(userid) {
      return new Promise((resolve, reject) => {
        client.query(
          "SELECT * FROM items WHERE itemowner = $1",
          [userid],
          (err, data) => {
            resolve(data.rows);
          }
        );
      });
    },
    getItems() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items", (err, data) => {
          resolve(data.rows);
        });
      });
    },

    getItem(id) {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items WHERE id = $1", [id], (err, data) => {
          resolve(data.rows);
        });
      });
    },
    getTags(id) {
      return new Promise((resolve, reject) => {
        client.query(
          `SELECT * FROM tags 
            INNER JOIN itemtags ON itemtags.tagid = tags.id
             WHERE itemtags.itemid = $1 
          `,
          [id],
          (err, data) => {
            resolve(data.rows);
          }
        );
      });
    },
    async createItem({ title, description, imageurl, itemowner, tags }) {
      const itemValues = [title, description, imageurl, itemowner];

      //Query expects array of tag ids
      tags = tags.map(t => t.id);

      const itemInsertQuery = `INSERT INTO items(title, description, imageurl, itemowner) 
            VALUES($1, $2, $3, $4) RETURNING *`;

      try {
        await client.query("BEGIN");
        const itemResult = await client.query(itemInsertQuery, itemValues);

        const tagsInsertQuery = `INSERT INTO itemtags(itemid, tagid) 
                  VALUES ${tq(tags)}`;

        const tagsResult = await client.query(tagsInsertQuery, [
          itemResult.rows[0].id,
          ...tags
        ]);

        await client.query("COMMIT");
        return itemResult.rows[0];
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      }
    },
    updateItem(id) {
      return;
    }
  };
};

// inner join itemtagson teemtags.itemid=
