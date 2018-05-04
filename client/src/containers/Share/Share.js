import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
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

// const SubmitNewItem = gql`
//     mutation createNewItem(
//         $title: String
//         $description: String
//         $imageurl: String
//         $itemowner: ID
//         $tags: [TagInput]
//     ) {
//         createNewItem(
//             newItem: {
//                 title: $title
//                 description: $description
//                 imageurl: $imageurl
//                 itemowner: $itemowner
//                 tags: $tags
//             }
//         ) {
//             title
//         }
//     }
// `;

class Share extends Component {
    state = {
        finished: false,
        stepIndex: 0,
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

    renderStepActions(step) {
        const { finished, stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                {!finished && (
                    <RaisedButton
                        label={stepIndex !== 3 ? 'Next' : null}
                        disableTouchRipple
                        disableFocusRipple
                        primary
                        onClick={this.handleNext}
                        style={{ marginRight: 12 }}
                    />
                )}
                {finished && (
                    <RaisedButton
                        label={stepIndex === 3 ? 'Confirm' : null}
                        disableTouchRipple
                        disableFocusRipple
                        primary
                        onClick={e => {
                            e.preventDefault();
                            this.props.handleSubmit(e);
                        }}
                        style={{ marginRight: 12 }}
                    />
                )}
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

        const {
            handleImageSelect,
            handleImageUpload,
            handleItemDescription,
            handleItemTitle,
            handleSelectFilter,
            handleSubmit,
        } = this.props;

        // console.log(this.state);
        // console.log(this.props);

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
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                            this.props.handleSubmit();
                        }}
                    >
                        <Stepper activeStep={stepIndex} orientation="vertical">
                            <Step>
                                <StepLabel style={{ color: '#fff' }}>
                                    Add an Image
                                </StepLabel>
                                <StepContent>
                                    <p>
                                        We live in a visual culture. Upload an
                                        image of the item you are sharing.
                                    </p>
                                    <RaisedButton
                                        label="Select an Image"
                                        onClick={e => {
                                            handleImageSelect(e);
                                        }}
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={e => {
                                                handleImageUpload(e);
                                            }}
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
                                        Folks need to know what you are sharing.
                                        Give them a clue by adding a title &
                                        description.
                                    </p>
                                    <TextField
                                        hintText="Title"
                                        value={this.props.currentState.title}
                                        onChange={e => {
                                            handleItemTitle(e);
                                        }}
                                    />
                                    <br />
                                    <TextField
                                        hintText="Description"
                                        value={
                                            this.props.currentState.description
                                        }
                                        onChange={e => {
                                            handleItemDescription(e);
                                        }}
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
                                        list of categories. You can select
                                        multiple categories.
                                    </p>
                                    <SelectField
                                        className="headerFilter"
                                        multiple
                                        autoWidth
                                        floatingLabelText="Filter by Tag"
                                        onChange={e => {
                                            handleSelectFilter(e);
                                        }}
                                        value={this.selectedFilters}
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
                                        Great! If you are happy with everything,
                                        tap the Confirm button.
                                    </p>
                                    {this.renderStepActions(3)}
                                </StepContent>
                            </Step>
                        </Stepper>
                    </form>
                </section>
            </div>
        );
    }
}

export default Share;

// const mapStateToProps = state => ({
//     isLoading: state.items.isLoading,
//     // items: state.items.items,
//     filterValue: state.filter.filterValue,
//     filters: state.filter.filters,
//     selectedFilters: state.filter.selectedFilters,
//     // error: state.items.error,
// });
