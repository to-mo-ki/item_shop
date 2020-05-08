import React from 'react'
import Nav from 'react-bootstrap/Nav'

export default function Header () {
  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/my-item">My Item</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin">管理者ページ</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
