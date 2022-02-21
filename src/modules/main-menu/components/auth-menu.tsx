import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import PAGES from '../../shared/data/pages';
import { getUserNameFromStorage } from '../../../storage/storage';

interface AuthMenuProps {
  onLogOut: () => void;
}

export default function AuthMenu({ onLogOut }: AuthMenuProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const LogOutUser = () => {
    onLogOut();
    handleCloseUserMenu();
  };

  const ToStat = () => {
    navigate(PAGES.STATISTICS.path);
    handleCloseUserMenu();
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem key="Name">
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">{getUserNameFromStorage()}</Typography>
        </MenuItem>
        <Divider />
        <MenuItem key="Statistics" onClick={ToStat}>
          <ListItemIcon>
            <BarChartIcon fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">Статистика</Typography>
        </MenuItem>
        <MenuItem key="Logout" onClick={LogOutUser}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Typography textAlign="center">Выйти</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
