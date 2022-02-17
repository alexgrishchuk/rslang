import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import PAGES from '../shared/data/pages';
import AppContainer from '../shared/app-container/app-container';
import LoginMenu from './components/login-menu';
import AuthMenu from './components/auth-menu';

const pages = [PAGES.MAIN, PAGES.TUTORIAL, PAGES.SPRINT, PAGES.AUDIO_CALL, PAGES.STATISTICS, PAGES.ABOUT_TEAM];

const APP_LOGO = 'RS Lang';

interface IAppBarProps {
  isAuthenticated: boolean;
  onLogIn: () => void;
  onLogOut: () => void;
}

function ResponsiveAppBar({ isAuthenticated, onLogIn, onLogOut }: IAppBarProps) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const UserMenu = isAuthenticated ? <AuthMenu onLogOut={onLogOut} /> : <LoginMenu onLogIn={onLogIn} />;

  const linkTo = (path: string) => {
    handleCloseNavMenu();
    navigate(path);
  };

  return (
    <AppBar position="static">
      <AppContainer>
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            {APP_LOGO}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(({ title, path }) => (
                <MenuItem
                  key={title as React.Key}
                  onClick={() => {
                    linkTo(path);
                  }}
                >
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {APP_LOGO}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({ title, path }) => (
              <Button
                key={title as React.Key}
                onClick={() => {
                  linkTo(path);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>
          {UserMenu}
        </Toolbar>
      </AppContainer>
    </AppBar>
  );
}
export default ResponsiveAppBar;
