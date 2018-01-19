import React from "react";

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import Gravatar from "react-gravatar";
import Masonry from "react-masonry-component";
import PropTypes from "prop-types";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

import "./style.css";
// avatar={<Gravatar email={list[0].item.itemowner.email} />

const Profile = ({ list }) => {
  return (
    <section className={"profileContainer"}>
      <Masonry className={"itemsList"} elementType={"div"}>
        {list.map(item => (
          <div className={"single-item-card"} key={item.id}>
            <ProfileCard item={item} key={item.id} />
          </div>
        ))}
      </Masonry>
    </section>
  );
};

Profile.propTypes = {
  list: PropTypes.array.isRequired
};

export default Profile;
