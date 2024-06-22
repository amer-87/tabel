import React from 'react';
import './index.css';

const UserTable = ({ users, deleteUser, startEditUser }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone Number</th>
                        <th>Employee</th>
                        <th>Option</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.isEmployee ? 'Yes' : 'No'}</td>
                            <td>{user.option}</td>
                            <td>
                                <button onClick={() => startEditUser(index)}>Edit</button>
                                <button onClick={() => deleteUser(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
