import React, { useEffect, useState } from 'react';

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
        <div style={{ position: 'fixed', top: 10, left: 10, fontWeight: 'bold' }}>
            {time}
        </div>
    );
};

export default ClockSocket;
