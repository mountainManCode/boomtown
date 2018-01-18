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
import Items from "../Items/Items";
import PropTypes from "prop-types";
// import ItemCard from "../../components/ItemCard/ItemCard";

import "./style.css";
// avatar={<Gravatar email={list[0].item.itemowner.email} />}

const Profile = ({ list }) => {
  return (
    <section className={"profileContainer"}>
      <Card>
        <CardHeader
          className={"ownerContainer"}
          title={list[0] && list[0].itemowner.fullname}
        />
        {/* <div className={"itemsShared"}>
          {list[0[ && list.reduce((accu, item) => {
            return accu + item;
          })} */}
      </Card>

      <Items list={list} />

      {/* <Masonry className={"itemsList"} elementType={"div"}>
        {list.map(item => (
          <div className={"single-item-card"} key={item.id}>
            <ItemCard item={item} key={list.item.id} />
          </div>
        ))}
      </Masonry> */}
    </section>
  );
};

Profile.propTypes = {
  list: PropTypes.array.isRequired
};

export default Profile;
