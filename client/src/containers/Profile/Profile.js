import React from 'react';

import { Card } from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import Masonry from 'react-masonry-component';

import PropTypes from 'prop-types';
// import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ItemCard from '../../components/ItemCard/ItemCard';

import './style.css';

const Profile = ({ items, user }) => (
    <section className={'profile-container'}>
        <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="profile-header">
                <div className="user-info">
                    <h2>{user.fullname}</h2>
                    <p>{user.bio}</p>
                </div>

                <div className="user-stats">
                    <p>
                        <span>{items.length}</span> Items shared
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
    user: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
};

export default Profile;
