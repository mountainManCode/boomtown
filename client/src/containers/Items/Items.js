import React from "react";
import Masonry from "react-masonry-component";

import PropTypes from "prop-types";
import ItemCard from "../../components/ItemCard/ItemCard";

// import Styles from "./styles.js";

const Items = ({ list }) => (
  <section className={"itemsContainer"}>
    <Masonry className={"itemsList"} elementType={"div"}>
      {list.map(item => (
        <div className={"single-item-card"} key={item.id}>
          <ItemCard item={item} key={item.id} />
        </div>
      ))}
    </Masonry>
  </section>
);
Items.propTypes = {
  list: PropTypes.array.isRequired
};

export default Items;

// this.props.list.length &&
