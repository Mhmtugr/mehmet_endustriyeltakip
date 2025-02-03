// frontend/src/components/Layout.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { Menu as MenuIcon, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Üst Menü */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mehmet Endustriyeltakip
          </Typography>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sol Menü */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{ width: drawerWidth, flexShrink: 0 }}
      >
        <Box sx={{ width: drawerWidth }}>
          <Typography variant="h6" sx={{ p: 2 }}>Menü</Typography>
          <Divider />
          <List>
            <ListItem button component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button component={Link} to="/orders">
              <ListItemText primary="Siparişler" />
            </ListItem>
            <ListItem button component={Link} to="/production">
              <ListItemText primary="Üretim" />
            </ListItem>
            <ListItem button component={Link} to="/reports/dashboard">
              <ListItemText primary="Raporlar" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* İçerik */}
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
