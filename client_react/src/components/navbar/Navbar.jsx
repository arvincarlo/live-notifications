import './navbar.css'
import { Bell, Mail, Settings } from "lucide-react";

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">Request Portal</span>
            <div className="icons">
                <div className="icon">
                    <span className="iconImg">
                        <Bell/>
                    </span>
                    {/* <img src={Notification} alt="" className="iconImg" /> */}
                    <div className="counter">10</div>
                </div>
                <div className="icon">
                    <span className="iconImg">
                        <Mail/>
                    </span>
                    {/* <img src={Notification} alt="" className="iconImg" /> */}
                    <div className="counter">3</div>
                </div>
                <div className="icon">
                    <span className="iconImg">
                        <Settings/>
                    </span>
                    {/* <img src={Notification} alt="" className="iconImg" /> */}
                    <div className="counter">2</div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
