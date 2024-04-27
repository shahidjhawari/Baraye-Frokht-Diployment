import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import productCategory from '../helpers/productCategory';

export default function TemporaryDrawer({ handleSortBy, handleSelectCategory }) {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '10px' }}>
  <Button style={{ color: 'white', backgroundColor: '#c026d3', padding: '2px 100px' }} onClick={toggleDrawer(true)}><b>Filter</b></Button>
</div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText className='text-fuchsia-600' primary="Sort by" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSortBy('asc')}>
                <ListItemText primary="Price - Low to High" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleSortBy('dsc')}>
                <ListItemText primary="Price - High to Low" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText className='text-fuchsia-600' primary="All Categories" />
              </ListItemButton>
            </ListItem>
            {productCategory.map((categoryName, index) => (
              <ListItem key={categoryName.value} disablePadding>
                <ListItemButton onClick={() => handleSelectCategory(categoryName.value)}>
                  <ListItemText primary={categoryName.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
