import React from 'react';
import { Router, Link } from 'react-router-dom'
import Like from './common/Like';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';
import Table from './common/Table';
import auth from '../services/authService';

class MovieTable extends React.Component {
    deleteColumn = {
        key: 'Delete',
        content: movie => <button
            className='btn btn-danger'
            onClick={
                () => { this.props.onDelete(movie) }
            }
        >
            Delete
                </button>
    }

    constructor() {
        super()
        const user = auth.getCurrentUser()
        console.log(user)
        if (user && user.isAdmin) {
            this.columns.push(this.deleteColumn)
        }
    }
    columns = [
        {
            path: 'title',
            label: 'Title',
            content: movie => <Link to={`/movies/${movie._id}`} >{movie.title}</Link>
        },
        { path: 'genre.name', label: 'Genre' },
        { path: 'numberInStock', label: 'Stock' },
        { path: 'dailyRentalRate', label: 'Rate' },
        {
            key: 'Like',
            content: movie => <Like
                onLikeToggle={this.props.onLike}
                movie={movie} />
        },

    ]

    render() {
        const { movies, onSort, sortColumn } = this.props

        return (
            <Table
                columns={this.columns}
                data={movies}
                onSort={onSort}
                sortColumn={sortColumn} />
        )
    }
}

export default MovieTable;