import { Check, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import './card.css';

const Card = ({socket, user, request}) => {
    const [liked, setLiked] = useState(false);

    const handleNotification = (type) => {
        if (type === "1") setLiked(!liked);

        socket.emit("sendNotification", {
            senderName: user,
            receiverName: request.username,
            type
        })
    }

    const getAvatarUrl = (name = "") => {
        // Use DiceBear Avatars API for random avatars based on name/initials
        const seed = encodeURIComponent(name || "user");
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
                { liked ? (
                    <Check style={{ color: 'green' }} onClick={() => handleNotification("1")}/>
                ) : (
                    <Check onClick={() => handleNotification("1")}/>
                ) }
                <MessageCircle onClick={() => handleNotification("2")}/>
                <Send onClick={() => handleNotification("3")}/>
                {/* <Info className='infoIcon'/> */}
            </div>
        </div>
    )
}

export default Card
