import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import Gravatar from "react-gravatar";
import moment from "moment";

import PropTypes from "prop-types";
// import Styles from "./styles.js";

// import Items from "../../components/ItemCard/ItemCard";
// import FlatButton from "material-ui/FlatButton";

// avatar={<Gravatar email={item.itemowner.email} />}

const ItemCard = ({ item }) => (
  <div className="itemsContainer">
    <Card>
      <CardHeader
        title={item.itemowner.fullname}
        subtitle={moment(item.created).fromNow()}
      />
      {/* {item.borrower ? (   ...) */}
      <CardMedia>
        <img src={item.imageurl} alt={item.title} />
      </CardMedia>
      {/* <Link> */}
      <CardTitle title={item.title} subtitle={item.tags[0]} />
      {/* </Link> */}
      <CardText>{item.description}</CardText>
      <CardActions>
        {item.borrower && <RaisedButton label="Borrow" secondary={true} />}
      </CardActions>
    </Card>
  </div>
);

ItemCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemCard;
