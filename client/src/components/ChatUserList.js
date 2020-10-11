import React, { useEffect } from "react";

import { ListGroup } from "react-bootstrap";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { SET_USER_LIST, SET_SELECTED_CHAT } from "../utils/actions";

export default function ChatUserList() {
  const [state, dispatch] = useStoreContext();
  useEffect(() => {
    getUsers();
  }, []);
  function getUsers() {
    API.getUsers()
      .then((res) => {
        dispatch({
          type: SET_USER_LIST,
          userlist: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  function selectChat(user) {
    console.log(user);
    const selected = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      city: user.city,
      state: user.state,
      image: user.image,
      email: user.email,
      bio: user.bio,
    };
    dispatch({
      type: SET_SELECTED_CHAT,
      selectedchat: selected,
    });
    let localStorageSelectedChat = {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      city: user.city,
      state: user.state,
      image: user.image,
      email: user.email,
      bio: user.bio,
    };
    window.localStorage.setItem(
      "selectedchat",
      JSON.stringify(localStorageSelectedChat)
    );
  }

  return (
    <div className="chat--userlist">
      <ListGroup>
        {state.userlist
          ? state.userlist.map((user) => {
              return (
                <div key={user.id}>
                  <ListGroup.Item
                    className="chat--username"
                    key={user.id}
                    onClick={() => {
                      selectChat(user);
                    }}
                  >
                    {user.username}
                  </ListGroup.Item>
                </div>
              );
            })
          : "no users"}
      </ListGroup>
    </div>
  );
}
