import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { setFilterValue } from '../../redux/modules/filter';

class TagSelectFilter extends Component {
    handleChange = (event, index, selected) => {
        this.props.dispatch(setFilterValue(selected));
    };
    render() {
        return (
            <SelectField
                className="headerFilter"
                multiple
                autoWidth
                floatingLabelText="Filter by Tag"
                onChange={this.handleChange}
                value={this.props.tagsSelected}
            >
                {this.props.tagsList.map(tag => (
                    <MenuItem
                        insetChildren
                        key={tag.tagid}
                        checked={
                            !!this.props.tagsSelected.find(t => t === tag.title)
                        }
                        value={tag.tagid}
                        primaryText={tag.title}
                    />
                ))}
            </SelectField>
        );
    }
}

// const fetchTags = gql`
//     query {
//         tags {
//             id
//             title
//         }
//     }
// `;

const mapStateToProps = state => ({
    tagsSelected: state.filter.tagsSelected,
    tagsList: state.filter.tagsList,
});

export default compose(
    // graphql(fetchItems),
    // graphql(fetchTags),
    connect(mapStateToProps),
)(TagSelectFilter);
