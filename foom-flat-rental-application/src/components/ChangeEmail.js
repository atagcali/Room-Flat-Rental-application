import React, { useState } from 'react';
import axios from 'axios';

const ChangeEmail = () => {
  const [newEmail, setNewEmail] = useState('');
  const [emailChanged, setEmailChanged] = useState(false);

  const handleChangeEmail = async (e) => {
    e.preventDefault();

    try {
      const currentUser = JSON.parse(localStorage.getItem('userData'));
      const updatedUser = { ...currentUser, email: newEmail };

      await axios.put(`http://localhost:8080/api/user/${currentUser.userId}`, {
        name: updatedUser.name,
        surname: updatedUser.surname,
        email: updatedUser.email,
        password: updatedUser.password,
        phoneNumber: updatedUser.phoneNumber,
        balance: updatedUser.balance,
        address: updatedUser.address,
        role: updatedUser.role,
        dateOfBirth: updatedUser.dateOfBirth
      });

      // Update the user object in localStorage with the new Email
      localStorage.setItem('userData', JSON.stringify(updatedUser));

      // Set the EmailChanged state to true
      setEmailChanged(true);
    } catch (error) {
      // Handle error and provide appropriate feedback to the user
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Change Email</h2>
      {emailChanged && <p>Email changed successfully!</p>}
      <form onSubmit={handleChangeEmail}>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="New Email"
          required
        />
        <button type="submit">Change Email</button>
      </form>
    </div>
  );
};

export default ChangeEmail;
