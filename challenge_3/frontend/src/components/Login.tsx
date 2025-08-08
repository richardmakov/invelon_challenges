import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "../services/userStore";

const LoginForm = () => {
    const addUser = useUserStore((state) => state.addUser);
    const error = useUserStore((state) => state.error);
    const clearError = useUserStore((state) => state.clearError);
    const fetchPreferences = useUserStore((state) => state.fetchPreferences);
    const allPreferences = useUserStore((state) => state.preferences);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [affiliate, setAffiliate] = useState(false);
    const [preferences, setPreferences] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);

    const loadPreferences = useCallback(() => {
        fetchPreferences();
    }, [fetchPreferences]);

    useEffect(() => {
        loadPreferences();
    }, [loadPreferences]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        setLoading(true);

        try {
            await addUser({
                name,
                email,
                affiliate,
                preferences,
            });
            setName('');
            setEmail('');
            setAffiliate(false);
            setPreferences([]);
        } finally {
            setLoading(false);
        }
    };

    const togglePreference = (id: number) => {
        setPreferences((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-light rounded shadow-sm w-100">
            <h3 className="mb-3">Create User</h3>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={clearError}
                    ></button>
                </div>
            )}

            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </div>
            </div>


            <div className="mb-3 form-check">
                <input
                    id="affiliate"
                    type="checkbox"
                    className="form-check-input"
                    checked={affiliate}
                    onChange={() => setAffiliate((a) => !a)}
                    disabled={loading}
                />
                <label htmlFor="affiliate" className="form-check-label">
                    Affiliate
                </label>
            </div>

            <div className="mb-3">
                <label className="form-label">Preferences</label>
                <div>
                    {allPreferences.map((pref) => (
                        <div key={pref.id} className="form-check form-check-inline">
                            <input
                                type="checkbox"
                                id={`pref-${pref.id}`}
                                className="form-check-input"
                                checked={preferences.includes(pref.id)}
                                onChange={() => togglePreference(pref.id)}
                                disabled={loading}
                            />
                            <label htmlFor={`pref-${pref.id}`} className="form-check-label">
                                {pref.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : 'Create User'}
            </button>
        </form >
    );
};

export default LoginForm;
