import React, { Component } from 'react';
import { graphql, compose, Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { FirebaseStorage, firebaseAuth } from '../../config/firebase';
import { setFilterValue, resetTags } from '../../redux/modules/filter';
import Placeholder from '../../images/item-placeholder.jpg';
import Share from './Share';
import TagSelectFilter from '../../components/TagSelectFilter/TagSelectFilter';
import './style.css';

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

class ShareContainer extends Component {
    state = {
        finished: false,
        stepIndex: 0,
        title: 'Awesome Item!',
        description: 'Some Cool Stuff!',
        created: Date.now(),
        imageurl: '',
        itemowner: 'ol1hO7xyPUM7JChl5vJYswhwqZw2',
        tags: [],
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
            });
        } catch (error) {
            console.log('Error sending mutation:', error);
        }
        this.props.dispatch(resetTags());
        // this.props.history.push('/');
    };

    render() {
        return (
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
            />
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    // items: state.items.items,
    // filterValue: state.filter.filterValue,
    tagsList: state.filter.tagsList,
    tagsSelected: state.filter.tagsSelected,
    // error: state.items.error,
});

export default compose(
    withApollo,
    graphql(SubmitNewItem),
    connect(mapStateToProps),
)(ShareContainer);

// export default ShareContainer;
