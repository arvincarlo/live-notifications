import './card.css'
import { Heart, MessageCircle, Send, HeartHandshake  } from 'lucide-react';
import { useState } from 'react';

const Card = ({socket, user, post}) => {
    const [liked, setLiked] = useState(false);

    const handleNotification = (type) => {
        setLiked(!liked);
        socket.emit("sendNotification", {
            senderName: user,
            receiverName: post.username,
            type: type.toString()
        })
    }

    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="" className="userImg" />
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="" className="postImg" />
            <div className="interaction">
                { liked ? (
                    <HeartHandshake onClick={() => handleNotification(1)}/>
                ) : (
                    <Heart onClick={() => handleNotification(1)}/>
                ) }
                <MessageCircle onClick={() => handleNotification(2)}/>
                <Send onClick={() => handleNotification(3)}/>
                {/* <Info className='infoIcon'/> */}
            </div>
        </div>
    )
}

export default Card
