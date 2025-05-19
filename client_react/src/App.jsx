import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { useState } from 'react';
import {posts} from './data';

const App = () => {
    const [username, setUserName] = useState("");
    const [user, setUser] = useState("");

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
