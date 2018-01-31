const DataLoader = require("dataloader");

// allows to only send the request once, and cache the data for future pull

module.exports = ({ postgresResource: { getItems } }) => {
  return {
    getItems: new DataLoader(ids => Promise.all(ids.map(id => getItems(id))))
    // getTags: new DataLoader(ids => Promise.all(ids.map(id => getTags(id))))
  };
};
