import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { getUsers, searchUsers, deleteUser } from '../services/api';
import { toast } from 'react-toastify';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(page, 10);
      setUsers(res.data.users);
      setTotalPages(res.data.pages);
    } catch (error) {
      toast.error('Failed to load users');
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchUsers(search);
      setUsers(res.data);
    } catch (error) {
      toast.error('Search failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success('User deleted');
      fetchUsers();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <TextField label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <Button onClick={handleSearch}>Search</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Link to={`/view/${user._id}`}><Button>View</Button></Link>
                  <Link to={`/edit/${user._id}`}><Button>Edit</Button></Link>
                  <Button onClick={() => handleDelete(user._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={totalPages} page={page} onChange={(e, p) => setPage(p)} />
    </div>
  );
};

export default UserList;