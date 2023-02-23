import React from "react";

const SelectFilter = ({ value, options, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

export default SelectFilter;