import React from 'react';

const NavElements = props => {
    function handleFilter(event){
        event.preventDefault();
        console.log(event.currentTarget.dataset.filter);
        return;
    }
    return  (
        <a href="#" data-filter={props.name} onClick={handleFilter}>{props.name}</a>
    )
};

export default NavElements;