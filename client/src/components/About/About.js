import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class About extends Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary
                keyboardFocused
                onClick={this.handleClose}
            />,
        ];

        return (
            <div>
                <RaisedButton label="About" onClick={this.handleOpen} />
                <Dialog
                    title="About Boomtown"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <p>
                        Boomtown is a web app where you can share and borrow
                        items with your local community. As of now you can
                        create an account, login, see items that available, see
                        profiles, and create an Item to share with the
                        community.
                    </p>
                    <p>
                        Environment: React.js, Express.js, Firebase,
                        PostgresSQL, GraphQL, Redux.
                    </p>
                    <p>
                        ToDo: - Borrow Mutation. - Edit Profile information. -
                        Change state handler from Redux to GraphQL.
                    </p>
                </Dialog>
            </div>
        );
    }
}
