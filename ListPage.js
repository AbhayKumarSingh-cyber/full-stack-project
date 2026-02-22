import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import UserList from '../components/UserList';

const ListPage = () => (
  <div>
    <Link to="/add"><Button variant="contained">Add User</Button></Link>
    <UserList />
  </div>
);

export default ListPage;