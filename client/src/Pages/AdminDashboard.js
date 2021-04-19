import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import API from "../utils/API";

export default function AdminDashboard() {
  const [usercount, setUserCount] = useState(0);
  const [feedPosts, setFeedPosts] = useState(0);
  const [uniquefeedposters, setUniqueFeedPosters] = useState(0);
  useEffect(() => {
    countUsers();
    feedposts();
    uniqueFeedPosters();
  }, []);
  function countUsers() {
    API.countUsers()
      .then((res) => {
        setUserCount(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function feedposts() {
    API.feedposts()
      .then((res) => {
        setFeedPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function uniqueFeedPosters() {
    API.uniqueFeedPosters()
      .then((res) => {
        setUniqueFeedPosters(res.data[res.data.length - 1].usercount);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container className="home--chat text-center">
      <h1>Admin Dashboard</h1>
      <Row>
        <Col>
          Total number of users: <br />
          {usercount}
        </Col>
        <Col>
          Total number of posts in feed: <br />
          {feedPosts}
        </Col>
        <Col>
          Number of active posters on feed: <br />
          {uniquefeedposters}
        </Col>
        <Col>Top five users</Col>
      </Row>
    </Container>
  );
}
