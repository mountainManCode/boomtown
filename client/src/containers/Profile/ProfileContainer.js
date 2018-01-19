import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchItemsAndUsers } from "../../redux/modules/items";
import Profile from "./Profile";
import Items from "../Items/Items";
// import Loader from "../../components/Loader";

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      users: [],
      userid: this.props.match.params.userid
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchItemsAndUsers());
  }

  render() {
    // if (this.props.isLoading) return <Loader />;
    return <Profile user={this.props.users} list={this.props.items} />;
    console.log(this.props.users);
  }
}

const mapStateToProps = state => ({
  isLoading: state.items.isLoading,
  items: state.items.items,
  profile: state.items.users,
  error: state.items.error
});

export default connect(mapStateToProps)(ProfileContainer);

// import React, { Component } from "react";
// import Profile from "./Profile";

// const ITEMS_URL = "http://localhost:4000/items";
// const USERS_URL = "http://localhost:4000/users";

// export default class ProfileContainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       users: []
//       // userid: this.props.match.params.userid
//     };
//   }

//   componentDidMount() {
//     //TODO: fetch JSON and attach state!
//     const items = fetch(ITEMS_URL).then(r => r.json());
//     const users = fetch(USERS_URL).then(r => r.json());

//     Promise.all([items, users]).then(response => {
//       const [itemsList, usersList] = response;
//       // console.log(itemsList);
//       const combined = itemsList.map(item => {
//         item.itemowner = usersList.find(user => user.id === item.itemowner);
//         return item;
//       });

//       let items = combined.filter(item => {
//         return item.itemowner.fullname === "Mandi Wise";
//       });

//       // console.log(items);

//       this.setState({ items: items });
//     });
//   }

//   // console.log(response);
//   // TODO: Merge the 2 lists together, into a single list.
//   // Attach the new list to state, and pass that list into the items component.
//   // the Items component should render the new list!

//   render() {
//     if (this.state.items === undefined) {
//       return false;
//     } else {
//       return <Profile list={this.state.items} />;
//     }
//   }
// }
