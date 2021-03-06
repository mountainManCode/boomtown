const { Client } = require('pg');

module.exports = async app => {
  const client =
    process.env.NODE_ENV === 'production'
      ? new Client({ connectionString: process.env.DATABASE_URL })
      : new Client({
          user: app.get('PGUSER'),
          host: app.get('PGHOST'),
          database: app.get('PGDATABASE'),
          password: app.get('PGPASSWORD'),
          port: app.get('PGPORT')
        });

  await client.connect();

  return {
    getSharedItems(userid) {
      return new Promise((resolve, reject) => {
        client.query(
          'SELECT * FROM items WHERE itemowner = $1',
          [userid],
          (err, data) => {
            resolve(data.rows);
          }
        );
      });
    },
    getItems() {
      return new Promise((resolve, reject) => {
        client.query('SELECT * FROM items;', (err, res) => {
          resolve(res.rows);
        });
      });
    },
    getTags() {
      return new Promise((resolve, reject) => {
        client.query('SELECT * FROM tags', (err, res) => {
          resolve(res.rows);
        });
      });
    },

    getItem(id) {
      return new Promise((resolve, reject) => {
        client.query('SELECT * FROM items WHERE id = $1', [id], (err, res) => {
          resolve(res.rows);
        });
      });
    },
    getNumItemsBorrowed(userid) {
      return new Promise((resolve, reject) => {
        client.query(
          'SELECT * FROM items WHERE borrower = $1',
          [userid],
          (err, data) => {
            resolve(data.rows);
          }
        );
      });
    },
    getItemTags(itemid) {
      return new Promise((resolve, reject) => {
        client.query(
          `SELECT * FROM tags 
        INNER JOIN itemtags ON itemtags.tagid = tags.id
        WHERE itemtags.itemid=$1`,
          [itemid],
          (err, data) => {
            // console.log(data);
            resolve(data.rows);
          }
        );
      });
    },
    async createNewItem({ title, description, imageurl, itemowner, tags }) {
      const itemValues = [title, description, imageurl, itemowner];

      tags = tags.map(t => t.id);

      const itemInsertQuery = `INSERT INTO items(title, description, imageurl, itemowner) VALUES($1, $2, $3, $4) RETURNING *`;

      try {
        await client.query('BEGIN');
        const itemResult = await client.query(itemInsertQuery, itemValues);

        const tagsInsertQuery = `INSERT INTO itemtags(itemid, tagid) VALUES ${generateTagsInsert(
          tags
        )}`;

        await client.query(tagsInsertQuery, [itemResult.rows[0].id, ...tags]);

        await client.query('COMMIT');

        return itemResult.rows[0];
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      }
    },
    //TODO
    updateItem(id) {
      return;
    }
  };
};

const generateTagsInsert = tags =>
  tags.map((tag, index) => `($1, $${index + 2})`).join(', ');
