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
import { setFilterValue } from '../../redux/modules/filter';
import { FirebaseStorage, FirebaseAuth } from '../../config/firebase';

import Placeholder from '../../images/item-placeholder.jpg';
import TagSelectFilter from '../../components/TagSelectFilter/TagSelectFilter';
import './style.css';

class Share extends Component {
    renderStepActions(step) {
        const { finished, stepIndex } = this.props.currentState;

        return (
            <div style={{ margin: '12px 0' }}>
                {!finished && (
                    <RaisedButton
                        label={stepIndex !== 3 ? 'Next' : null}
                        disableTouchRipple
                        disableFocusRipple
                        primary
                        onClick={this.props.handleNext}
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
                        onClick={this.props.handlePrev}
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
        } = this.props.currentState;

        const {
            handleImageSelect,
            handleImageUpload,
            handleItemDescription,
            handleItemTitle,
            handleSelectFilter,
            handleSubmit,
        } = this.props;

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
                                    <TagSelectFilter />
                                    {this.props.tagsSelected.length
                                        ? this.renderStepActions(2)
                                        : null}
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
