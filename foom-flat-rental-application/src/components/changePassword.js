import React, { useState } from 'react';

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Perform validation
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }
    
    // Send an API request to update the password in the database
    const userId = getUserId(); // Implement a function to get the current user's ID
    const payload = {
      userId,
      currentPassword,
      newPassword,
    };

    // Assuming you are using fetch for making API requests
    fetch('/api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Password changed successfully.');
          // Optionally, you can reset the form here
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          alert('Failed to change password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while changing the password. Please try again later.');
      });
  };

  return (
    <div>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Current Password</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
