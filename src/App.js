import React, { useState } from 'react';
import UserInfoForm from './UserInfoForm';
import UserTable from './UserTable';
import './index.css';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    const deleteUser = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
    };

    const editUser = (index, updatedUser) => {
        const updatedUsers = users.map((user, i) => (i === index ? updatedUser : user));
        setUsers(updatedUsers);
        setEditingIndex(null);
    };

    const startEditUser = (index) => {
        setEditingIndex(index);
    };

    return (
        <div className="container">
            <h1>نموذج المستخدم</h1>
            <UserInfoForm addUser={addUser} 
                editingUser={editingIndex !== null ? users[editingIndex] : null} 
                updateUser={(user) => editUser(editingIndex, user)} 
            />
            <h1>قائمة المستخدمين</h1>
            <UserTable 
                users={users} 
                deleteUser={deleteUser} 
                startEditUser={startEditUser} 
            />
        </div>
    );
};

export default App;
