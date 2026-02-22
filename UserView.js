import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const UserView = ({ user }) => (
  <Card>
    <CardContent>
      <Typography variant="h5">{user.name}</Typography>
      <Typography>Email: {user.email}</Typography>
      <Typography>Phone: {user.phone}</Typography>
      <Typography>Address: {user.address}</Typography>
    </CardContent>
  </Card>
);

export default UserView;