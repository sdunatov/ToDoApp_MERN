import React from "react";

const Date = ({ date, onChange }) => {
    return (
        <input type="date" name="date" value={date} onChange={onChange}></input>
    )
}

export default Date;