import React from "react";
import {getTopRatedMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Typography from "@mui/material/Typography";


const TopRatedMoviesPage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery('toprated', getTopRatedMovies)
    if (isLoading) { return <Spinner /> }
    if (isError) { return <h1>{error.message}</h1> }
    const movies = data.results;
    // Redundant, but necessary to avoid app crashing.
    
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    return (
        <PageTemplate
        title={ <Typography variant="h4" component="p"> <span style={{ fontStyle: 'italic' }}>Top Rated</span> <span>🏆</span> </Typography> }
            movies={movies}
            action={(movie) => {
             return <AddToFavoritesIcon movie={movie} />
            }}
        />
    );
};
export default TopRatedMoviesPage;