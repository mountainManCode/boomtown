import React from "react";

const SelectFilter = ({ handleChange, value }) => (
  <SelectField
    multiple
    className="headerFilter"
    floatingLabelText="Filter by Tag"
    value={values}
    onChange={this.handleChange}
  >
    <MenuItem value={"Electronics"} primaryText="Electronics" />
    <MenuItem value={"Household Items"} primaryText="Household Items" />
    <MenuItem value={"Musical Instruments"} primaryText="Musical Instruments" />
    <MenuItem value={"Physical Media"} primaryText="Physical Media" />
    <MenuItem
      value={"Recreational Equipment"}
      primaryText="Recreational Equipment"
    />
    <MenuItem value={Tools} primaryText="Tools" />
    <MenuItem value={7} primaryText="Recreational Equipment" />
  </SelectField>
);

export default SelectFilter;
