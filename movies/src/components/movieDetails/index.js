import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import { getWatchProviders } from "../../api/tmdb-api";
import { useQuery } from "react-query"; 
import Spinner from '../spinner';
import { Grid } from "@mui/material";
import WatchProviderCard from "../watchProviderCard";



const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);


  const {data: providers, isLoading, isError} = useQuery(
    ["movieProviders", movie.id],
    () => getWatchProviders(movie.id),
    {enables: ! !movie.id}
  );

  if (isLoading) return <Spinner />; // Show spinner while loading
  if (isError) return <Typography>Error loading credits</Typography>;

  const irishData = providers && providers.results && providers.results["IE"];
const providersArray = irishData 
  ? [
      ...(irishData.flatrate || []).map(provider => ({ ...provider, type: 'Subscription' })),
      ...(irishData.buy || []).map(provider => ({ ...provider, type: 'Buy' })),
      ...(irishData.rent || []).map(provider => ({ ...provider, type: 'Rent' }))
    ] 
  : [];




  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper component="ul" sx={{...root}}>
      <li>
          <Chip label="Production Countries" sx={{...chip}}
          color="primary"/>
        </li>
        {movie.production_countries.map((countries) => (
          <li key={countries.name}>
            <Chip label={countries.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      
      <Typography variant="h5" component="h3" sx={{ marginTop: 3 }}>
        Providers
      </Typography>
      <Grid container spacing={2}>
        {providersArray.map((provider, index) => (
          provider && (
          <Grid item key={provider.provider_id || index} xs={12} sm={6} md={4} lg={3}>
            <WatchProviderCard results={provider} />
          </Grid>
          )
        ))}
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </>
  );
};
export default MovieDetails ;