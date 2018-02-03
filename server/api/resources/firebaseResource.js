const firebase = require("firebase");

module.exports = app => {
  const firebaseApp = firebase.initializeApp(app.get("FIREBASE_CONFIG"));
  const db = firebaseApp.database();

  return {
    async getUsers() {
      let users = await db.ref("users").once("value");
      users = users.val();
      let userList = [];
      for (userid in users) {
        userList.push({
          id: userid,
          bio: users[userid].bio,
          email: users[userid].email,
          fullname: users[userid].fullname,
          imageurl: users[userid].imageurl
        });
      }
      console.log(userList);
      console.log(users);
      return userList;
    },
    async getUser(userid) {
      let user = await db.ref(`/users/${userid}`).once("value");
      user = user.val();
      return {
        id: userid,
        ...user
      };
    }
  };
};
