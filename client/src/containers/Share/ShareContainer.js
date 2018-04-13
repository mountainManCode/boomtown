import React, { Component } from 'react';
import { graphql, compose, Mutation, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import Moment from 'moment';
// import Gravatar from 'react-gravatar';
// import {
//     Card,
//     CardHeader,
//     CardMedia,
//     CardTitle,
//     CardText,
// } from 'material-ui/Card';
// import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
// import TextField from 'material-ui/TextField';
import firebase from 'firebase';
import Placeholder from '../../images/item-placeholder.jpg';
import './style.css';
import { setFilterValue } from '../../redux/modules/filter';
import { FirebaseStorage, FirebaseAuth } from '../../config/firebase';

import Share from './Share';

const SubmitNewItem = gql`
    mutation createNewItem(
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

class ShareContainer extends Component {
    state = {
        // finished: false,
        // stepIndex: 0,
        title: 'Awesome Item!',
        description: 'Some Cool Stuff!',
        created: Date.now(),
        imageurl: '',
        itemowner: 'ol1hO7xyPUM7JChl5vJYswhwqZw2',
        tags: [],
    };

    // Handlers for custom functionality

    // handleNext = () => {
    //     const { stepIndex } = this.state;
    //     // this.props.submit(this.state.title);
    //     this.setState({
    //         stepIndex: stepIndex + 1,
    //         finished: stepIndex >= 2,
    //     });
    // };

    // handlePrev = () => {
    //     const { stepIndex } = this.state;
    //     if (stepIndex > 0) {
    //         this.setState({ stepIndex: stepIndex - 1 });
    //     }
    // };

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
                // console.error(error);
            });
    };

    // HANDLE MUTATION
    // https://marmelab.com/blog/2017/09/07/dive-into-graphql-part-iv-building-a-graphql-client-with-reactjs.html#calling-mutations

    handleItemTitle = e => {
        const { title } = this.state;
        this.setState({ title: e.target.value });
    };

    handleItemDescription = e => {
        const { description } = this.state;
        this.setState({ description: e.target.value });
    };

    handleSelectFilter = (event, index, selected) => {
        this.props.dispatch(setFilterValue(selected));
        this.setState({
            tags: this.props.selectedFilters,
            // event.target.value
        });
        // console.log(this.props.selectedFilters);
    };

    handleSubmit = () => {
        const { title, description, imageurl, itemowner, tags } = this.state;
        this.props.mutate({
            variables: {
                title,
                description,
                imageurl,
                itemowner,
                tags,
            },
        });
    };

    // title, description, imageurl, itemowner, tags
    // handleSubmit = item => {
    //     this.props.submit(
    //         this.state.title,
    //         this.state.description,
    //         this.state.imageurl,
    //         this.state.itemowner,
    //     );
    // };

    // handleSubmit = () => {
    //     console.log(this.props);
    //     const { title, description, imageurl, itemowner, tags } = this.state;
    //     this.props.createNewItem({
    //         variables: {
    //             title,
    //             description,
    //             imageurl,
    //             itemowner,
    //             tags,
    //         },
    //     });
    // };

    render() {
        return (
            <Share
                handleImageSelect={this.handleImageSelect}
                handleImageUpload={this.handleImageUpload}
                handleItemDescription={this.handleItemDescription}
                handleItemTitle={this.handleItemTitle}
                handleSelectFilter={this.handleSelectFilter}
                handleSubmit={this.handleSubmit}
                filters={this.props.filters}
                selectedFilters={this.props.selectedFilters}
            />
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    // items: state.items.items,
    filterValue: state.filter.filterValue,
    filters: state.filter.filters,
    selectedFilters: state.filter.selectedFilters,
    // error: state.items.error,
});

export default compose(
    withApollo,
    graphql(SubmitNewItem),

    //     props: ({ mutate }) => ({
    //         submit: (title, description, imageurl, itemowner, tags) =>
    //             mutate({
    //                 variables: {
    //                     title,
    //                     description,
    //                     imageurl,
    //                     itemowner,
    //                     tags,
    //                 },
    //             }),
    //     }),
    // }),
    connect(mapStateToProps),
)(ShareContainer);

// export default ShareContainer;
