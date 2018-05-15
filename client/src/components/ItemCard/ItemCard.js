import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import Avatar from 'material-ui/Avatar';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';

import PropTypes from 'prop-types';
// import Styles from "./styles.js";

// import Items from "../../components/ItemCard/ItemCard";
// import FlatButton from "material-ui/FlatButton";

const ItemCard = ({ item }) => (
    <div className="itemCardContainer">
        <Card>
            {item.borrower ? (
                <CardMedia
                    overlay={
                        <CardTitle
                            subtitle={`Lent to ${item.borrower.fullname}`}
                        />
                    }
                >
                    <img src={item.imageurl} alt={item.title} />
                </CardMedia>
            ) : (
                <CardMedia>
                    <img src={item.imageurl} alt={item.title} />
                </CardMedia>
            )};
            <Link to={`profile/${item.itemowner.id}`}>
                <CardHeader
                    title={item.itemowner.fullname}
                    subtitle={moment(item.created).fromNow()}
                    avatar={<Avatar src={item.itemowner.imageurl} size={50} />}
                />
            </Link>
            <CardTitle
                title={item.title}
                subtitle={item.tags.map(tag => tag.title).join(', ')}
            />
            <CardText>{item.description}</CardText>
            <CardActions>
                {item.borrower && <RaisedButton label="Borrow" secondary />}
            </CardActions>
        </Card>
    </div>
);

ItemCard.propTypes = {
    item: PropTypes.object.isRequired,
};

export default ItemCard;
