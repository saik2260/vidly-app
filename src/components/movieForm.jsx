import React, { Component } from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
import { getGenres } from '../services/genreService';
import { getMovie } from '../services/movieService';
import { saveMovie } from './../services/movieService';


class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
        dailyRentalRate: Joi.number().min(0).max(10).required().label('Rate'),
    }

    async populateGerens() {
        const { data: genres } = await getGenres()
        this.setState({ genres })
    }

    async populateMovies() {
        try {
            const movieId = this.props.match.params.id
            if (this.props.match.url.endsWith('new')) return
            const { data: movie } = await getMovie(movieId)
            this.setState({ data: this.mapToViewModel(movie) })
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                this.props.history.replace('/not-found')
        }
    }

    async componentDidMount() {
        await this.populateGerens()
        await this.populateMovies()
    }

    mapToViewModel(movie) {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        }
    }

    doSubmit = async () => {
        await saveMovie(this.state.data)

        this.props.history.push('/movies')
    }

    render() {
        //const { genres } = this.props.location.state
        // console.log(this.props)
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Movie Form</h1>
                {this.renderInput('title', 'Title')}
                {this.renderSelect('genreId', 'Genre', this.state.genres)}
                {this.renderInput('numberInStock', 'Number In Stock', 'number')}
                {this.renderInput('dailyRentalRate', 'Rate', 'number')}

                {this.renderButton('Save')}
            </form>

        );
    }
}

export default MovieForm;