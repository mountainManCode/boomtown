import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Items from './Items';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import AddItemButton from '../../components/AddItemButton/';
import Styles from './styles';
// import Loader from "../../components/Loader";

class ItemsContainer extends Component {
    PropTypes = {
        loading: PropTypes.bool,
        items: PropTypes.array,
        data: PropTypes.array,
    };

    render() {
        const { loading, items, error } = this.props.data;
        let filtered = [];
        if (loading) {
            return <p> Loading ... </p>;
        } else if (error) {
            return <p>error</p>;
        } else if (items) {
            filtered = items.filter(item =>
                item.tags.some(tag =>
                    this.props.tagsSelected.includes(Number(tag.id)),
                ),
            );
        }
        return (
            <section style={Styles.itemsContainer}>
                <Items
                    list={
                        this.props.tagsSelected.length === 0 ? items : filtered
                    }
                />
            </section>
        );
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
                imageurl
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

// const fetchTags = gql`
//     query {
//         tags {
//             id
//             title
//         }
//     }
// `;

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    tagsList: state.filter.tagsList,
    tagsSelected: state.filter.tagsSelected,
});

export default compose(
    graphql(fetchItems),
    // graphql(fetchTags),
    connect(mapStateToProps),
)(ItemsContainer);
