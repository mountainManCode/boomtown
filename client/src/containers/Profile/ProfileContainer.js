import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Profile from './Profile';

class ProfileContainer extends Component {
    PropTypes = {
        loading: PropTypes.bool,
        profile: PropTypes.array,
        data: PropTypes.array,
    };

    render() {
        // if (this.props.isLoading) return <Loader />;
        const { loading, user } = this.props.data;
        return loading ? (
            <p>loading ...</p>
        ) : (
            <Profile items={user.shareditems} user={user} />
        );
    }
}

const fetchUser = gql`
    query getUser($id: ID) {
        user(id: $id) {
            id
            email
            fullname
            bio
            imageurl
            shareditems {
                id
                title
                created
                itemowner {
                    id
                    email
                    fullname
                }
                borrower {
                    id
                    fullname
                }
                imageurl
                description
                available
                tags {
                    id
                    title
                }
            }
        }
    }
`;

export default graphql(fetchUser, {
    options: ({ match }) => ({ variables: { id: match.params.userid } }),
})(ProfileContainer);
