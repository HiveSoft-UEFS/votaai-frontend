import React, { useState } from "react";
import "./Notification.css";

interface NotificationProps {
    message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
    const [visible, setVisible] = useState(true);

    if (!message || !visible) return null;

    const handleClose = () => {
        setVisible(false);
    };

    const backgroundColor = message === "Erro ao criar enquete." ? "red" : "#05078b";

    return (
        <div className="notification" style={{ backgroundColor }}>
            {message}
            
            <button onClick={handleClose} className="close-button">Fechar</button>
        </div>
    );
};

export default Notification;
