import React from 'react';

const SingleSelect = ({ name, options, handleChanges, value }) => {

    const loadOptions = () => {
        let opts = [];
        options.forEach(option => {
            opts.push(<option value={option} key={option} >{option}</option>)
        });
        return opts;
    };

    return (
        <select className='ticket-select' name={name} onChange={handleChanges} value={value} >
            {loadOptions()}
        </select>
    );
};

export default SingleSelect;