import React, { useState, useEffect } from 'react';
import './index.css';

const initialState = {
  name: '',
  age: '',
  phoneNumber: '',
  isEmployee: false,
  option: ''
};

const UserInfoForm = ({ addUser, editingUser, updateUser }) => {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingUser) {
      setForm(editingUser);
    } else {
      const stored = localStorage.getItem('formState');
      if (stored) setForm(JSON.parse(stored));
    }
  }, [editingUser]);

  useEffect(() => {
    localStorage.setItem('formState', JSON.stringify(form));
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,12}$/.test(val)) {
      setForm(prev => ({ ...prev, phoneNumber: val }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.isEmployee) return alert("Please check 'Employee'.");
    if (!form.option) return alert("Please select an option.");

    editingUser ? updateUser(form) : addUser(form);
    setForm(initialState);
    localStorage.removeItem('formState');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Age:</label>
        <input name="age" type="number" value={form.age} onChange={handleChange} required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          name="phoneNumber"
          type="tel"
          value={form.phoneNumber}
          onChange={handlePhoneChange}
          pattern="^\d{8,12}$"
          title="Phone number must be 8 to 12 digits"
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            name="isEmployee"
            checked={form.isEmployee}
            onChange={handleChange}
          />
          Employee
        </label>
      </div>
      <div>
        <label>Select an option:</label>
        <select name="option" value={form.option} onChange={handleChange} required>
          <option value="">--Please choose an option--</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
      <button type="submit">{editingUser ? 'Update' : 'Send'}</button>
    </form>
  );
};

export default UserInfoForm;
