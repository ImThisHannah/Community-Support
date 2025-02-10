import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { getItem, setItem } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

// Define the prop types
interface SignupFormProps {
  handleModalClose: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ handleModalClose }) => {
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    const storedFormData = getItem('signupFormData');
    if (storedFormData) {
      setUserFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const updatedFormData = { ...userFormData, [name]: value };
    setUserFormData(updatedFormData);
    setItem('signupFormData', JSON.stringify(updatedFormData));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
      localStorage.removeItem('signupFormData'); // Clear form data from local storage after successful submission
      handleModalClose(); // Call the handleModalClose function when the form is submitted
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Alert
        dismissible
        onClose={() => setShowAlert(false)}
        show={showAlert}
        variant="danger"
      >
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
        <Form.Control.Feedback type="invalid">
          Username is required!
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">
          Email is required!
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type="invalid">
          Password is required!
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" variant="success">
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;