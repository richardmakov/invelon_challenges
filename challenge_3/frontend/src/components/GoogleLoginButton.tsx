import React, { useEffect, useRef } from "react";

interface GoogleLoginButtonProps {
    // Callback when login is successful, receives the credential token
    onSuccess: (credential: string) => void;
    // Callback when an error occurs during login
    onError: (error: any) => void;
}

// Extend global window interface to include Google API object
declare global {
    interface Window {
        google: any;
    }
}
const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ onSuccess, onError }) => {
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Check if the Google API is loaded and the divRef is available
        if (window.google && divRef.current) {
            window.google.accounts.id.initialize({
                client_id: "12724872955-f2rvf9e989h2msft76huaeat2reb4vl7.apps.googleusercontent.com",
                callback: (response: any) => {
                    if (response.credential) {
                        onSuccess(response.credential);
                    } else {
                        onError("No credential received");
                    }
                },
            });

            window.google.accounts.id.renderButton(divRef.current, {
                theme: "outline",
                size: "medium",
            });
        }
    }, []);

    return <div ref={divRef}></div>;
};

export default GoogleLoginButton;
