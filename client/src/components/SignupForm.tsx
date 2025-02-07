import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    handleModalClose(); // Call the handleModalClose function when the form is submitted
  };

  return (
    <Form onSubmit={handleSubmit}>
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