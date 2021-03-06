module.exports = ({
  postgresResource: {
    getItemTags,
    getTags,
    getItem,
    getItems,
    getShareditems,
    createNewUserAuth,
    createNewItem
  },
  firebaseResource: { getUser, getUsers }
}) => {
  return {
    Query: {
      items(root, args, context) {
        return context.loaders.getItems.load(args);
      },
      users(root, { args }, context) {
        return context.loaders.getUsers.load(args);
      },
      tags() {
        return getTags();
      },
      user(root, { id }, context) {
        return context.loaders.getUser.load(id);
      },
      item(root, { id }, context) {
        return context.loaders.getItem.load(id);
      }
    },
    Mutation: {
      createNewUserAuth(root, { newUser }) {
        console.log(newUser);
        return createNewUserAuth(newUser);
      },
      createNewItem(root, { newItem }) {
        return createNewItem(newItem);
      }

      // updateItem(root, { newItem: { id, borrower: { fullname, email } } }) {
      //   return updateItem(id, borrower);
      // { fullname, email };
      // }
    },
    Item: {
      itemowner(item) {
        return getUser(item.itemowner);
      },
      borrower(item) {
        if (item.borrower) {
          return getUsers(item.borrower);
        } else {
          return null;
        }
      },
      tags(item, args, context) {
        return context.loaders.getItemTags.load(item.id);
      }
    },
    User: {
      shareditems(user, args, context) {
        return context.loaders.getSharedItems.load(user.id);
      }
      // async numborrowed({ id }, args, context) {
      //   const i = await context.loaders.getNumItemsBorrowed.load(id);
      //   return i.length;
      // }
    }
  };
};
