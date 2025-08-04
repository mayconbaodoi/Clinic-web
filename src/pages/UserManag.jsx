import React, { useState } from 'react';

const initialUsers = [
    { id: 1, name: 'Phuc', email: 'phuc123@gmail.com', role: 'staff' },
    { id: 2, name: 'Truong', email: 'truong456', role: 'staff' },
];

export default function UserManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [editingUser, setEditingUser] = useState(null);

    const handleDelete = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleSave = () => {
        setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
        setEditingUser(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    return (
        <div className="user-management-container">
            <h2>User Management</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <div className="edit-form">
                    <h3>Edit User</h3>
                    <label>Name:</label>
                    <input name="name" value={editingUser.name} onChange={handleChange} />
                    <label>Email:</label>
                    <input name="email" value={editingUser.email} onChange={handleChange} />
                    <label>Role:</label>
                    <select name="role" value={editingUser.role} onChange={handleChange}>
                        <option value="staff">Staff</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
