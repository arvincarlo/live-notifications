import './card.css'
import { Heart, MessageCircle, Send, HeartHandshake  } from 'lucide-react';
import { useState } from 'react';

const Card = ({socket, user, post}) => {
    const [liked, setLiked] = useState(false);

    const handleNotification = (type) => {
        if (type === "1") setLiked(!liked);

        socket.emit("sendNotification", {
            senderName: user,
            receiverName: post.username,
            type
        })
    }

    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="" className="userImg" />
                <span>{post.fullname}</span>
            </div>
            <div className="postContent">
                <span>{post.content}</span>
            </div>
            <div className="interaction">
                { liked ? (
                    <Heart style={{ color: 'red' }} onClick={() => handleNotification("1")}/>
                ) : (
                    <Heart onClick={() => handleNotification("1")}/>
                ) }
                <MessageCircle onClick={() => handleNotification("2")}/>
                <Send onClick={() => handleNotification("3")}/>
                {/* <Info className='infoIcon'/> */}
            </div>
        </div>
    )
}

export default Card
