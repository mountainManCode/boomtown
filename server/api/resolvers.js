const fetch = require("node-fetch");
const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

//

const resolveFunctions = {
  Query: {
    items() {
      return fetch(ITEMS_URL).then(r => r.json());
    },
    users() {
      return fetch(USERS_URL).then(r => r.json());
    },
    user(root, { id }) {
      return fetch(`${USERS_URL}/${id}`).then(r => r.json());
    },
    item(root, { id }) {
      return fetch(`${ITEMS_URL}/${id}`).then(r => r.json());
    }
  },
  Item: {
    itemowner(item) {
      return fetch(`${USERS_URL}/${item.itemowner}`).then(r => r.json());
    },
    borrower(item) {
      if (item.borrower) {
        return fetch(`${USERS_URL}/${item.borrower}`).then(r => r.json());
      } else {
        return null;
      }
    },
    async tags(item) {
      const theItem = await fetch(`${ITEMS_URL}/${item.id}`).then(r =>
        r.json()
      );
      return theItem.tags;
    }
  },
  User: {
    shareditems(user) {
      return fetch(`${ITEMS_URL}/?itemowner=${user.id}`).then(r => r.json());
    }
  }
};

module.exports = resolveFunctions;
