import { Check, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import './card.css';
import { createNotification } from '../../lib/actions';

const Card = ({socket, user, request}) => {
    const [approved, setApproved] = useState(false);

    const handleNotification = async (type) => {
        if (type === 1) setApproved(!approved);

        // Save the approved request
        const response = await fetch(`http://localhost:3001/requests/${request.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "Approved"
            }),
        });
        
        if (response.ok) {
            let title;
            let message;


            // For title
            switch(type) {
                case 1:
                    title = "Request Approval"
                break;
                case 2:
                    title = "Request rejected"
                break;
                case 3:
                    title = "Request has comment"
                break;
                default: title = "Request Approved"
            }

            // For message
            switch(type) {
                case 1:
                    message = `${user} approved your request`
                break;
                case 2:
                    message = `${user} rejected your request`
                break;
                case 3:
                    message = `${user} commented on your request`
                break;
                default: message = "Request Approved"
            }

            // Create the notification
            const notification = {
                recipient: request.requestedBy,
                sender: user,
                type: request.requestType,
                isRead: false,
                title: title,
                message: message,
                createdAt: new Date().toISOString()
            }

            console.log(request);

            const res = await createNotification(notification);

            if (res) {
                socket.emit("sendNotification", {
                    senderName: user,
                    receiverName: request.requestedBy,
                    type: type.toString()
                })
            }
        }
    }

    const getAvatarUrl = (requestedBy = "") => {
        // Use DiceBear Avatars API for random avatars based on name/initials
        const seed = encodeURIComponent(requestedBy || "user");
        return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundType=gradientLinear`;
    };

    return (
        <div className="card">
            <div className="info">
                <img
                    src={getAvatarUrl(request.requestedBy)}
                    alt={request.requestedBy}
                    className="userImg"
                />
                <span>{request.requestedBy}</span>
            </div>
            <div className="requestContent">
                <span>{request.description}</span>
                <span>{request.requestType}</span>
                <span>{request.status}</span>
            </div>
            <div className="interaction">
                { approved ? (
                    <Check style={{ color: 'green' }} onClick={() => handleNotification("Approve")}/>
                ) : (
                    <Check onClick={() => handleNotification(1)}/>
                ) }
                <X onClick={() => handleNotification(2)}/>
                <MessageCircle onClick={() => handleNotification(3)}/>
                {/* <Info className='infoIcon'/> */}
            </div>
        </div>
    )
}

export default Card
