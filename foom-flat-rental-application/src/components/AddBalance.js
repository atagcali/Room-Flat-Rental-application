import React, { useState } from 'react';
import axios from 'axios';

const AddBalance = () => {
  const [newBalance, setNewBalance] = useState('');
  const [balanceChanged, setBalanceChanged] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleChangeBalance = async (e) => {
    e.preventDefault();

    try {
      const currentUser = JSON.parse(localStorage.getItem('userData'));
      console.log("new balance: "+newBalance);
      console.log("old balance: "+currentUser.balance);
      const total = parseFloat(newBalance) + parseFloat(currentUser.balance);
      const updatedUser = { ...currentUser, balance: total };

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
      setBalanceChanged(true);
    } catch (error) {
      // Handle error and provide appropriate feedback to the user
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setNewBalance(inputValue);
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <div>
      <h2>Add Balance</h2>
      {balanceChanged && <p>Balance added successfully!</p>}
      <form onSubmit={handleChangeBalance}>
        <input
          type="text"
          value={newBalance}
          onChange={handleInputChange}
          placeholder="New Balance"
          required
        />
        {inputError && <p>Please enter a numeric value for the balance.</p>}
        <button type="submit">Add Balance</button>
      </form>
    </div>
  );
};

export default AddBalance;
