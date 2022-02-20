import React, { Component } from 'react';
// import { deleteMovie } from '../services/fakeMovieService'
import Like from './common/Like';
import PageNav from './common/pageNav';
import { Paginate } from '../utils/paginate';
import _ from 'lodash'
// import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/ListGroup';
import MovieTable from './movieTable';
import { Link } from 'react-router-dom';
import SearchMovie from './searchMovie';
import { getGenres } from './../services/genreService';
import { getMovies, deleteMovie } from './../services/movieService'
import { toast } from 'react-toastify';

class Movies extends React.Component {
    state = {
        movies: [],
        genres: [],
        count: 0,
        pageSize: 4,
        currentPage: 1,
        searchKey: '',
        selectedGenre: {},
        sortColumn: { path: 'title', order: 'asc' },
    }

    async componentDidMount() {
        const { data } = await getGenres()
        const { data: movies } = await getMovies()
        const genres = [{ name: 'All Genres', _id: '' }, ...data]
        this.setState({
            movies: movies,
            genres
        })
    }

    // getMovies = () => {
    //     const LOCAL_STORAGE_KEY = 'movies'
    //     const movies = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    //     console.log(movies)
    //     return movies
    // }

    getPagedData = () => {
        const { movies, pageSize, currentPage, selectedGenre, sortColumn, searchKey } = this.state
        let filtered
        if (selectedGenre["_id"] !== undefined && selectedGenre["_id"] !== "") {
            filtered = movies.filter(movie => movie.genre._id === this.state.selectedGenre._id)
        }
        else if (searchKey) {
            filtered = movies.filter(movie =>
                movie.title.toLowerCase().
                    startsWith(searchKey.toLowerCase())
            )
        }
        else filtered = movies

        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order])

        const paged = Paginate(sorted, pageSize, currentPage)

        return { totalCount: filtered.length, data: paged }
    }

    handleLike = (movie) => {
        const index = this.state.movies.indexOf(movie)
        const movies = [...this.state.movies]
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
    }

    handlePageNav = (pageId) => {
        // console.log("PageID :", pageId)
        this.setState({ currentPage: pageId })
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, searchKey: '', currentPage: 1 })
    }

    handleDelete = async (movie) => {
        const originalMovies = this.state.movies

        const movies = originalMovies.filter(m => m._id !== movie._id)
        this.setState({ movies })

        try {
            await deleteMovie(movie._id)
        } catch (ex) {
            console.log(ex)
            if (ex.response && ex.response.status === 404)
                toast.error("This movie has already been deleted")
            this.setState({ movies: originalMovies })
        }
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn })
    }

    handleSearch = query => {
        this.setState({ searchKey: query, selectedGenre: {}, currentPage: 1 })
    }

    renderNewMovieButton(user) {
        return (
            user === undefined || user === null ? null : <Link to='/movies/new'>
                <button className="btn btn-primary"
                    style={{ marginBottom: 20 }}>
                    New Movie
                    </button>
            </Link>
        )
    }

    render() {
        const { movies: allMovies, pageSize, currentPage, genres, selectedGenre, sortColumn, searchKey } = this.state
        const { user } = this.props
        // if (allMovies.length === 0) return (
        //     <div>
        //         {this.renderNewMovieButton(user)}
        //         <div>
        //             "There are no movies in the database"
        //         </div>
        //     </div>
        // )

        const { totalCount, data: movies } = this.getPagedData()
        return (
            <main className="container">
                <div className="row">
                    <div className="col-2">
                        <ListGroup
                            genres={genres}
                            onItemSelect={this.handleGenreSelect}
                            selectedGenre={selectedGenre} />
                    </div>
                    <div className="col">

                        {this.renderNewMovieButton(user)}

                        <p>`Showing ${totalCount} movies in the database`</p>
                        <SearchMovie value={searchKey} onChange={this.handleSearch} />

                        <MovieTable movies={movies}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            sortColumn={sortColumn}
                            onSort={this.handleSort}
                        />

                        <PageNav itemsCount={totalCount}
                            pageSize={pageSize}
                            onPageNav={this.handlePageNav}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </main>
        )
    }
}

export default Movies;