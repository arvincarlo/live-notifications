import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { useEffect, useState } from 'react';
import {posts} from './data';
import { io } from 'socket.io-client';

const App = () => {
    const [username, setUserName] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
      const socket = io("http://localhost:8001");
      console.log("Socket connected", socket);
    },[]);
    return (
        <div className="container">
          { user ? (
            <> 
              <Navbar/>
              {posts.map((post) => (
                <Card key={post.id} post={post} />
              ))}
              <span className="username">Welcome {user}</span>
            </>
          ) : (
            <div className="login">
              <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
              <button onClick={() => setUser(username)}>Login</button>
            </div>
          )}
        </div>
    )
}

export default App;
