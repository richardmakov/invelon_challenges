import LoginForm from '../components/Login'
import UsersTable from '../components/UsersTable'
import Modal from '../components/Modal';
import { useUserStore } from '../services/userStore';
import ClockSocket from '../components/ClockSocket';
import BlockMobileTablet from '../components/BlockMobileTablet';

export default function Home() {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  const handleClose = () => setSelectedUser(null);
  return (
    <>
      <div
        className="container w-100 w-sm-75 d-grid justify-content-center align-items-center overflow-hidden"
        style={{
          height: '100svh',
          gridTemplateRows: '1fr 2fr',
          padding: '2svh',
          gap: '.5rem',
        }}
      >
        <div className='d-flex justify-content-center align-items-start h-100 flex-column'
        >
          <ClockSocket />
          <LoginForm />
        </div>

        <div className='-flex justify-content-center align-items-start h-100'
          style={{
            overflowY: 'auto',
          }}
        >
          <UsersTable />
        </div>
        <Modal user={selectedUser} onClose={handleClose} />
      </div>

      <BlockMobileTablet />
    </>
  );
}


