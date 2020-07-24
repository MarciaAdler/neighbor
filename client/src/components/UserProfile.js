import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { SET_SELECTED_USER, SET_POSTS } from "../utils/actions";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

export default function UserProfile() {
  const [state, dispatch] = useStoreContext();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    loadRequest(window.location.search);
    getSelectedUserPosts(state.selecteduser.id);
  }, []);

  function loadRequest(url) {
    console.log("From loadRequest function: ");
    console.log(url);

    if (state.selecteduser.id === 0) {
      API.getRequestFromURL(url.replace("?", ""))
        .then((res) => {
          console.log(res);
          const selectedUser = {
            id: res.data.id,
            username: res.data.username,
            firstName: res.data.firstName,
            city: res.data.city,
            state: res.data.state,
            image: res.data.image,
            email: res.data.email,
            bio: res.data.bio,
          };
          dispatch({
            type: SET_SELECTED_USER,
            selecteduser: selectedUser,
          });
          getSelectedUserPosts(res.data.id);
        })
        .catch((err) => console.log(err));
    } else {
      dispatch({
        type: SET_SELECTED_USER,
        selecteduser: state.selecteduser,
      });
    }
  }
  function getSelectedUserPosts(user) {
    API.getUserPosts(user).then((res) => {
      console.log(res);
      setUserPosts(res.data);
    });
  }
  return (
    <Container className="text-align-left">
      <h4>{state.selecteduser.username}</h4>
      <img
        src={
          process.env.PUBLIC_URL + `/profileimages/${state.selecteduser.image}`
        }
      />
      <h6>{state.selecteduser.firstName}</h6>
      <h6>
        {state.selecteduser.city}, {state.selecteduser.state}
      </h6>

      <p>
        <strong>About Me: </strong>
        {state.selecteduser.bio}
      </p>

      <ListGroup>
        {userPosts.length > 0
          ? userPosts.map((post) => {
              return (
                <ListGroup.Item key={post.id}>
                  <h6>{post.post}</h6>
                  {post.image1 !== null ? (
                    <img
                      className="feed--image"
                      src={
                        process.env.PUBLIC_URL + `/postimages/${post.image1}`
                      }
                      alt={post.image1}
                    />
                  ) : (
                    ""
                  )}
                </ListGroup.Item>
              );
            })
          : "no posts"}
      </ListGroup>
    </Container>
  );
}
