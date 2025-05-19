import './card.css'
import { Heart, MessageCircle, Send, HeartHandshake  } from 'lucide-react';
import { useState } from 'react';

const Card = ({post}) => {
    const [liked, setLiked] = useState(false);

    const handleNotification = () => {
        setLiked(!liked);
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
                    <HeartHandshake onClick={handleNotification}/>
                ) : (
                    <Heart onClick={handleNotification}/>
                ) }
                <MessageCircle/>
                <Send/>
                {/* <Info className='infoIcon'/> */}
            </div>
        </div>
    )
}

export default Card
