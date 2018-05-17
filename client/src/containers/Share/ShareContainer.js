import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { firebaseAuth } from '../../config/firebase';
import { resetTags } from '../../redux/modules/filter';

import ItemPlaceholderImage from '../../images/ItemPlaceholderImage.jpg';
import Share from './Share';
// import TagSelectFilter from '../../components/TagSelectFilter/TagSelectFilter';
import './style.css';

// GRAPHQL QUERIES / MUTATION
const SubmitNewItem = gql`
    mutation addNewItem(
        $title: String
        $description: String
        $imageurl: String
        $itemowner: ID
        $tags: [TagInput]
    ) {
        createNewItem(
            newItem: {
                title: $title
                description: $description
                imageurl: $imageurl
                itemowner: $itemowner
                tags: $tags
            }
        ) {
            title
        }
    }
`;

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

const fetchUser = gql`
    query fetchUser($id: ID) {
        user(id: $id) {
            fullname
            imageurl
        }
    }
`;
class ShareContainer extends Component {
    state = {
        finished: false,
        stepIndex: 0,
        title: 'One Rad Item',
        description: 'Too cool for school!',
        created: Date.now(),
        imageurl: ItemPlaceholderImage,
        itemowner: firebaseAuth.currentUser.uid,
        tags: this.props.tagsSelected,
    };

    handleNext = () => {
        const { stepIndex } = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const { stepIndex } = this.state;
        if (stepIndex > 0) {
            this.setState({ stepIndex: stepIndex - 1 });
        }
    };

    // Upload an image from local storage/computer.
    // https://time2hack.com/2017/10/upload-files-to-firebase-storage-with-javascript/

    handleImageSelect = () => document.getElementById('imageInput').click();

    handleImageUpload = input => {
        const { imageurl } = this.state;
        // create firebase storage reference
        const ref = firebase.storage().ref();
        // get the file to be uploaded from the input[type="file"]
        const file = input.target.files[0];
        const name = `${+new Date()}-${file.name}`;
        const metadata = {
            contentType: file.type,
        };
        const task = ref.child(name).put(file, metadata);
        task
            .then(snapshot => {
                const url = snapshot.downloadURL;
                this.setState({ imageurl: url });
                console.log(url);
            })
            .catch(error => {
                console.log(error);
            });
    };

    // HANDLE MUTATION

    handleItemTitle = e => {
        const { title } = this.state;
        this.setState({ title: e.target.value });
    };

    handleItemDescription = e => {
        const { description } = this.state;
        this.setState({ description: e.target.value });
    };

    // Submit the Mutation
    handleSubmit = async e => {
        e.persist();
        const { uid } = firebaseAuth.currentUser;
        const { title, description, imageurl, itemowner } = this.state;
        try {
            await this.props.mutate({
                variables: {
                    title,
                    description,
                    imageurl,
                    itemowner: uid,
                    tags: this.props.tagsSelected.map(tag => ({ id: tag })),
                },
                refetchQueries: [{ query: fetchItems }],
            });
        } catch (error) {
            console.log('Error sending mutation:', error);
        }
        this.props.dispatch(resetTags());
        this.props.history.push('/');
    };

    render() {
        const { user, loading } = this.props.fetchUser;

        return loading ? (
            <p>loading ...</p>
        ) : (
            <Share
                handleImageSelect={this.handleImageSelect}
                handleImageUpload={this.handleImageUpload}
                handleItemDescription={this.handleItemDescription}
                handleItemTitle={this.handleItemTitle}
                handleNext={this.handleNext}
                handlePrev={this.handlePrev}
                handleSelectFilter={this.handleSelectFilter}
                handleSubmit={this.handleSubmit}
                tagsList={this.props.tagsList}
                tagsSelected={this.props.tagsSelected}
                currentState={this.state}
                user={user}
            />
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    tagsList: state.filter.tagsList,
    tagsSelected: state.filter.tagsSelected,
});

export default compose(
    graphql(fetchUser, {
        name: 'fetchUser',
        options: () => ({
            variables: {
                id: firebaseAuth.currentUser.uid,
            },
        }),
    }),
    graphql(SubmitNewItem),
    graphql(fetchItems),
    connect(mapStateToProps),
)(ShareContainer);
