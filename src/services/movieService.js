import config from '../config.json'
import httpService from './httpService';

const apiUrl = "/movies"

function movieUrl(movieId) {
    return `${apiUrl}/${movieId}`
}

export function getMovies() {
    return httpService.get(apiUrl);
}

export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie }
        delete body._id
        return httpService.put(movieUrl(movie._id), body)
    }
    console.log(movie)
    return httpService.post(apiUrl, movie)
}

export function getMovie(movieId) {
    return httpService.get(movieUrl(movieId));
}

export function deleteMovie(movieId) {
    return httpService.delete(movieUrl(movieId))
}