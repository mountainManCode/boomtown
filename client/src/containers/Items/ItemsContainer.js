import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchItemsAndUsers } from "../../redux/modules/items";
import Items from "./Items";
// import Loader from "../../components/Loader";

class ItemsContainer extends Component {
  static propTypes = {};

  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers());
  }

  render() {
    // if (this.props.isLoading) return <Loader />;
    return <Items list={this.props.items} />;
    console.log(this.props.items);
  }
}

const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  error: state.items.error
});

export default connect(mapStateToProps)(ItemsContainer);

// componentDidMount() {
//   //TODO: fetch JSON and attach state!
//   const items = fetch(ITEMS_URL).then(r => r.json());
//   const users = fetch(USERS_URL).then(r => r.json());

//   Promise.all([items, users]).then(response => {
//     const [itemsList, usersList] = response;

//     const combined = itemsList.map(item => {
//       item.itemowner = usersList.find(user => user.id === item.itemowner);
//       return item;
//     });

//     this.setState({ items: combined });
//   });
// }

// console.log(response);
// TODO: Merge the 2 lists together, into a single list.
// Attach the new list to state, and pass that list into the items component.
// the Items component should render the new list!
