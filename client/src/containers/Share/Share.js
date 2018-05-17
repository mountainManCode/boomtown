import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import firebase from 'firebase';
// import { graphql, compose, withApollo } from 'react-apollo';
// import gql from 'graphql-tag';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import moment from 'moment';
import Avatar from 'material-ui/Avatar';
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
// import SelectField from 'material-ui/SelectField';
// import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
// import { setFilterValue } from '../../redux/modules/filter';
// import { FirebaseStorage, FirebaseAuth } from '../../config/firebase';

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
            user,
            currentState,
            tagsSelected,
        } = this.props;

        // PREVIEW OF ITEM CARD
        return (
            <div className="share-container">
                <section className="share-preview-card">
                    <Card>
                        <CardMedia>
                            <img src={imageurl} alt={currentState.title} />
                        </CardMedia>
                        <Link to={`profile/${currentState.itemowner}`}>
                            <CardHeader
                                title={user.fullname}
                                subtitle={moment(
                                    currentState.created,
                                ).fromNow()}
                                avatar={
                                    <Avatar src={user.imageurl} size={50} />
                                }
                            />
                        </Link>
                        <CardTitle
                            title={currentState.title}
                            subtitle={tags.map(tag => tag.title).join(', ')}
                        />
                        <CardText>{currentState.description}</CardText>
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
