import React, { useState, useEffect } from 'react';
import './index.css';

const UserInfoForm = ({ addUser, editingUser, updateUser }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isEmployee, setIsEmployee] = useState(false);
    const [option, setOption] = useState('');

    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setAge(editingUser.age);
            setPhoneNumber(editingUser.phoneNumber);
            setIsEmployee(editingUser.isEmployee);
            setOption(editingUser.option);
        } else {
            const storedForm = JSON.parse(localStorage.getItem('formState'));
            if (storedForm) {
                setName(storedForm.name);
                setAge(storedForm.age);
                setPhoneNumber(storedForm.phoneNumber);
                setIsEmployee(storedForm.isEmployee);
                setOption(storedForm.option);
            }
        }
    }, [editingUser]);

    useEffect(() => {
        const formState = { name, age, phoneNumber, isEmployee, option };
        localStorage.setItem('formState', JSON.stringify(formState));
    }, [name, age, phoneNumber, isEmployee, option]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isEmployee) {
            alert("You must check the 'Employee' checkbox.");
            return;
        }

        if (option === '') {
            alert("You must select an option from the dropdown.");
            return;
        }

        const userInfo = {
            name,
            age,
            phoneNumber,
            isEmployee,
            option
        };

        if (editingUser) {
            updateUser(userInfo);
        } else {
            addUser(userInfo);
        }

        // Reset form fields
        setName('');
        setAge('');
        setPhoneNumber('');
        setIsEmployee(false);
        setOption('');
        localStorage.removeItem('formState');
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,12}$/.test(value)) {
            setPhoneNumber(value);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="age">Age:</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    pattern="^\d{8,12}$"
                    title="Phone number must be between 8 and 12 digits"
                    required
                />
            </div>
            <div>
                <label htmlFor="isEmployee">
                    <input
                        type="checkbox"
                        id="isEmployee"
                        checked={isEmployee}
                        onChange={(e) => setIsEmployee(e.target.checked)}
                    />
                    Employee
                </label>
            </div>
            <div>
                <label htmlFor="option">Select an option:</label>
                <select
                    id="option"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    required
                >
                    <option value="">--Please choose an option--</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>
            <button type="submit">{editingUser ? 'Update Information' : 'Send Information'}</button>
        </form>
    );
};

export default UserInfoForm;
