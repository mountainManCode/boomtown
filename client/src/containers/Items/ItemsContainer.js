import React, { Component } from "react";
import Items from "./Items";

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

export default class ItemsContainer extends Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentDidMount() {
    //TODO: fetch JSON and attach state!
    const items = fetch(ITEMS_URL).then(r => r.json());
    const users = fetch(USERS_URL).then(r => r.json());

    Promise.all([items, users]).then(response => {
      const [itemsList, usersList] = response;

      const combined = itemsList.map(item => {
        item.itemowner = usersList.find(user => user.id === item.itemowner);
        return item;
      });

      this.setState({ items: combined });
    });
  }

  // console.log(response);
  // TODO: Merge the 2 lists together, into a single list.
  // Attach the new list to state, and pass that list into the items component.
  // the Items component should render the new list!

  render() {
    return <Items list={this.state.items} />;
  }
}
