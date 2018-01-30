const DataLoader = require("dataloader");

// allows to only send the request once, and cache the data for future pull

module.exports = ({ jsonResource: { getItems } }) => {
  return {
    getItems: new DataLoader(ids => Promise.all(ids.map(id => getItems(id))))
  };
};
