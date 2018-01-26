import React from 'react';

import { Card, CardHeader, CardMedia, CardTitle } from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import Masonry from 'react-masonry-component';

import PropTypes from 'prop-types';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

import './style.css';
// avatar={<Gravatar email={list[0].item.itemowner.email} />

// avatar={<Gravatar email={item.itemowner.email} />}

const Profile = ({ list, items }) => {
    const itemsShared = list.length;

    return (
        <section className={'profileContainer'}>
            <Card className="profileBanner">
                <CardTitle
                    elementType={'h2'}
                    className={'profileTitle'}
                    title={list[0] && list[0].itemowner.fullname}
                />
                <CardTitle subtitle={list[0] && list[0].itemowner.bio} />
                <div className={'profileInfo'}>
                    {<h3>{itemsShared}</h3>}
                    <p>Items Shared</p>
                </div>
                <div className="profileImage">
                    <Gravatar
                        className="profileImage2"
                        email={list[0] && list[0].itemowner.email}
                    />
                </div>
            </Card>
            <Masonry className={'itemsList'} elementType={'div'}>
                {list.map(item => (
                    <div className={'itemCard'} key={item.id}>
                        <ProfileCard item={item} key={item.id} />
                    </div>
                ))}
            </Masonry>
        </section>
    );
};

Profile.propTypes = {
    // list: PropTypes.Array.isRequired,
};

export default Profile;
