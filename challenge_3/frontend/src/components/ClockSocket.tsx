import { useEffect, useState } from 'react';
import './ClockSocket.css';

const ClockSocket = () => {
    // State to hold the current time received from the WebSocket
    const [time, setTime] = useState('--:--:--');

    useEffect(() => {
        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        const wsUrl = `${protocol}://django-challenge3-production.up.railway.app/ws/hora/`;
        const socket = new WebSocket(wsUrl);

        socket.onopen = () => {
            console.log('WebSocket conectado');
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.hora) {
                setTime(data.hora);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket desconectado');
        };

        return () => {
            socket.close();
        };
    }, []);

    // Render the current time
    return (
        <div className="top-0 start-0 fw-bold bg-dark text-white p-2 rounded shadow-sm websocket">
            {time}
        </div>

    );
};

export default ClockSocket;
