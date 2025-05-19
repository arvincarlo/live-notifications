import './card.css'
import { Heart, MessageCircle, Send, Info } from 'lucide-react';

const Card = ({post}) => {
    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="" className="userImg" />
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="" className="postImg" />
            <div className="interaction">
                <Heart/>
                <MessageCircle/>
                <Send/>
                {/* <Info className='infoIcon'/> */}
            </div>
        </div>
    )
}

export default Card
