import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import img from '../../images/film-poster-placeholder.png';


const WatchProviderCard = ({ results }) => {
    return (
        <Card sx={{ display: 'flex', padding: 0, alignItems: 'center', backgroundColor: "#121212", color: "white" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {results.provider_name}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div"
                    >
                        {results.type}
                    </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 100, padding: 1 }}
                image={results.logo_path ? `https://image.tmdb.org/t/p/w500/${results.logo_path}` : img}
                alt={results.provider_name}
            />
        </Card>

    );
};
export default WatchProviderCard;