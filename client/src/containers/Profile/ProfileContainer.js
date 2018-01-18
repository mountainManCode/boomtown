import React, { Component } from "react";
import Profile from "./Profile";

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      users: []
      // userid: this.props.match.params.userid
    };
  }

  componentDidMount() {
    //TODO: fetch JSON and attach state!
    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());

    Promise.all([items, users]).then(response => {
      const [itemsList, usersList] = response;
      // console.log(itemsList);
      const combined = itemsList.map(item => {
        item.itemowner = usersList.find(user => user.id === item.itemowner);
        return item;
      });

      let items = combined.filter(item => {
        return item.itemowner.fullname === "Mandi Wise";
      });

      // console.log(items);

      this.setState({ items: items });
    });
  }

  // console.log(response);
  // TODO: Merge the 2 lists together, into a single list.
  // Attach the new list to state, and pass that list into the items component.
  // the Items component should render the new list!

  render() {
    if (this.state.items === undefined) {
      return false;
    } else {
      return <Profile list={this.state.items} />;
    }
  }
}
