import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import WalletButton from './WalletButton'

export default function Header () {
  return (
    <Navbar>
      <Navbar.Collapse>
        <Nav>
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
      </Navbar.Collapse>
      <Nav>
        <WalletButton />
      </Nav>
    </Navbar>
  )
}
