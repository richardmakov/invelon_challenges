import  { useEffect, useState } from 'react';
import './ClockSocket.css';

const ClockSocket = () => {
    const [time, setTime] = useState('--:--:--');

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/hora/');

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

    return (
        <div className="top-0 start-0 fw-bold bg-dark text-white p-2 rounded shadow-sm websocket">
            {time}
        </div>

    );
};

export default ClockSocket;
