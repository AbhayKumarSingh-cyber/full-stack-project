import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import { addUser, editUser } from '../services/api';
import { toast } from 'react-toastify';

const UserForm = ({ user, isEdit, onSuccess }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
    address: Yup.string(),
  });

  const handleSubmit = async (values) => {
    try {
      if (isEdit) {
        await editUser(user._id, values);
        toast.success('User updated');
      } else {
        await addUser(values);
        toast.success('User added');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Operation failed');
    }
  };

  return (
    <Formik initialValues={user || { name: '', email: '', phone: '', address: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Form>
          <Field as={TextField} name="name" label="Name" fullWidth error={touched.name && !!errors.name} helperText={touched.name && errors.name} />
          <Field as={TextField} name="email" label="Email" fullWidth error={touched.email && !!errors.email} helperText={touched.email && errors.email} />
          <Field as={TextField} name="phone" label="Phone" fullWidth error={touched.phone && !!errors.phone} helperText={touched.phone && errors.phone} />
          <Field as={TextField} name="address" label="Address" fullWidth />
          <Button type="submit" variant="contained">{isEdit ? 'Update' : 'Add'} User</Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;