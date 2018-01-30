import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import items, { fetchItemsAndUsers } from '../../redux/modules/items';
import Items from './Items';
// import HeaderBar from '../../components/HeaderBar/HeaderBar';
// import Loader from "../../components/Loader";

class ItemsContainer extends Component {
    PropTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        data: PropTypes.array,
    };

    render() {
        const { loading, items } = this.props.data;
        return loading ? <p>loading ...</p> : <Items list={items} />;
    }
}

const fetchItems = gql`
    query {
        items {
            title
            id: id
            itemowner {
                id
                fullname
                email
            }
            borrower {
                id
                fullname
            }
            imageurl
            description
            available
            created
            tags {
                id
                title
            }
        }
    }
`;

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    // items: state.items.items,
    filterValue: state.filter.filterValue,
    filters: state.filter.filters,
    selectedFilters: state.filter.selectedFilters,
    // error: state.items.error,
});

export default compose(graphql(fetchItems), connect(mapStateToProps))(
    ItemsContainer,
);

// return (
//     <Items
//         list={this.props.items.filter(item => {
//             if (!this.props.selectedFilters.length) {
//                 return true;
//             }
//             return item.tags.some(tag =>
//                 this.props.selectedFilters.includes(tag.title),
//             );

//             /* return item.tags.includes(this.props.selectedFilters); */
//         })}
//     />

// (mapStateToProps)
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
