import React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia";
import img from '../../images/film-poster-placeholder.png';

const MovieCastList = ({ results }) => {
    return (
            <Card sx={{ display: 'flex', padding: 0, alignItems: 'center', backgroundColor: "#121212", color: "white" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {results.name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                    >
                        {results.character}
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 100, padding: 1 }}
                image={results.profile_path ? `https://image.tmdb.org/t/p/w500/${results.profile_path}` : img}
                alt={results.provider_name}
            />
        </Card>



    );
};
export default MovieCastList;