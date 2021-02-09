import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
	return (
		<Container>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='#home'>Guia Vegana CDMX</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#link'>Link</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Container>
	)
}

export default Header
