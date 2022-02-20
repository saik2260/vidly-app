import React, { Component } from 'react';
import Input from './common/Input';

const SearchMovie = ({ value, onChange }) => {
    return (
        <input value={value}
            id='search'
            placeholder='Search...'
            className='form-control my-3'
            onChange={e => { onChange(e.currentTarget.value) }}
        />
    );
}

export default SearchMovie;