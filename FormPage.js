import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUsers } from '../services/api';

const FormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch user for edit
      getUsers(1, 100).then(res => {
        const found = res.data.users.find(u => u._id === id);
        setUser(found);
      });
    }
  }, [id]);

  return <UserForm user={user} isEdit={!!id} onSuccess={() => navigate('/')} />;
};

export default FormPage;