import { Check, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import './card.css';

const Card = ({socket, user, request}) => {
    const [approved, setApproved] = useState(false);

    const handleNotification = async (type) => {
        if (type === "Approve") setApproved(!approved);

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
            socket.emit("sendNotification", {
                senderName: user,
                receiverName: request.requestedBy
            })
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
                    <Check onClick={() => handleNotification("Approve")}/>
                ) }
                <X onClick={() => handleNotification("Decline")}/>
                <MessageCircle onClick={() => handleNotification("Comment")}/>
                {/* <Info className='infoIcon'/> */}
            </div>
        </div>
    )
}

export default Card
