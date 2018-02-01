const DataLoader = require("dataloader");

// allows to only send the request once, and cache the data for future pull

module.exports = ({
  postgresResource: { getItems, getTags, getItem },
  firebaseResource: { getUser }
}) => {
  return {
    getItems: new DataLoader(ids => Promise.all(ids.map(id => getItems(id)))),
    getItem: new DataLoader(ids => Promise.all(ids.map(id => getItem(id)))),
    getTags: new DataLoader(ids => Promise.all(ids.map(id => getTags(id)))),
    getUser: new DataLoader(ids => Promise.all(ids.map(id => getUser(id))))
  };
};
