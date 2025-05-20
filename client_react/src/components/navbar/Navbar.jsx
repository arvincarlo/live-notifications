import './navbar.css'
import { Bell, Mail, Settings } from "lucide-react";
import { useEffect, useState } from 'react';

const Navbar = ({socket}) => {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    // Getting the notifications 
    useEffect(() => {
        socket.on("getNotification", (data) => {
            setNotifications((prev) => [...prev, data])
        });
    }, [socket]);

    console.log(notifications);

    const displayNotification = ({senderName, type}, index) => {
        let action;

        if (type === "1") {
            action = "liked";
        } else if (type === "2") {
            action = "commented on";
        } else {
            action = "shared";
        }

        return (
            <span key={index} className="notification">{`${senderName} ${action} your request.`}</span>
        )
    }

    const handleRead = () => {
        setNotifications([]);
        setOpen(false);
    }

    return (
        <div className="navbar">
            <span className="logo">Requests Portal</span>
            <div className="icons">
                <div className="icon" onClick={() => setOpen(!open)}>
                    <span className="iconImg">
                        <Bell/>
                    </span>
                    {/* <img src={Notification} alt="" className="iconImg" /> */}
                    {notifications.length > 0 && <div className="counter">{notifications.length}</div>}
                </div>
                { open && (
                    <div className="notifications">
                        {notifications.map((notification, index) => displayNotification(notification, index))}
                        <button className="nButton" onClick={() => handleRead()}>Mark all as Read</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
