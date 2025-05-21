import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import './App.css';
import { useEffect, useState } from 'react';
// import {posts} from './data';
import { io } from 'socket.io-client';

const App = () => {
    const [username, setUserName] = useState("");
    const [user, setUser] = useState("");
    const [socket, setSocket] = useState(null);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
      setSocket(io("http://localhost:8001"));
      console.log("Socket connected");
    }, []);

    // Send the user to the server
    useEffect(() => {
      // Get all requests
      const getRequests = async () => {
        const response = await fetch(`http://localhost:3001/requests/approver/${user}`);
        const data = await response.json();
        setRequests(data);
      }

      // Get notification if there is a user
      if (user) getRequests();

      socket?.emit("newUser", user);
      socket?.on("pushNotification", (data) => {
        console.log("Received Push notifications: ", data);

        // Create the notification
        new Notification("New Notification", {
          body: `${data.senderName} ${data.type === "1" ? "liked" : data.type === "2" ? "commented on" : "shared"} your request.`,
          icon: "http://localhost:8001/notification.png"
        })
      });
    }, [socket, user]);

    return (
        <div className="container">
          { user ? (
            <> 
              <Navbar socket={socket}/>
              {!(requests.length > 0) ? (
                <>No request yet.</>
              ) : (
                <>
                  {requests.map((request) => (
                    <Card socket={socket} user={user} key={request.id} request={request} />
                  ))}
                </>
              )}
              <span className="username">Welcome {user}</span>
            </>
          ) : (
            <div className="login">
              <h1>Leads Processor</h1>
              <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)}/>
              <button onClick={() => setUser(username)}>Login</button>
            </div>
          )}
        </div>
    )
}
  
export default App;
