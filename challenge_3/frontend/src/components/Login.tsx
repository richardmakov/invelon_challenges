import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "../services/userStore";
import GoogleLoginButton from "./GoogleLoginButton";
import "./Login.css";

const LoginForm = () => {
    const addUser = useUserStore((state) => state.addUser);
    const error = useUserStore((state) => state.error);
    const clearError = useUserStore((state) => state.clearError);
    const fetchPreferences = useUserStore((state) => state.fetchPreferences);
    const allPreferences = useUserStore((state) => state.preferences);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [affiliate, setAffiliate] = useState(false);
    const [preferences, setPreferences] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [googleUser, setGoogleUser] = useState<{ name: string; email: string } | null>(null);

    const [prefsOpen, setPrefsOpen] = useState(false);

    const loadPreferences = useCallback(() => {
        fetchPreferences();
    }, [fetchPreferences]);

    useEffect(() => {
        loadPreferences();
    }, [loadPreferences]);

    const parseJwt = (token: string) => {
        try {
            const base64Url = token.split(".")[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split("")
                    .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
                    .join("")
            );
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    }

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
            setName("");
            setEmail("");
            setAffiliate(false);
            setPreferences([]);
            setGoogleUser(null);
            setPrefsOpen(false);
        } finally {
            setLoading(false);
        }
    };

    const togglePreference = (id: number) => {
        setPreferences((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleGoogleSuccess = async (credential: string) => {
        const userData = parseJwt(credential);
        if (!userData) {
            console.error("Token is invalid!");
            return;
        }

        clearError();

        setName(userData.name || "");
        setEmail(userData.email || "");

        setGoogleUser({
            name: userData.name || "",
            email: userData.email || "",
        });
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="p-3 p-sm-4 bg-light rounded shadow-sm w-100 gap-2 d-flex flex-column justify-content-center gap-1"
            >
                <h3 className="mb-0">User Form</h3>

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

                <div className="row">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label" style={{ fontWeight: "500" }}>
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Richard Makovs"
                            disabled={loading || !!googleUser}
                            readOnly={!!googleUser}
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label" style={{ fontWeight: "500" }}>
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="richardmakovs@example.com"
                            required
                            disabled={loading || !!googleUser}
                            readOnly={!!googleUser}
                        />
                    </div>
                </div>

                <div className="form-check my-2 d-flex align-items-center gap-2">
                    <input
                        id="affiliate"
                        type="checkbox"
                        className="form-check-input"
                        checked={affiliate}
                        onChange={() => setAffiliate((a) => !a)}
                        disabled={loading}
                    />
                    <label htmlFor="affiliate" className="form-check-label" style={{ fontWeight: "500" }}>
                        Affiliate
                    </label>

                    <span
                        className={`badge ${affiliate ? "bg-success" : "bg-secondary"
                            }`}
                        style={{ userSelect: "none" }}
                    >
                        {affiliate ? "Yes" : "No"}
                    </span>
                </div>

                <div>
                    <label
                        className="form-label prefs-toggle-label"
                        style={{ fontWeight: "500" }}
                        onClick={() => setPrefsOpen((o) => !o)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setPrefsOpen((o) => !o);
                            }
                        }}
                    >
                        Preferences
                        <span className="arrow">{prefsOpen ? "▲" : "▼"}</span>
                    </label>

                    <div className={`prefs-container ${prefsOpen ? "open" : ""}`}>
                        {allPreferences.map((pref, index) => (
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
                                    {index + 1}. {pref.name}
                                </label>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="d-flex justify-content-start align-items-center gap-3 mt-3">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !name.trim() || !email.trim()}
                        style={{ whiteSpace: "nowrap", padding: "0.25rem 0.5rem" }}
                    >
                        {loading ? "Creating..." : "Create"}
                    </button>

                    {!googleUser && (
                        <GoogleLoginButton
                            onSuccess={(credential) => handleGoogleSuccess(credential)}
                            onError={(error) => console.error(error)}
                        />
                    )}

                    {googleUser && (
                        <span className="text-dark">
                            Logged in with Google as <b>{googleUser.name}</b>
                        </span>
                    )}
                </div>
            </form>
        </>
    );
};

export default LoginForm;
