import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const currentUser = JSON.parse(localStorage.getItem('userData'));
      const updatedUser = { ...currentUser, password: newPassword };

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

      // Update the user object in localStorage with the new password
      localStorage.setItem('userData', JSON.stringify(updatedUser));

      // Set the passwordChanged state to true
      setPasswordChanged(true);
    } catch (error) {
      // Handle error and provide appropriate feedback to the user
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {passwordChanged && <p>Password changed successfully!</p>}
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
