import React from 'react'
import LoginForm from '../components/login'
import UsersTable from '../components/usersTable'
import Modal from '../components/Modal';
import { useUserStore } from '../services/userStore';

export default function Home() {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  const handleClose = () => setSelectedUser(null);
  return (
    <>
      <div
        className="container w-75"
        style={{
          height: '100svh',
          display: 'grid',
          gridTemplateRows: '1fr 2fr',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2svh',
          gap: '1rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          <LoginForm />
        </div>

        <div
          style={{
            overflowY: 'auto',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            width: '100%',
          }}
        >
          <UsersTable />
        </div>
      </div>

      <Modal user={selectedUser} onClose={handleClose} />
    </>
  );
}


