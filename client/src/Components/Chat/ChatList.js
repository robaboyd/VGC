import React from "react";
import "./Chat.css";

const ChatList = props => (
  <div>
    {props.usersChats.map(chatBox => {
      return (
        <div
          className="chatDiv"
          onClick={props.toggleChatDisplay}
          data-chatid={chatBox._id}
        >
          <h2 data-chatid={chatBox._id}>
            {/* on the list show the name of the person you are talking to */}
            {chatBox.user1 === props.username ? chatBox.user2 : chatBox.user1}
          </h2>
        </div>
      );
    })}
  </div>
);

export default ChatList;