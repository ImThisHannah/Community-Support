import React from 'react';
import SignupForm from '../components/SignupForm';

const Signup: React.FC = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <SignupForm handleModalClose={() => {
        console.log('Modal closed');
      }} />
    </div>
  );
};

export default Signup;
