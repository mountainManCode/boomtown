import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import Moment from 'moment';
import Gravatar from 'react-gravatar';
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
} from 'material-ui/Card';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import firebase from 'firebase';
import Placeholder from '../../images/item-placeholder.jpg';
import './style.css';
import { setFilterValue } from '../../redux/modules/filter';
import { FirebaseStorage, FirebaseAuth } from '../../config/firebase';

class Share extends React.Component {
    state = {
        finished: false,
        stepIndex: 0,
        title: 'Awesome Item!',
        description: 'Some Cool Stuff!',
        imageurl: '',
        itemowner: '',
        tags: [],
    };

    // Handlers for custom functionality

    handleNext = () => {
        const { stepIndex } = this.state;
        // this.props.submit(this.state.title);
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
        // console.log(input.target.files[0].name);
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
        this.setState({ tags: event.target.value });
    };

    // handleSubmit = async () => {
    //     const { title, description, imageurl, itemowner, tags } = this.state;
    //     await this.props.postMutation({
    //         variables: {
    //             title,
    //             description,
    //             imageurl,
    //             itemowner,
    //             tags,
    //         },
    //     });
    // };

    handleSubmit = (title, description, imageurl, itemowner, tags) => {
        this.props.submit(this.state.title);
    };

    renderStepActions(step) {
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 3 ? 'Confirm' : 'Next'}
                    disableTouchRipple
                    disableFocusRipple
                    primary
                    onClick={
                        stepIndex === 3 ? this.handleSubmit : this.handleNext
                    }
                    style={{ marginRight: 12 }}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple
                        disableFocusRipple
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {
            finished,
            stepIndex,
            title,
            description,
            imageurl,
            itemowner,
            tags,
        } = this.state;

        // console.log(this.state);

        return (
            <div className="share-container">
                <section className="share-preview-card">
                    <Card style={{}} className="card">
                        <CardMedia className="card-media">
                            <img
                                src={imageurl || Placeholder}
                                alt="Image of new item"
                            />
                        </CardMedia>

                        <CardHeader
                            title="Mandi Wise"
                            subtitle={Moment().fromNow()}
                            avatar={
                                <Gravatar
                                    className="photo"
                                    email="{firebaseAuth.currentUser && firebaseAuth.currentUser.email}"
                                />
                            }
                        />

                        <CardTitle title={title} />

                        <CardText>{description}</CardText>
                    </Card>
                </section>

                <section className="share-item-form">
                    <Stepper activeStep={stepIndex} orientation="vertical">
                        <Step>
                            <StepLabel style={{ color: '#fff' }}>
                                Add an Image
                            </StepLabel>
                            <StepContent>
                                <p>
                                    We live in a visual culture. Upload an image
                                    of the item you're sharing.
                                </p>
                                <RaisedButton
                                    label="Select an Image"
                                    onClick={this.handleImageSelect}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={this.handleImageUpload}
                                        hidden
                                        id="imageInput"
                                    />
                                </RaisedButton>
                                {this.renderStepActions(0)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel style={{ color: '#fff' }}>
                                Add a Title & Description
                            </StepLabel>
                            <StepContent>
                                <p>
                                    Folks need to know what you're sharing. Give
                                    them a clue by adding a title & description.
                                </p>
                                <TextField
                                    hintText="Title"
                                    value={this.state.title}
                                    onChange={this.handleItemTitle}
                                />
                                <br />
                                <TextField
                                    hintText="Description"
                                    value={this.state.description}
                                    onChange={this.handleItemDescription}
                                />
                                {this.renderStepActions(1)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel style={{ color: '#fff' }}>
                                Categorize Your Item
                            </StepLabel>
                            <StepContent>
                                <p>
                                    To share an item, you will add it to our
                                    list of categories. You can select multiple
                                    categories.
                                </p>
                                {/* <FilterMenu /> */}
                                <SelectField
                                    className="headerFilter"
                                    multiple
                                    autoWidth
                                    floatingLabelText="Filter by Tag"
                                    onChange={this.handleSelectFilter}
                                    value={this.props.selectedFilters}
                                >
                                    {this.props.filters.map(tag => (
                                        <MenuItem
                                            insetChildren
                                            key={tag.title}
                                            checked={
                                                !!this.props.selectedFilters.find(
                                                    f => f === tag.title,
                                                )
                                            }
                                            value={tag.title}
                                            primaryText={tag.title}
                                            // .includes .some
                                        />
                                    ))}
                                </SelectField>
                                {this.renderStepActions(2)}
                            </StepContent>
                        </Step>
                        <Step>
                            <StepLabel style={{ color: '#fff' }}>
                                Confirm Things!
                            </StepLabel>
                            <StepContent>
                                <p>
                                    Great! If you are happy with everything, tap
                                    the Confirm button.
                                </p>
                                {this.renderStepActions(2)}
                            </StepContent>
                        </Step>
                    </Stepper>
                </section>
            </div>
        );
    }
}

const createNewItem = gql`
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
const mapStateToProps = state => ({
    isLoading: state.items.isLoading,
    // items: state.items.items,
    filterValue: state.filter.filterValue,
    filters: state.filter.filters,
    selectedFilters: state.filter.selectedFilters,
    // error: state.items.error,
});

export default compose(
    graphql(createNewItem, {
        //     name: 'postMutation',
        // }),

        props: ({ mutate }) => ({
            submit: (title, description, imageurl, itemowner, tags) =>
                mutate({
                    variables: {
                        title,
                        description,
                        imageurl,
                        itemowner,
                        tags,
                    },
                }),
        }),
    }),
    connect(mapStateToProps),
)(Share);
