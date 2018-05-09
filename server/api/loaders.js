const DataLoader = require('dataloader');

// allows to only send the request once, and cache the data for future pull

module.exports = ({
  postgresResource: { getItems, getItem, getTags, getItemTags, getSharedItems },
  firebaseResource: { getUsers, getUser }
}) => {
  return {
    getItems: new DataLoader(ids => Promise.all(ids.map(id => getItems(id)))),
    getItem: new DataLoader(ids => Promise.all(ids.map(id => getItem(id)))),
    getTags: new DataLoader(ids => Promise.all(ids.map(id => getTags(id)))),
    getItemTags: new DataLoader(ids =>
      Promise.all(ids.map(id => getItemTags(id)))
    ),
    getUsers: new DataLoader(ids => Promise.all(ids.map(id => getUsers(id)))),
    getUser: new DataLoader(ids => Promise.all(ids.map(id => getUser(id)))),
    getSharedItems: new DataLoader(ids =>
      Promise.all(ids.map(id => getSharedItems(id)))
    )
  };
};
