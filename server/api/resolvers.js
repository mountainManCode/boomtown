module.exports = ({
  postgresResource: { getTags, getItem, getItems, getShareditems },
  firebaseResource: { getUser, getUsers }
}) => {
  return {
    Query: {
      items(root, args, context) {
        return context.loaders.getItems.load(args);
      },
      users() {
        return getUsers();
      },
      user(root, { id }, context) {
        return context.loaders.getUser.load(id);
      },
      item(root, { id }, context) {
        return context.loaders.getItem.load(id);
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
    },
    Item: {
      itemowner({ itemowner }, args, context) {
        return context.loaders.getUser.load(itemowner);
      },
      borrower(item) {
        if (item.borrower) {
          return getUser(item.borrower);
        } else {
          return null;
        }
      },
      tags(item, args, context) {
        return context.loaders.getTags.load(item.id);
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
