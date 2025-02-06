import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlices';

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);
  const dispatch = useDispatch();

  useEffect(() => {
    setShowAlert(!!error);
  }, [error]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);

      // Dispatch Redux action
      dispatch(setUser({
        _id: data.addUser.user._id,
        username: data.addUser.user.username,
        email: userFormData.email,
        token: data.addUser.token,
      }));
    } catch (err) {
      console.error(err);
    }

    setUserFormData({ username: '', email: '', password: '' });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant="danger">
        Something went wrong with your signup!
      </Alert>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={handleInputChange}
          value={userFormData.username}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={handleInputChange}
          value={userFormData.password}
          required
        />
      </Form.Group>

      <Button type="submit" variant="success">
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
