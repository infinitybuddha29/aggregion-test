import React from 'react';
import UsersRegister from './UsersRegister';
import { v4 as uuidv4 } from 'uuid';

export const USERS_DATA = [
  {
    fullName: 'Mamie Brakus',
    dateOfBirth: 'Sat Jan 01 2000 00:00:00 GMT+0800 (Центральная Индонезия)',
    address: '59240',
    city: 'Gleasonfield',
    phone: '+79163643064',
    id: uuidv4(),
  },
];
function App() {
  return <UsersRegister />;
}

export default App;
