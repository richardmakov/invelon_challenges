import { useEffect, useState } from "react";
import type { User } from "../services/userStore";

interface ModalProps {
    user: User | null;
    onClose: () => void;
}

export default function Modal({ user, onClose }: ModalProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (user) {
            setVisible(true);
        }
    }, [user]);

    if (!user) return null;

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <>
            <div
                className={`modal-backdrop fade ${visible ? "show" : ""}`}
                style={{ opacity: visible ? 0.5 : 0 }}
            />

            <div
                className={`modal d-block fade ${visible ? "show" : ""}`}
                tabIndex={-1}
                role="dialog"
                style={{ backgroundColor: "transparent" }}
                onClick={handleClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="modal-content bg-light">
                        <div className="modal-header">
                            <h5 className="modal-title">User Details</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={handleClose}
                            />
                        </div>
                        <div className="modal-body">
                            <p>
                                <strong>ID:</strong> {user.id ?? "-"}
                            </p>
                            <p>
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>Affiliate:</strong> {user.affiliate ? "Yes" : "No"}
                            </p>
                            <p>
                                <strong>Preferences:</strong>{" "}
                                {user.preferences && user.preferences.length > 0 ? (
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                                        {user.preferences.map((pref: any) => (
                                            <img
                                                key={pref.id}
                                                src={pref.image}
                                                alt={pref.name}
                                                style={{
                                                    width: '50px',
                                                    height: '50px',
                                                    objectFit: 'cover',
                                                    borderRadius: '6px',
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    "None"
                                )}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
