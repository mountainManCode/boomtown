import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
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

const ProfileCard = ({ item }) => (
  <div className="itemsContainer">
    <Card>
      {item.borrower ? (
        <CardMedia
          overlay={<CardTitle subtitle={`Lent to ${item.borrower.fullname}`} />}
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
          avatar={<Gravatar email={item.itemowner.email} />}
        />
      </Link>
      <CardTitle title={item.title} subtitle={item.tags[0]} />
      <CardText>{item.description}</CardText>
      <CardActions>
        {item.borrower && <RaisedButton label="Borrow" secondary={true} />}
      </CardActions>
    </Card>
  </div>
);

ProfileCard.propTypes = {
  item: PropTypes.object.isRequired
};

export default ProfileCard;
