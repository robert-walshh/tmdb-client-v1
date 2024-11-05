import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'



const AddToWatchListIcon = () => {

    return (
        <IconButton aria-label="Add to WatchList">
            <PlaylistAddIcon color="primary" fontSize="large"/>
        </IconButton>
    );
};

export default AddToWatchListIcon