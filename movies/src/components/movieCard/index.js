import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid2";
import Stack from '@mui/material/Stack';
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { MoviesContext } from "../../contexts/moviesContext";
import { CardActionArea, Chip } from "@mui/material";

export default function MovieCard({ movie, action }) {
  const { favorites } = useContext(MoviesContext);

  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true;
  } else {
    movie.favorite = false
  }

  return (
    <Card>
      <Link to={`/movies/${movie.id}`}>
        <CardActionArea>

          <CardMedia
            sx={{ height: 500 }}
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : img
            }
          />

        </CardActionArea>
      </Link>

      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" align="center" component="p" style={{ fontWeight: 'bold' }}>
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardContent>
        <Grid size={12}>
          <Stack direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Chip icon={<CalendarIcon fontsize="small" />} label={movie.release_date} variant="outlined" />
            <Chip icon={<StarRateIcon fontsize="small" />} label={movie.vote_average} variant="outlined" />
          </Stack>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>

        {action(movie)}
        
      </CardActions>
    </Card>
  );
}