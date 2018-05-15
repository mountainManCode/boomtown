import React from 'react';
import Masonry from 'react-masonry-component';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import PropTypes from 'prop-types';
import ItemCard from '../../components/ItemCard/ItemCard';
import AddItemButton from '../../components/AddItemButton/';
import styles from './styles';

const Items = ({ list }) => (
    <section className={'itemsContainer'}>
        <AddItemButton />

        <Masonry className={'itemsList'} elementType={'div'}>
            {list.map(item => (
                <div className={'itemCard'} key={item.id}>
                    <ItemCard item={item} key={item.id} />
                </div>
            ))}
        </Masonry>
    </section>
);
Items.propTypes = {
    list: PropTypes.array.isRequired,
};

export default Items;

// this.props.list.length &&
