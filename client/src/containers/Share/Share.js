import React from 'react';

import PropTypes from 'prop-types';
import firebase from 'firebase';
import Placeholder from '../../images/item-placeholder.jpg';
import FlatButton from 'material-ui/FlatButton';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
} from 'material-ui/Card';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import Moment from 'moment';
import Gravatar from 'react-gravatar';
// import FilterMenu from "../../components/FilterMenu";

// import Material UI components
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { gql, graphql } from "react-apollo";
// import { Redirect } from "react-router-dom";
// import { FirebaseStorage, FirebaseAuth } from "../../config/firebase";
// import {
//   updateStepIndex,
//   setItemImageUrl,
//   completeSignupForm,
//   resetShareForm
// } from "../../redux/modules/share";

import './style.css';

class Share extends React.Component {
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

    // Handlers for custom functionality
    // https://time2hack.com/2017/10/upload-files-to-firebase-storage-with-javascript/

    handleSelectClick = () => document.getElementById('imageInput').click();

    handleImageUpload = input => {
        console.log(input.target.files[0].name);
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
                console.log(url);
                // document.querySelector('#someImageTagID').src = url;
            })
            .catch(error => {
                console.error(error);
            });
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
                    onClick={this.handleNext}
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
        const { finished, stepIndex } = this.state;

        return (
            <div className="share-container">
                <section className="share-preview-card">
                    <Card style={{}} className="card">
                        <CardMedia className="card-media">
                            <img src={Placeholder} alt="placeholder" />
                        </CardMedia>

                        <CardHeader
                            title="Billy Bob"
                            subtitle={Moment().fromNow()}
                            avatar={
                                <Gravatar
                                    className="photo"
                                    email="aa.griff9@gmail.com"
                                />
                            }
                        />

                        <CardTitle title="Item Title" />

                        <CardText>Item description.</CardText>
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
                                    onClick={this.handleSelectClick}
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
                                <TextField hintText="Title" />
                                <br />
                                <TextField hintText="Description" />
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

export default Share;
