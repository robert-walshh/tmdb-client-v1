import React from "react";
import {getUpcomingMovies} from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToWatchListIcon from "../components/cardIcons/addToWatchList";
import Typography from "@mui/material/Typography";



const UpcomingMoviesPage = (props) => {
    const {  data, error, isLoading, isError }  = useQuery('upcoming', getUpcomingMovies)
    if (isLoading) { return <Spinner /> }
    if (isError) { return <h1>{error.message}</h1> }
    const movies = data.results;
    // Redundant, but necessary to avoid app crashing.
    
    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    return (
        <PageTemplate
        title={ <Typography variant="h4" component="p"> <span style={{ fontStyle: 'italic' }}>Upcoming</span> <span>🗓️</span> </Typography> }
            movies={movies}
            action={(movie) => {
                return (
                    <>
                    <AddToWatchListIcon movie={movie}/>
                    </>
                    );
            }}
        />
    );
};
export default UpcomingMoviesPage;