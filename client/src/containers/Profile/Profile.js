import React from "react";
import Masonry from "react-masonry-component";
import Items from "../Items/Items";
import PropTypes from "prop-types";
// import ItemCard from "../../components/ItemCard/ItemCard";

import "./style.css";

const Profile = ({ list }) => {
  return (
    <section className={"profileContainer"}>
      <div className={"ownerContainer"}>
        <h2 className="ownerName">{list[0] && list[0].itemowner.fullname}</h2>
        <div className={"itemsShared"}>
          {/* {list[0[ && list.reduce((accu, item) => {
            return accu + item;
          })} */}
        </div>
        <div className={"itemsBorrowed"} />
      </div>

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
