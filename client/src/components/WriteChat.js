import React, { useRef } from "react";
import { Container, InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { SET_MESSAGES } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";

import io from "socket.io-client";
export default function WriteChat() {
  const [state, dispatch] = useStoreContext();
  const socket = io("localhost:8080");
  let messageRef = useRef();

  socket.on("RECIEVE_MESSAGE", function (data) {
    addMessage(data);
  });

  const addMessage = (data) => {
    console.log(data);
    dispatch({ type: SET_MESSAGES, messages: [...state.messages, data] });
   
  };

  const sendMessage = (ev) => {
    ev.preventDefault();
    socket.emit("SEND_MESSAGE", {
      message: messageRef.current.value,
      sender: state.currentUser.id,
      receiver: state.selectedchat.id,
      // author: state.currentUser.username,
      // image: state.currentUser.image,
    });
    writeMessage();
    getMessages(state.currentUser.id, state.selectedchat.id)
    const form = document.getElementById("myForm");
    form.reset();
  };
  async function getMessages(currentuser, receiver) {
    const { data } = await API.getMessages(currentuser, receiver)
        console.log(data);
        dispatch({ type: SET_MESSAGES, messages: data });
  }

  function writeMessage() {
    API.writeMessage({
      message: messageRef.current.value,
      sender: state.currentUser.id,
      receiver: state.selectedchat.id,
    })
      .then((res) => {
        console.log(res.data);
        
       
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Container className="chat--writechat">
      <Form id="myForm">
      <InputGroup>
        <FormControl
          as="textarea"
          aria-label="With textarea"
          ref={messageRef}
          placeholder="Write message here"
        />
      </InputGroup>
      <Button className="button mt-2" onClick={sendMessage}>
        Send Message
      </Button>
      </Form>
    </Container>
  );
}