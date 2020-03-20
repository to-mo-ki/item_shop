import React from "react";
import Nav from 'react-bootstrap/Nav';

export default class Header extends React.Component {

  render() {
    return (
      <Nav variant="pills">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/my-item">My Item</Nav.Link>
        </Nav.Item>
      </Nav>
    );
  }
}