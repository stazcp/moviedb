// improvements needed:
// 1. Menu's open on hover
// 2. Menu's close on mouseOut
// 3. Menu's close when reaching destination
// 4. Menu's are on top of mobile menu and not under
// 5. Build pop-over's for + and Lang

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from '@material-ui/core/Link';
import AddIcon from '@material-ui/icons/Add';
import LanguageIcon from '@material-ui/icons/Language';
import { Link as L } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  AppBar: {
    backgroundColor: '#032541',
    boxShadow: '0 0 0 0',
  },
  h2Link: {
    fontWeight: '700',
    fontSize: '2em',
  },
  h5Link: {
    fontWeight: '600',
    fontSize: '1em',
  },
  mainMenu: {
    display: 'none',
    flex: 1,
    justifyContent: 'space-evenly',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const styles = {
  routingLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
};

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const MENU_ANCHORS = { movies: null, people: null, tvShows: null, more: null, profile: null };
  const [anchorEl, setAnchorEl] = React.useState(MENU_ANCHORS);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleOpenMenu = (e,anchor) =>{
    setAnchorEl({ ...MENU_ANCHORS, [anchor]: e.currentTarget });
    e.preventDefault();
  }

  const handleMenuClose = () => {
    setAnchorEl(MENU_ANCHORS);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const moviesMenuId = 'movies-menu';
  const renderMoviesMenu = () => {
    const items = [
      { title: 'Popular', to: '/Popular-movies' },
      { title: 'Now Playing', to: '/NowPlaying-movies' },
      { title: 'Upcoming', to: '/Upcoming-movies' },
      { title: 'Top Rated', to: '/TopRated-movies' },
    ];
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.movies}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={moviesMenuId}
        keepMounted
        open={Boolean(anchorEl.movies)}
        onClose={handleMenuClose}
      >
        {items.map((item) => {
          return (
            <MenuItem>
              <L to={item.to} style={styles.routingLink}> {item.title} </L>
            </MenuItem>
          );
        })}
      </Menu>
    );
  }

  const tvShowsMenuId = 'tv-shows-menu';
  const renderTVShowsMenu = () => {
    const items = [
      { title: 'Popular', to: '/Popular-tvShows' },
      { title: 'Airing Today', to: '/AiringToday-tvShows' },
      { title: 'On TV', to: '/OnTv-tvShows' },
      { title: 'Top Rated', to: '/TopRated-tvShows' },
    ]
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.tvShows}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={tvShowsMenuId}
        keepMounted
        open={Boolean(anchorEl.tvShows)}
        onClose={handleMenuClose}
      >
        {items.map((item) => {
          return (
            <MenuItem>
              <L to={item.to} style={styles.routingLink}> {item.title} </L>
            </MenuItem>
          )
        })}
      </Menu>
    );
  }

  const peopleMenuId = 'people-menu';
  const renderPeopleMenu = () => {
    const items = [{ title: 'Popular People', to: '/People' }];
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.people}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={peopleMenuId}
        keepMounted
        open={Boolean(anchorEl.people)}
        onClose={handleMenuClose}
      >
        {items.map((item) => {
          return(
          <MenuItem>
            <L to={item.to} style={styles.routingLink}> {item.title} </L>
          </MenuItem>
          )
        })}
      </Menu>
    );
  }

  const moreMenuId = 'more-menu';
  const renderMoreMenu = () => {
    const items = [
      { title: 'Discussions', to: '/Discussions' },
      { title: 'Leaderboard', to: '/Leaderboard' },
      { title: 'Support', to: '/Support' },
      { title: 'API', to: '/Api' },
    ];
    return (
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorEl={anchorEl.more}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={moreMenuId}
        keepMounted
        open={Boolean(anchorEl.more)}
        onClose={handleMenuClose}
      >
        {items.map((item) => {
          return (
            <MenuItem>
              <L to={item.to} style={styles.routingLink}> {item.title} </L>
            </MenuItem>
          );
        })}
      </Menu>
    );
  }

  const accountMenuId = 'account-menu';
  const renderMenu = () => {
    const items = [
      { title: 'Login', to: '/Login' },
      { title: 'Join Cine+', to: '/Join' },
    ]
    return(
      <Menu
        anchorEl={anchorEl.account}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        id={accountMenuId}
        keepMounted
        open={Boolean(anchorEl.account)}
        onClose={handleMenuClose}
      >
        {items.map((item) => {
          return (
            <MenuItem>
              <L to={item.to} style={styles.routingLink}> {item.title} </L>
            </MenuItem>
          );
        })}
      </Menu>
    )
  }

  const displayMoviesMenu = (
      <Typography
        edge="end"
        aria-label="movies menu"
        aria-controls={moviesMenuId}
        aria-haspopup="true"
        onClick={e => handleOpenMenu(e,"movies")}
        color="inherit"
        className={classes.h5Link}
        variant="h5"
      >
        <Link href="/" color="inherit" underline="none" className="nav-link">
          Movies
        </Link>
      </Typography>
  );

  const displayTvShowsMenu = (
    <Typography
      edge="end"
      aria-label="tv shows menu"
      aria-controls={tvShowsMenuId}
      aria-haspopup="true"
      onClick={(e) => handleOpenMenu(e, 'tvShows')}
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link href="/" color="inherit" underline="none" className="nav-link">
        TV Shows
      </Link>
    </Typography>
  );

  const displayPeopleMenu = (
    <Typography
      edge="end"
      aria-label="people menu"
      aria-controls={peopleMenuId}
      aria-haspopup="true"
      onClick={e => handleOpenMenu(e,'people')}
      // onMouseOver={handlePeopleMenuOpen}
      // onMouseLeave={handleMenuClose} crashes
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link href="/" color="inherit" underline="none" className="nav-link">
        People
      </Link>
    </Typography>
  );

  const displayMoreMenu = (
    <Typography
      edge="end"
      aria-label="more menu"
      aria-controls={moreMenuId}
      aria-haspopup="true"
      onClick={e => handleOpenMenu(e,"more")}
      // onMouseOver={handleMoreMenuOpen}
      // onMouseLeave={handleMenuClose} crashes
      color="inherit"
      className={classes.h5Link}
      variant="h5"
    >
      <Link href="/" color="inherit" underline="none" className="nav-link">
        More
      </Link>
    </Typography>
  );

  const displayAccountMenu = (
    <IconButton
      edge="end"
      aria-label="account of current user"
      aria-controls={accountMenuId}
      aria-haspopup="true"
      onClick={e => handleOpenMenu(e,"account")}
      // onMouseOver={handleProfileMenuOpen}
      color="inherit"
    >
      <AccountCircle />
    </IconButton>
  );

  const displayLanguagesMenu = (
    <IconButton aria-label="show" color="inherit">
      <Badge color="secondary">
        {/* languages? */}
        <LanguageIcon />
      </Badge>
    </IconButton>
  );

  const displayAddMenu = (
    <IconButton aria-label="show" color="inherit">
      <Badge color="secondary">
        {/* popup goes here */}
        <AddIcon />
      </Badge>
    </IconButton>
  );

  // menus show under mobile menu?
  const mobileMenuId = 'mobile-menu';
  const renderMobileMenu = () => {
    const items = [
      displayMoviesMenu,
      displayTvShowsMenu,
      displayPeopleMenu,
      displayMoreMenu,
      displayAddMenu,
      displayLanguagesMenu,
      displayAccountMenu
    ];
    return(
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        {items.map(item => <MenuItem>{item}</MenuItem>)}
      </Menu>
    )
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.AppBar}>
        <Toolbar>
          <Typography className={classes.h2Link} variant="h2" noWrap>
            <Link href="/" color="inherit" underline="none" className="nav-link">
              Cine+
            </Link>
          </Typography>
          <div className={classes.mainMenu}>
            {displayMoviesMenu}
            {displayTvShowsMenu}
            {displayPeopleMenu}
            {displayMoreMenu}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {displayAddMenu}
            {displayLanguagesMenu}
            {displayAccountMenu}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderPeopleMenu()}
      {renderMoreMenu()}
      {renderMoviesMenu()}
      {renderTVShowsMenu()}
      {renderMobileMenu()}
      {renderMenu()}
    </div>
  );
}
