import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container fluid className="footer--container py-2 text-center">
      <Row>
        <Col>
          <img
            src={require("../images/social-icon.jpg")}
            alt="Social Neighbor icon"
            className="footer--icon"
          />
          Social Neighbor
        </Col>
        <Col className="footer--about">
          <a href="/About" className="footer--aboutlink">
            About
          </a>
        </Col>
      </Row>
    </Container>
  );
}
