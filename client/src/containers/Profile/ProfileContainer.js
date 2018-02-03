import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

// import { fetchProfile } from '../../redux/modules/profile';
import Profile from './Profile';
// import Loader from "../../components/Loader";

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

const getUser = gql`
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

export default graphql(getUser, {
    options: ({ match }) => ({ variables: { id: match.params.userid } }),
})(ProfileContainer);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// // import PropTypes from 'prop-types';

// import { fetchProfile } from '../../redux/modules/profile';
// import Profile from './Profile';
// // import Loader from "../../components/Loader";

// class ProfileContainer extends Component {
//     // static propTypes = {};

//     componentDidMount() {
//         this.props.dispatch(fetchProfile(this.props.match.params.userid));
//     }

//     render() {
//         // if (this.props.isLoading) return <Loader />;
//         return <Profile list={this.props.user} />;
//     }
// }

// const mapStateToProps = state => ({
//     isLoading: state.profile.isLoading,
//     user: state.profile.items,
//     error: state.profile.error,
// });

// export default connect(mapStateToProps)(ProfileContainer);

// const mapStateToProps = state => ({
//     isLoading: state.profile.isLoading,
//     user: state.profile.items,
//     error: state.profile.error,
// });

// query fetchUser($id:ID) {
// 	user(id: $id) {
//     id
//     email
//     fullname
//     imageurl

//     shareditems {
//       id
//       title
//       created
//       itemowner {
//         id
//         email
//         fullname
//       }
//       borrower {
//         id
//         fullname
//       }
//       imageurl
//       description
//       available
//       tags {
//         id
//         title
//       }

//     }
//   }
// }
