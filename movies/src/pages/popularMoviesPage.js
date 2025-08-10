import React, { useState } from "react";
import { getPopularMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";


const PopularMoviesPage = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery(['popular', currentPage], () => getPopularMovies(currentPage))
    if (isLoading) { return <Spinner /> }
    if (isError) { return <h1>{error.message}</h1> }
    const movies = data.results;
    const totalPages = Math.min(data.total_pages, 500); // Limits pages to TMDB APIs hard limit of 500
    // Redundant, but necessary to avoid app crashing.

    const favorites = movies.filter(m => m.favorite)
    localStorage.setItem('favorites', JSON.stringify(favorites))
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <PageTemplate
                title={<Typography variant="h4" component="p"> <span style={{ fontStyle: 'italic' }}>Popular</span> <span>📈</span> </Typography>}
                movies={movies}
                action={(movie) => {
                    return <AddToFavoritesIcon movie={movie} />
                }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 3 }}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    variant="outlined"
                />
            </Box>
        </div >
    );
};
export default PopularMoviesPage;