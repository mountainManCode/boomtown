import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Items from './Items';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
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
                    this.props.selectedFilters.includes(tag.title),
                ),
            );
        }
        return (
            <Items
                list={
                    this.props.selectedFilters.length === 0 ? items : filtered
                }
            />
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
    filterValue: state.filter.filterValue,
    filters: state.filter.filters,
    selectedFilters: state.filter.selectedFilters,
});

export default compose(graphql(fetchItems), connect(mapStateToProps))(
    ItemsContainer,
);
