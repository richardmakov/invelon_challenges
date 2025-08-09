// src/components/UsersTable.tsx
import { useEffect } from "react";
import { useUserStore } from "../services/userStore";

const UsersTable = () => {
    const fetchUsers = useUserStore((state) => state.fetchUsers);
    const users = useUserStore((state) => state.users);
    const setSelectedUser = useUserStore((state) => state.setSelectedUser);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    return (
        <div className="p-3 p-sm-4 bg-light rounded shadow-sm w-100 d-flex flex-column h-100 gap-1">

            <h3 className="mb-0">User List</h3>
            <p style={{ fontStyle: "italic", }} className="mb-0">* Click on a user to view details</p>

            {users.length === 0 ? (
                <p>No users registered.</p>
            ) : (
                <div className="table-responsive flex-grow-1 overflow-auto" style={{ maxHeight: 'calc(100svh * 2/3 - 150px)' }}>

                    <table
                        className="table table-hover align-middle mb-0 w-100"
                        style={{ tableLayout: 'fixed' }}
                    >

                        <thead
                            className="table-dark"
                            style={{
                                position: 'sticky',
                                top: 0,
                                background: '#212529',
                                zIndex: 10,
                            }}
                        >
                            <tr>
                                <th style={{ width: '5%' }}>ID</th>
                                <th className="d-none d-md-table-cell" style={{ width: '25%' }}>Name</th>
                                <th style={{ width: '25%' }}>Email</th>
                                <th className="d-1100-table-cell" style={{ width: '10%' }}>Affiliate</th>
                                <th className="d-1100-table-cell" style={{ width: '30%' }}>Preferences</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => {
                                const cellClass = user.affiliate
                                    ? "bg-success text-white"
                                    : "bg-secondary text-white";

                                return (
                                    <tr key={user.id ?? `${user.email}-${user.name}`} onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer' }}>
                                        <td className={cellClass}>{user.id ?? "-"}</td>
                                        <td className={`d-none d-md-table-cell ${cellClass}`}>{user.name}</td>
                                        <td className={cellClass}>
                                            {user.email}
                                        </td>
                                        <td className={`d-1100-table-cell ${cellClass}`}>
                                            {user.affiliate ? "Yes" : "No"}
                                        </td>
                                        <td className={`d-1100-table-cell ${cellClass}`}>
                                            {user.preferences && user.preferences.length > 0
                                                ? user.preferences.join(", ")
                                                : "None"}
                                        </td>

                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UsersTable;
