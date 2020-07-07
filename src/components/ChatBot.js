import React, { Component } from 'react';
import './ChatBot.css';
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
// import axios from 'axios'
var axios = require('axios');
    class ChatBot extends Component {
      constructor(props) {
        super(props);
        this.state = {
          userMessage: '',
          conversation: [],
        };
      }

      componentDidMount() {
        // const pusher = new Pusher('<your app key>', {
        //   cluster: '<your app cluster>',
        //   encrypted: true,
        // });

        // const channel = pusher.subscribe('bot');
        // channel.bind('bot-response', data => {
        //   const msg = {
        //     text: data.message,
        //     user: 'ai',
        //   };
        //   this.setState({
        //     conversation: [...this.state.conversation, msg],
        //   });
        // });
      }

      handleChange = event => {
        this.setState({ userMessage: event.target.value });
      };

      handleSubmit = event => {
        event.preventDefault();
        if (!this.state.userMessage.trim()) return;

        const msg = {
          text: this.state.userMessage,
          autoid:"human",
        };

        this.setState({
          conversation: [...this.state.conversation, msg],
        });

        var data = JSON.stringify({"message":this.state.userMessage});
        var config = {
          method: 'post',
          url: 'http://localhost:4000/chat',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        let cachedthis = this;
        axios(config).then(function (response) {
          const msg2 = {
            text: response.data.message,
            autoid: "ai",
          };
  
          cachedthis.setState({conversation: [...cachedthis.state.conversation, msg2]});
          console.log(response.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
        // console.log(this.state.conversation)
        this.setState({ userMessage: '' });
      };
      render() {
        const ChatBubble = (text, i, className) => {
          return (
            <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
              <span className="chat-content">{text}</span>
            </div>
          );
        };

        const chat = this.state.conversation.map((e, index) =>
          ChatBubble(e.text, index, e.user)
        );

        return (
          <div>
            <div className="chat-window">
              <div className="conversation-view" style={{overflowY:'auto'}}>{chat}</div>
              <div className="message-box" autoid="professor-input-box">
                <form onSubmit={this.handleSubmit}>
                  <input
                    value={this.state.userMessage}
                    onInput={this.handleChange}
                    className="text-input"
                    type="text"
                    autoFocus
                    placeholder="Type your message and hit Enter to send"
                  />
                  <Button autoid="professor-send-button" classNAme="button" onClick={this.handleSubmit}><SendIcon/></Button>
                </form>
              </div>
            </div>
          </div>
        );
      }
    }

    export default ChatBot;
