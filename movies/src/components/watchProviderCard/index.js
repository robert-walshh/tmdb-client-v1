import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import img from '../../images/film-poster-placeholder.png';


const WatchProviderCard = ({ results }) => {
    return (
        <Card>
            <CardHeader
            title={
                <Typography variant="h6" component="p">
                    {results.provider_name}
                </Typography>
            }
            subheader={results.type}
            />
            <CardMedia 
            sx = {{height: 400}}
            image = {results.logo_path ? `https://image.tmdb.org/t/p/w500/${results.logo_path}`: img}
            />
        </Card>
    );
};
export default WatchProviderCard;