import React, { useEffect, useState } from 'react';
import {Grid, Typography, Box, Container} from '@material-ui/core';
import DisplayCard from '../../components/DisplayCard';
import { makeStyles } from '@material-ui/core/styles';
import { useStylesMd as cardStyle } from '../../styles/CardStyles';
import Accordion from '../../components/Accordion';
import { get, getConfig } from '../../utils/movieDB'

const useStyles = makeStyles((theme) => ({
  centralSection: {
    display: 'flex',
    alignItems: 'flexStart',
  },
  title: {
    fontWeight: '600',
    fontSize: '25.6px',
    lineHeight: '26px',
  },
  mainContainer: {
    paddingTop: '40px',
  },
  titleContainer: {
    marginBottom: '20px',
  },
}));

export default (props) => {
  const classes = useStyles();
  const [movies, setMovies] = useState();
  const [basePosterUrl, setBasePosterUrl] = useState(null);
  let posterSize = 'w780';

  useEffect(() => {
    getPosterUrl();
    getMovies();
  }, []);

  const getPosterUrl = () => {
    let posterUrl = window.localStorage.getItem('poster_url');
    if (posterUrl) {
      setBasePosterUrl(JSON.parse(posterUrl));
    } else {
      getConfig().then((data) =>
        setBasePosterUrl(data.images.secure_base_url || data.images.base_url)
      );
    }
  };

  const getMovies = () => {
    const jsonMovies = window.localStorage.getItem('on_the_air_tv');
    if (jsonMovies) {
      let data = JSON.parse(jsonMovies);
      setMovies(data);
    } else {
      get('tv', 'on_the_air').then((data) => {
        setMovies(data);
        window.localStorage.setItem('on_the_air_tv', JSON.stringify(data));
      });
    }
  };

  //grid item xs(4) the only way to not get cards distorted?
  const renderMovies = () => {
    if (Array.isArray(movies) && movies.length > 1) {
      return movies.map((movie) => {
        const {id, original_title, name, release_date, first_air_date, poster_path} = movie;
        let route = `/display/tv/${id}`;
        return (
          <Grid item xs={3} key={movie.id}>
            <DisplayCard
              key={id}
              to={route}
              useStyles={cardStyle}
              title={original_title || name}
              date={release_date || first_air_date}
              poster={`${basePosterUrl}${posterSize}${poster_path}`}
              movie={movie}
            />
          </Grid>
        );
      });
    } else {
      return (
        <Grid item xs={3}>
          {' '}
          <h1>No movies found...</h1>{' '}
        </Grid>
      );
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg">
        <main>
          <Box className={classes.mainContainer}>
            <Box className={classes.titleContainer}>
              <Typography component="h2" variant="h4" className={classes.title}>
                Currently Airing TV Shows
              </Typography>
            </Box>
            <Box className={classes.centralSection}>
              <Accordion />
              <Container maxWidth="md">
                <Grid container spacing={1}>
                  {renderMovies()}
                </Grid>
              </Container>
            </Box>
          </Box>
        </main>
      </Container>
    </React.Fragment>
  );
};
