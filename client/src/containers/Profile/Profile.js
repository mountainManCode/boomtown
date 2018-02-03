import React from 'react';

import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import Masonry from 'react-masonry-component';

import PropTypes from 'prop-types';
// import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ItemCard from '../../components/ItemCard/ItemCard';

import './style.css';
// avatar={<Gravatar email={list[0].item.itemowner.email} />

// avatar={<Gravatar email={item.itemowner.email} />}

const Profile = ({ items, user }) => (
    // const itemsShared = list.title.length;

    <section className={'profileContainer'}>
        <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="profile-header">
                <div className="user-info">
                    <h1>{user.fullname}</h1>
                    <p>{user.bio}</p>
                </div>

                <div className="user-stats">
                    <p>
                        <span>{items.id}</span> Items shared
                    </p>
                    <p>
                        <span>{user.numborrowed}</span> Items borrowed
                    </p>
                </div>
                <Gravatar
                    email={user.email}
                    className="user-gravatar"
                    size={170}
                />
            </div>
        </Card>
        <Masonry className={'itemsList'} elementType={'div'}>
            {items.map(item => (
                <div className={'itemCard'} key={item.id}>
                    <ItemCard item={item} key={item.id} />
                </div>
            ))}
        </Masonry>
    </section>
);

Profile.propTypes = {
    // list: PropTypes.Array.isRequired,
};

export default Profile;
