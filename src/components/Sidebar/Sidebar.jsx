import React from "react";
import { FaUsers, FaUserTie } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";
import { FiDatabase } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { BiLogOut } from "react-icons/bi";

const Sidebar = ({ menu }) => {
  return (
    <Box sx={{
      position: 'sticky',
      top: 0,
      left: 0,
      height: '100vh',
      backgroundColor: 'hsl(220, 34%, 19%)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderRight: '1px solid #e0e0e070',
      overflowY: 'auto',
      paddingTop: 2,
      zIndex: 100,
      ...(menu && { /* additional styles if needed */ }),
    }}>
      <List sx={{ flex: 1, width: '100%', padding: 2 }}>
        <ListItem button component={NavLink} to="customers">
          <ListItemIcon sx={{ color: '#fff' }}><FaUsers /></ListItemIcon>
          <ListItemText primary="Customers" />
        </ListItem>
        <ListItem button component={NavLink} to="storage">
          <ListItemIcon sx={{ color: '#fff' }}><FiDatabase /></ListItemIcon>
          <ListItemText primary="Storage" />
        </ListItem>
        <ListItem button component={NavLink} to="sellers">
          <ListItemIcon sx={{ color: '#fff' }}><FaUserTie /></ListItemIcon>
          <ListItemText primary="Sellers" />
        </ListItem>
        <ListItem button component={NavLink} to="create">
          <ListItemIcon sx={{ color: '#fff' }}><AiOutlineForm /></ListItemIcon>
          <ListItemText primary="Create Customer" />
        </ListItem>
        <ListItem button component={NavLink} to="createProduct">
          <ListItemIcon sx={{ color: '#fff' }}><AiOutlineForm /></ListItemIcon>
          <ListItemText primary="Create Product" />
        </ListItem>
        <ListItem button component={NavLink} to="profile">
          <ListItemIcon sx={{ color: '#fff' }}><AiOutlineForm /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Divider />
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, color: '#a4a6b3', gap: 2, cursor: 'pointer', transition: 'color 0.3s ease', '&:hover': { color: '#ff4d4d' } }}>
        <BiLogOut sx={{ fontSize: 24 }} />
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box>Log Out</Box>
        </NavLink>
      </Box>
    </Box>
  );
};

export default Sidebar;
