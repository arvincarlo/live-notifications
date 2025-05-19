
import './App.css';
import { useState } from 'react';

const App = () => {
    const [username, setUserName] = useState("");
    const [user, setUser] = useState("");

    return (
        <div className="container">
            <div classname="login">
                <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
                <button onClick={() => setUser(username)}>Login</button>
            </div>
        </div>
    )
}

export default App;
