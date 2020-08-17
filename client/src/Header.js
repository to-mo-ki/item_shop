import React from 'react'
import NavBar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import WalletButton from './WalletButton'

export default function Header () {
  return (
    <NavBar>
      <NavBar.Collapse>
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
      </NavBar.Collapse>
      <Nav>
        <WalletButton />
      </Nav>
    </NavBar>
  )
}
