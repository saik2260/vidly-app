import React from 'react';

const ListGroup = ({ genres, onItemSelect, textProperty, valueProperty, selectedGenre }) => {
    return (
        <ul className="list-group">
            {genres.map((genre) =>
                <li className={
                    selectedGenre[valueProperty] === genre[valueProperty] ?
                        "list-group-item active" :
                        "list-group-item"}
                    key={genre[valueProperty]}
                    style={{ cursor: 'pointer' }}
                    onClick={() => onItemSelect(genre)
                    }
                >
                    {genre.name}
                </li>)}
        </ul>
    )
}

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id",
}

export default ListGroup;