import React from 'react';
import SignupForm from '../components/SignupForm';

const Signup: React.FC = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <SignupForm handleModalClose={function (): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default Signup;
