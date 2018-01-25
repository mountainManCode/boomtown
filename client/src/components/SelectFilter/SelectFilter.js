import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectFilter = ({ handleChange, value }) => (
    <SelectField
        className="headerFilter"
        floatingLabelText="Filter by Tag"
        value={this.props.filterValue}
        onChange={this.handleChange}
    >
        <MenuItem
            checked={this.props.filterValue === 'Electronics'}
            value={'Electronics'}
            primaryText="Electronics"
        />
        <MenuItem value={'Household Items'} primaryText="Household Items" />
        <MenuItem
            value={'Musical Instruments'}
            primaryText="Musical Instruments"
        />
        <MenuItem value={'Physical Media'} primaryText="Physical Media" />
        <MenuItem
            value={'Recreational Equipment'}
            primaryText="Recreational Equipment"
        />
        <MenuItem value={'Tools'} primaryText="Tools" />
        <MenuItem value={7} primaryText="Recreational Equipment" />
    </SelectField>
);

export default SelectFilter;
