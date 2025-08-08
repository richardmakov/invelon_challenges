// src/components/UsersTable.tsx
import { useEffect } from "react";
import { useUserStore } from "../services/userStore";

const UsersTable = () => {
    const fetchUsers = useUserStore((state) => state.fetchUsers);
    const users = useUserStore((state) => state.users);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div
            className="p-4 bg-light rounded shadow-sm w-100"
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <h3 className="mb-3">User List</h3>

            {users.length === 0 ? (
                <p>No users registered.</p>
            ) : (
                <div
                    className="table-responsive"
                    style={{ flex: '1 1 auto', overflowY: 'auto', maxHeight: 'calc(100svh * 2/3 - 150px)' }}
                >
                    <table
                        className="table table-hover align-middle mb-0"
                        style={{ width: '100%', tableLayout: 'fixed' }}
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
                                <th style={{ width: '25%' }}>Name</th>
                                <th style={{ width: '25%' }}>Email</th>
                                <th style={{ width: '10%' }}>Affiliate</th>
                                <th style={{ width: '30%' }}>Preferences</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => {
                                const cellClass = user.affiliate
                                    ? "bg-success text-white"
                                    : "bg-secondary text-white";

                                return (
                                    <tr key={user.id ?? `${user.email}-${user.name}`}>
                                        <td className={cellClass}>{user.id ?? "-"}</td>
                                        <td className={cellClass}>{user.name}</td>
                                        <td className={cellClass}>
                                            <a
                                                href={`mailto:${user.email}?subject=${encodeURIComponent("Hello")}&body=${encodeURIComponent("I wanted to contact you")}`}
                                                className="text-white text-decoration-underline"
                                            >
                                                {user.email}
                                            </a>
                                        </td>
                                        <td className={cellClass}>
                                            {user.affiliate ? "Yes" : "No"}
                                        </td>
                                        <td className={cellClass}>
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
