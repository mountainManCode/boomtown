module.exports = ({
  jsonResource: { getItem, getUser, getUsers, shareditems }
}) => {
  return {
    Query: {
      items(root, args, context) {
        return context.loaders.getItems.load(args);
      },
      users() {
        return getUsers();
      },
      user(root, { id }) {
        return getUser(id);
      },
      item(root, { id }) {
        return getitem(id);
      }
    },
    Mutation: {
      updateItem(root, { currentItem: { title } }) {
        return { title };
      },

      addItem(root, { newItem: { title } }) {
        // save the new item to the database.
        // Must return Item Type thanks to our mutation schema.

        return { title };
      }

      // borrowerOfItem(root, { id, borrower: { fullname, email } }) {
      //   return { fullname, email };
      // }
    },
    Item: {
      itemowner(item) {
        return getUser(item.itemowner);
      },
      borrower(item) {
        if (item.borrower) {
          return getUser(item.borrower);
        } else {
          return null;
        }
      },
      async tags(item) {
        const theItem = await getItem(item.id);
        return theItem.tags;
      }
    },
    User: {
      shareditems(user) {
        return getSharedItems(user.id);
      }
    }
  };
};

// retrun context.loaders.
