import React from 'react';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import PropTypes from 'prop-types';

import './styles.css';

const AddItemButton = ({ item }) => (
    <div className="buttonContainer">
        <Link to={'/share'}>
            <FloatingActionButton
                label="Go to Share page."
                secondary
                className={'addItemButton'}
            >
                <ContentAdd />
            </FloatingActionButton>
        </Link>
    </div>
);

AddItemButton.propTypes = {
    // item: PropTypes.Object.isRequired,
};

export default AddItemButton;
