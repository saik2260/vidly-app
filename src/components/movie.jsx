import React, { Component } from 'react';

const Movie = (props) => {

    const handleSave = () => {
        props.history.push('/movies')
    }

    return (
        <div>
            <h1>Movie - {props.match.params.id}</h1>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
        </div>

    );
}

export default Movie;