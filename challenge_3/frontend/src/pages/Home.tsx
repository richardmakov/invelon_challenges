import LoginForm from '../components/Login'
import UsersTable from '../components/UsersTable'
import Modal from '../components/Modal';
import { useUserStore } from '../services/userStore';
import ClockSocket from '../components/ClockSocket';
import BlockMobileTablet from '../components/BlockMobileTablet';

export default function Home() {
  // Get the currently selected user from the store
  const selectedUser = useUserStore((state) => state.selectedUser);
  // Get the function to clear or set the selected user in the store
  const setSelectedUser = useUserStore((state) => state.setSelectedUser);

  // Handler to close the modal or clear the selected user
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

        <div className='d-flex justify-content-center align-items-start h-100'
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


