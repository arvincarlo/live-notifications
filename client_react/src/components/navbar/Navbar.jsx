import { Bell } from "lucide-react";
import { useEffect, useState } from 'react';
import './navbar.css';

const Navbar = ({socket, user}) => {

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Getting all the notifications based on recipient
        const getNotifications = async () => {
            const response = await fetch(`http://localhost:3001/notifications/recipient/${user}`);
            let data = await response.json();

            // Sort the request id in descending order
            data = data.sort((a, b) => b.id - a.id);
            setNotifications(data);
        }

        if (user) getNotifications();

        socket.on("getNotification", (data) => {
            getNotifications();
        });
    }, [socket, user]);

    const displayNotification = ({sender, message, type, id}) => {
        let action;

        if (type === "1") {
            action = "liked";
        } else if (type === "2") {
            action = "commented on";
        } else {
            action = "shared";
        }

        return (
            <span key={id} className="notification">{`${sender} requested for (${type})`}</span>
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
                        {!notifications.length && "No notifications yet."}
                        {notifications.length > 0 && (
                            <>
                                {notifications.map((notification) => displayNotification(notification))}
                                <button className="nButton" onClick={() => handleRead()}>Mark all as Read</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
