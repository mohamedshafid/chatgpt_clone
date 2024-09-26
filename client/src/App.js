import "./App.css";
import "./normal.css";
import myimage from "../src/assets/myimage.png";
import chatgptimage from "../src/assets/chatgpt.png";
import { useState } from "react";
import { Chat } from "openai/resources/index.mjs";

function App() {
  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState([
    {
      user: "You",
      message: "hello",
    },
    {
      user: "Chatgpt",
      message: "Hello! How can I assist you today?",
    },
  ]);

  const handledropdown = () => {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("active");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setInput("");

    let ChatLogNew = [
      ...chatlog,
      {
        user: "You",
        message: `${input}`,
      },
    ];
    const messages = ChatLogNew.map((message) => message.message).join("\n");
    setChatLog(ChatLogNew);

  

    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });

    const data = await response.json();
    setChatLog([
     ...ChatLogNew,
      {
        user: "Chatgpt",
        message: data.message,
      },
    ]);
  

  };
  // clering the chat
  function Clearchat() {
    setChatLog([]);
  }
  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="new-chat" onClick={Clearchat}>
          <span className="new-chat-plus-icon">+</span>
          New Chat
        </div>
        <div className="account">
          <img src={myimage} alt="profile" />
          <p>Mohamed Hafid</p>
        </div>
      </aside>
      <section className="main-section">
        <div className="chat-dropdown">
          <div className="chat-dropdown-header" onClick={handledropdown}>
            ChatGPT <span>3.5</span>
          </div>
          <div className="chat-dropdown-section" id="dropdown">
            <div className="chat-dropdown-section-header">
              <p style={{ color: "grey" }}>Model</p>
              <p></p>
            </div>
            <div className="chat-dropdown-section-content">
              <p>GPT-3.5</p>
              <div className="p">Great for everyday tasks</div>
            </div>
            <div className="chat-dropdown-section-content">
              <p>GPT-4</p>
              <div className="p">
                our smartest and most capable model.
                <br />
                Includes DALLE, browsing and more.
              </div>
              <button className="button">Upgrade to Plus</button>
            </div>
            <hr className="hr" />
            <div>
              <p>Share chat</p>
            </div>
          </div>
        </div>
        <div className="input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              className="input-box"
              placeholder="Message chatgpt..."
              onChange={(event) => setInput(event.target.value)}
            ></input>
          </form>

          <div className="input-text">
            ChatGPT can make mistakes. Consider checking important information.
          </div>
        </div>

        {/* output section */}
        <div className="output-section">
          {chatlog.map((message, index) => {
            return <ChatMessage message={message} key={index} />;
          })}
        </div>
        {/* output section */}
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className="me">
      <div className="avatar">
        {message.user === "Chatgpt" ? (
          <img src={chatgptimage} alt="avatar" />
        ) : (
          <img src={myimage} alt="avatar" />
        )}
      </div>
      <div className="output-section-me">
        <p className="p1">{message.user}</p>
        <p className="p2" style={{ textAlign: "left" }}>
          {message.message}
        </p>
      </div>
    </div>
  );
};
export default App;
