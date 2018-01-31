import React, { Component } from 'react';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import style from './style.css';

export default class Share extends Component {
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
        const { stepIndex } = this.state;

        return (
            <div style={{ margin: '12px 0' }}>
                <RaisedButton
                    label={stepIndex === 3 ? 'Finish' : 'Next'}
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
            <div className="shareWrapper">
                <section className="itemPreviewContainer">
                    <p> Preview Container</p>
                </section>
                <section className="itemFormContainer">
                    <div
                        style={{
                            maxWidth: 380,
                            maxHeight: 500,
                            margin: 'auto',
                        }}
                    >
                        <Stepper activeStep={stepIndex} orientation="vertical">
                            <Step>
                                <StepLabel>Add an Image</StepLabel>
                                <StepContent>
                                    <p>
                                        We live in a visual culture. Upload an
                                        image of the item youre sharing.
                                    </p>
                                    {this.renderStepActions(0)}
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Create an ad group</StepLabel>
                                <StepContent>
                                    <p>
                                        An ad group contains one or more ads
                                        which target a shared set of keywords.
                                    </p>
                                    {this.renderStepActions(1)}
                                </StepContent>
                            </Step>
                            <Step>
                                <StepLabel>Create an ad</StepLabel>
                                <StepContent>
                                    <p>
                                        Try out different ad text to see what
                                        brings in the most customers, and learn
                                        how to enhance your ads using features
                                        like ad extensions. If you run into any
                                        problems with your ads, find out how to
                                        tell if they're running and how to
                                        resolve approval issues.
                                    </p>
                                    {this.renderStepActions(2)}
                                </StepContent>
                            </Step>
                        </Stepper>
                        {finished && (
                            <p
                                style={{
                                    margin: '20px 0',
                                    textAlign: 'center',
                                }}
                            >
                                <a
                                    href="#"
                                    onClick={event => {
                                        event.preventDefault();
                                        this.setState({
                                            stepIndex: 0,
                                            finished: false,
                                        });
                                    }}
                                >
                                    Click here
                                </a>{' '}
                                to reset the example.
                            </p>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}
