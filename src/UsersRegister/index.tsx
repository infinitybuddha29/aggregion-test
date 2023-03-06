import React, { useState } from 'react';
import UserList from './UsersList';
import UserForm from './UsersForm';
import { USERS_DATA } from '../App';
import { User } from './types';

const UsersRegister = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : USERS_DATA;
  });

  React.useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleCreateUser = (user: User): void => setUsers([...users, user]);
  const handleDeleteUser = (id: string): void =>
    setUsers(users.filter((user) => user.id !== id));

  const handleUpdateUser = (updatedUser: User): void => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
      }}
    >
      <UserForm onSubmit={handleCreateUser} />
      <UserList
        users={users}
        onDeleteUser={handleDeleteUser}
        onUpdateUser={handleUpdateUser}
      />
    </div>
  );
};

export default UsersRegister;
