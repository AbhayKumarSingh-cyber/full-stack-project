import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserView from '../components/UserView';
import { getUsers } from '../services/api';

const ViewPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUsers(1, 100).then(res => {
      const found = res.data.users.find(u => u._id === id);
      setUser(found);
    });
  }, [id]);

  return user ? <UserView user={user} /> : <div>Loading...</div>;
};

export default ViewPage;